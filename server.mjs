import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  courseBank,
  getCourseById,
  getQuestionById,
  gradingRubric,
  questionBank,
  studySections
} from "./data/study-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, "public");

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const HOST = (process.env.HOST || "127.0.0.1").trim();
const OPENAI_API_KEY = (process.env.OPENAI_API_KEY || "").trim();
const OPENAI_MODEL = (process.env.OPENAI_MODEL || "gpt-5-mini").trim();

const STATIC_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png"
};

const feedbackSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "shotResult",
    "gradeBand",
    "encouragement",
    "whatWasGood",
    "nextStep",
    "miniHint",
    "idealAnswer"
  ],
  properties: {
    shotResult: {
      type: "string",
      enum: ["Hole in one", "Birdie", "Par", "Bogey", "Double Bogey"]
    },
    gradeBand: {
      type: "string",
      enum: ["A", "C", "E", "På väg mot E"]
    },
    encouragement: {
      type: "string"
    },
    whatWasGood: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 3
    },
    nextStep: {
      type: "string"
    },
    miniHint: {
      type: "string"
    },
    idealAnswer: {
      type: "string"
    }
  }
};

const coachSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "questionInSimpleWords",
    "firstStep",
    "sentenceStarter",
    "bookConnection",
    "lookForWords"
  ],
  properties: {
    questionInSimpleWords: {
      type: "string"
    },
    firstStep: {
      type: "string"
    },
    sentenceStarter: {
      type: "string"
    },
    bookConnection: {
      type: "string"
    },
    lookForWords: {
      type: "array",
      items: {
        type: "string"
      },
      minItems: 2,
      maxItems: 5
    }
  }
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    if (request.method === "GET" && url.pathname === "/api/status") {
      return sendJson(response, 200, {
        ok: true,
        configured: Boolean(OPENAI_API_KEY),
        model: OPENAI_MODEL
      });
    }

    if (request.method === "GET" && url.pathname === "/api/questions") {
      return sendJson(response, 200, {
        courses: courseBank.map((course) => ({
          id: course.id,
          title: course.title,
          subtitle: course.subtitle,
          holeCount: course.holeCount,
          theme: course.theme,
          description: course.description,
          holeIds: course.holeIds
        })),
        questions: questionBank.map((question) => ({
          id: question.id,
          section: question.section,
          sectionLabel: question.sectionLabel,
          level: question.level,
          isFocus: Boolean(question.isFocus),
          focusLabel: question.focusLabel || "",
          prompt: question.prompt,
          hint: question.hint,
          starter: question.starter,
          bookSupport: question.bookSupport || ""
        }))
      });
    }

    if (request.method === "GET" && url.pathname.startsWith("/api/courses/")) {
      const courseId = url.pathname.split("/").pop();
      const course = getCourseById(courseId || "");

      if (!course) {
        return sendJson(response, 404, {
          error: "Banan hittades inte."
        });
      }

      return sendJson(response, 200, {
        course: {
          id: course.id,
          title: course.title,
          subtitle: course.subtitle,
          holeCount: course.holeCount,
          theme: course.theme,
          description: course.description,
          holes: course.holeIds.map((questionId, index) => {
            const question = getQuestionById(questionId);
            return {
              holeNumber: index + 1,
              questionId,
              section: question?.section || "",
              prompt: question?.prompt || ""
            };
          })
        }
      });
    }

    if (request.method === "POST" && url.pathname === "/api/evaluate") {
      const body = await readJsonBody(request);
      const question = getQuestionById(body.questionId);

      if (!question) {
        return sendJson(response, 404, {
          error: "Frågan hittades inte."
        });
      }

      const answer = typeof body.answer === "string" ? body.answer.trim() : "";

      if (answer.length < 3) {
        return sendJson(response, 400, {
          error: "Skriv lite mer först."
        });
      }

      if (!OPENAI_API_KEY) {
        return sendJson(response, 503, {
          error: "OpenAI-nyckel saknas. Lägg in OPENAI_API_KEY i .env och starta om servern."
        });
      }

      const feedback = await evaluateAnswer({
        question,
        answer
      });

      return sendJson(response, 200, { feedback });
    }

    if (request.method === "POST" && url.pathname === "/api/coach") {
      const body = await readJsonBody(request);
      const question = getQuestionById(body.questionId);

      if (!question) {
        return sendJson(response, 404, {
          error: "Frågan hittades inte."
        });
      }

      const coach = OPENAI_API_KEY
        ? await coachQuestion({ question })
        : buildLocalCoachHelp(question);

      return sendJson(response, 200, { coach });
    }

    if (request.method === "GET") {
      return serveStatic(url.pathname, response);
    }

    sendJson(response, 405, { error: "Metoden stöds inte." });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, {
      error: "Något gick fel i servern."
    });
  }
}).listen(PORT, HOST, () => {
  console.log(`Kemi-appen kör på http://${HOST}:${PORT}`);
});

async function evaluateAnswer({ question, answer }) {
  const section = studySections.find((item) => item.id === question.section);

  const systemPrompt = [
    "Du är en varm, tydlig och pedagogisk kemicoach för en 12-åring.",
    "Du bedömer bara utifrån materialet nedan och hittar inte på extra fakta.",
    "Skriv enkel svenska. Korta meningar. Snäll ton. Ingen skam eller press.",
    "Bedöm svaret på fyra nivåer: På väg mot E, E, C eller A.",
    "Sätt också ett golfresultat: Hole in one, Birdie, Par, Bogey eller Double Bogey.",
    "A betyder att svaret tydligt kopplar ihop flera begrepp och visar ett säkert resonemang.",
    "C betyder att svaret förklarar sambandet ganska tydligt med relevanta begrepp.",
    "E betyder att det viktigaste finns med, men enklare och kortare.",
    "På väg mot E betyder att viktiga delar saknas eller är fel.",
    "Hole in one används för ett ovanligt starkt, klart och komplett svar.",
    "Birdie används för ett starkt svar med nästan allt viktigt och minst någon tydlig koppling.",
    "Par används för ett stabilt och tillräckligt svar där kärnan stämmer.",
    "Bogey används när något viktigt finns men flera delar saknas eller är otydliga.",
    "Double Bogey används när svaret är för tunt, fel eller missar det viktigaste.",
    "Ge alltid 2 eller 3 korta styrkor, en tydlig nästa sak att lägga till, en mini-ledtråd och ett modell-svar.",
    "Nämn inte att du är en AI och skriv inte om poäng."
  ].join(" ");

  const userPrompt = {
    chapterTitle: "Kemi i vardagshygienen",
    sectionTitle: section?.title || question.sectionLabel,
    sectionSummary: section?.summary || [],
    gradingRubric,
    question: {
      prompt: question.prompt,
      level: question.level,
      shortAnswer: question.shortAnswer,
      mustMention: question.mustMention,
      goodToMention: question.goodToMention,
      stretchPoints: question.stretchPoints
    },
    studentAnswer: answer,
    outputRules: [
      "shotResult ska vara en av: Hole in one, Birdie, Par, Bogey, Double Bogey",
      "encouragement ska vara max 18 ord",
      "whatWasGood ska innehålla 2 eller 3 korta punkter",
      "nextStep ska vara konkret och lätt att göra direkt",
      "miniHint ska vara extra kort",
      "idealAnswer ska vara ett tydligt elevsvar på 1-3 meningar"
    ]
  };

  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userPrompt, null, 2) }
      ],
      reasoning: {
        effort: "low"
      },
      text: {
        format: {
          type: "json_schema",
          name: "chemistry_feedback",
          strict: true,
          schema: feedbackSchema
        }
      },
      max_output_tokens: 900
    })
  });

  const payload = await apiResponse.json();

  if (!apiResponse.ok) {
    const message =
      payload?.error?.message ||
      "OpenAI-svaret gick inte att hämta just nu.";
    throw new Error(message);
  }

  const rawText = extractOutputText(payload);

  if (!rawText) {
    console.error("OpenAI payload without readable text:");
    console.error(JSON.stringify(payload, null, 2));
    throw new Error("OpenAI svarade utan läsbar feedback.");
  }

  return JSON.parse(rawText);
}

async function coachQuestion({ question }) {
  const section = studySections.find((item) => item.id === question.section);

  const systemPrompt = [
    "Du är en lugn och varm kemicoach för en 12-åring.",
    "Du ska hjälpa eleven förstå frågan utan att direkt ge bort hela svaret.",
    "Skriv mycket enkel svenska med korta meningar.",
    "Förklara vad frågan egentligen vill att eleven ska tänka på.",
    "Ge ett första litet steg och en startmening som eleven kan skriva vidare på.",
    "Håll allt konkret och nära materialet. Hitta inte på extra fakta."
  ].join(" ");

  const userPrompt = {
    sectionTitle: section?.title || question.sectionLabel,
    sectionSummary: section?.summary || [],
    question: {
      prompt: question.prompt,
      hint: question.hint,
      starter: question.starter,
      bookSupport: question.bookSupport || "",
      shortAnswer: question.shortAnswer,
      mustMention: question.mustMention
    },
    outputRules: [
      "questionInSimpleWords ska vara 1-2 korta meningar",
      "firstStep ska vara ett litet första tankesteg",
      "sentenceStarter ska vara en enkel start på ett elevsvar",
      "bookConnection ska låta som en kort boknära hjälp, inte ett helt facit",
      "lookForWords ska vara 2 till 5 ord eller begrepp som eleven bör leta efter eller använda",
      "ge inte ett helt facit"
    ]
  };

  const payload = await requestOpenAIJson({
    systemPrompt,
    userPrompt,
    schemaName: "chemistry_coach_help",
    schema: coachSchema,
    maxOutputTokens: 300
  });

  const rawText = extractOutputText(payload);

  if (!rawText) {
    console.error("OpenAI coach payload without readable text:");
    console.error(JSON.stringify(payload, null, 2));
    return buildLocalCoachHelp(question);
  }

  try {
    return JSON.parse(rawText);
  } catch (error) {
    console.error("OpenAI coach text could not be parsed as JSON:");
    console.error(rawText);
    console.error(error);
    return buildLocalCoachHelp(question);
  }
}

function buildLocalCoachHelp(question) {
  return {
    questionInSimpleWords: `Frågan vill att du visar att du förstår: ${question.prompt}`,
    firstStep: question.hint,
    sentenceStarter: question.starter,
    bookConnection: question.bookSupport || question.shortAnswer,
    lookForWords: (question.mustMention || []).slice(0, 4)
  };
}

async function requestOpenAIJson({
  systemPrompt,
  userPrompt,
  schemaName,
  schema,
  maxOutputTokens
}) {
  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userPrompt, null, 2) }
      ],
      reasoning: {
        effort: "low"
      },
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          strict: true,
          schema
        }
      },
      max_output_tokens: maxOutputTokens
    })
  });

  const payload = await apiResponse.json();

  if (!apiResponse.ok) {
    const message =
      payload?.error?.message ||
      "OpenAI-svaret gick inte att hämta just nu.";
    throw new Error(message);
  }

  return payload;
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  if (Array.isArray(payload.output_text) && payload.output_text.length > 0) {
    return payload.output_text.join("");
  }

  if (!Array.isArray(payload.output)) {
    return "";
  }

  for (const item of payload.output) {
    if (!Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (
        (content.type === "output_text" || content.type === "text") &&
        typeof content.text === "string"
      ) {
        return content.text;
      }

      if (typeof content?.text?.value === "string") {
        return content.text.value;
      }

      if (typeof content?.json === "object" && content.json) {
        return JSON.stringify(content.json);
      }

      if (typeof content?.arguments === "string") {
        return content.arguments;
      }
    }
  }

  return "";
}

async function serveStatic(pathname, response) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = normalize(join(publicDir, safePath));
  const extension = extname(filePath);

  try {
    if (!filePath.startsWith(publicDir)) {
      throw new Error("Unsafe path");
    }

    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": STATIC_TYPES[extension] || "application/octet-stream"
    });
    response.end(file);
  } catch {
    sendJson(response, 404, { error: "Sidan hittades inte." });
  }
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function loadEnvFile() {
  const envPath = join(__dirname, ".env");

  try {
    const contents = readFileSync(envPath, "utf8");

    contents.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        return;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    });
  } catch {}
}
