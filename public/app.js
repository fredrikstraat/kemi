const state = {
  questions: [],
  currentQuestion: null,
  answersChecked: 0,
  recentBands: [],
  lastFeedback: null
};

const statusBanner = document.querySelector("#statusBanner");
const questionPrompt = document.querySelector("#questionPrompt");
const focusBadge = document.querySelector("#focusBadge");
const sectionBadge = document.querySelector("#sectionBadge");
const levelBadge = document.querySelector("#levelBadge");
const questionHint = document.querySelector("#questionHint");
const questionStarter = document.querySelector("#questionStarter");
const answerInput = document.querySelector("#answerInput");
const checkButton = document.querySelector("#checkButton");
const retryButton = document.querySelector("#retryButton");
const nextButton = document.querySelector("#nextButton");
const feedbackPanel = document.querySelector("#feedbackPanel");
const feedbackTitle = document.querySelector("#feedbackTitle");
const gradeBadge = document.querySelector("#gradeBadge");
const strengthList = document.querySelector("#strengthList");
const nextStepText = document.querySelector("#nextStepText");
const miniHintText = document.querySelector("#miniHintText");
const idealAnswerText = document.querySelector("#idealAnswerText");
const answeredCount = document.querySelector("#answeredCount");
const sessionLevel = document.querySelector("#sessionLevel");
const practiceProgress = document.querySelector("#practiceProgress");
const progressCaption = document.querySelector("#progressCaption");

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Något gick fel.");
  }

  return data;
}

function showStatus(message, tone = "info") {
  statusBanner.textContent = message;
  statusBanner.className = `status-banner tone-${tone}`;
}

function hideStatus() {
  statusBanner.className = "status-banner is-hidden";
  statusBanner.textContent = "";
}

function chooseNextQuestion() {
  if (state.questions.length === 0) {
    return;
  }

  const pool = state.questions.filter(
    (question) => question.id !== state.currentQuestion?.id
  );
  const list = pool.length > 0 ? pool : state.questions;
  const focusQuestions = list.filter((question) => question.isFocus);
  const useFocusList =
    focusQuestions.length > 0 &&
    (state.answersChecked < 4 || Math.random() < 0.75);
  const chosenPool = useFocusList ? focusQuestions : list;
  const randomIndex = Math.floor(Math.random() * chosenPool.length);
  state.currentQuestion = chosenPool[randomIndex];
  state.lastFeedback = null;

  questionPrompt.textContent = state.currentQuestion.prompt;
  focusBadge.textContent = state.currentQuestion.focusLabel || "Fokusfråga";
  focusBadge.classList.toggle("is-hidden", !state.currentQuestion.isFocus);
  sectionBadge.textContent = state.currentQuestion.sectionLabel;
  levelBadge.textContent = `${state.currentQuestion.level}-nivå`;
  questionHint.textContent = state.currentQuestion.hint;
  questionStarter.textContent = state.currentQuestion.starter;
  answerInput.value = "";
  answerInput.focus();
  retryButton.classList.add("is-hidden");
  feedbackPanel.classList.add("is-hidden");
}

function updateSessionSummary() {
  answeredCount.textContent = String(state.answersChecked);
  updatePracticeProgress();

  if (state.recentBands.length === 0) {
    sessionLevel.textContent = "Starta med första frågan.";
    return;
  }

  const points = state.recentBands.map((band) => {
    if (band === "A") return 4;
    if (band === "C") return 3;
    if (band === "E") return 2;
    return 1;
  });

  const average = points.reduce((sum, value) => sum + value, 0) / points.length;

  if (average >= 3.5) {
    sessionLevel.textContent = "Just nu sitter fokusfrågorna ganska bra. Fortsätt koppla ihop begrepp och förklaringar.";
    return;
  }

  if (average >= 2.5) {
    sessionLevel.textContent = "Du är på god väg. Försök använda fler kemiord i hela meningar på fokusfrågorna.";
    return;
  }

  if (average >= 1.8) {
    sessionLevel.textContent = "Du är på väg mot E eller E. Ta det viktigaste först i fokusfrågorna.";
    return;
  }

  sessionLevel.textContent = "Vi bygger från grunden. Ta en tydlig sak i taget.";
}

function updatePracticeProgress() {
  const target = 10;
  const current = Math.min(state.answersChecked, target);
  const percent = (current / target) * 100;
  practiceProgress.style.width = `${percent}%`;
  progressCaption.textContent = `${current} av ${target} fokusfrågor tränade`;
}

function renderFeedback(feedback) {
  feedbackPanel.classList.remove("is-hidden");
  feedbackTitle.textContent = feedback.encouragement;
  gradeBadge.textContent = feedback.gradeBand;
  gradeBadge.dataset.band = feedback.gradeBand;

  strengthList.innerHTML = "";
  feedback.whatWasGood.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    strengthList.appendChild(li);
  });

  nextStepText.textContent = feedback.nextStep;
  miniHintText.textContent = feedback.miniHint;
  idealAnswerText.textContent = feedback.idealAnswer;

  retryButton.classList.remove("is-hidden");
}

async function loadApp() {
  try {
    const [status, questions] = await Promise.all([
      fetchJson("/api/status"),
      fetchJson("/api/questions")
    ]);

    state.questions = questions.questions;

    if (!status.configured) {
      showStatus(
        "OpenAI-nyckel saknas just nu. Lägg in OPENAI_API_KEY i .env för att få AI-coaching och bedömning.",
        "warn"
      );
    } else {
      showStatus(`OpenAI är redo. Modellen som används är ${status.model}. Fokusfrågorna kommer oftare.`, "ok");
    }

    chooseNextQuestion();
    updatePracticeProgress();
  } catch (error) {
    showStatus(error.message, "error");
  }
}

async function checkAnswer() {
  const answer = answerInput.value.trim();

  if (!state.currentQuestion) {
    showStatus("Ingen fråga laddad ännu.", "error");
    return;
  }

  if (answer.length < 3) {
    showStatus("Skriv lite mer först, gärna en hel mening.", "warn");
    return;
  }

  hideStatus();
  checkButton.disabled = true;
  checkButton.textContent = "Tänker ...";

  try {
    const data = await fetchJson("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: state.currentQuestion.id,
        answer
      })
    });

    state.answersChecked += 1;
    state.recentBands.push(data.feedback.gradeBand);
    state.recentBands = state.recentBands.slice(-6);
    state.lastFeedback = data.feedback;

    updateSessionSummary();
    renderFeedback(data.feedback);
  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    checkButton.disabled = false;
    checkButton.textContent = "Kolla svar";
  }
}

checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", chooseNextQuestion);
retryButton.addEventListener("click", () => {
  answerInput.focus();
  showStatus("Bra, testa igen och lägg till det som saknas.", "ok");
});

loadApp();
