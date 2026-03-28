const state = {
  questions: [],
  currentQuestion: null,
  answersChecked: 0
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
const coachButton = document.querySelector("#coachButton");
const retryButton = document.querySelector("#retryButton");
const nextButton = document.querySelector("#nextButton");
const coachPanel = document.querySelector("#coachPanel");
const coachMeaning = document.querySelector("#coachMeaning");
const coachStep = document.querySelector("#coachStep");
const coachStarterText = document.querySelector("#coachStarter");
const feedbackPanel = document.querySelector("#feedbackPanel");
const feedbackTitle = document.querySelector("#feedbackTitle");
const gradeBadge = document.querySelector("#gradeBadge");
const strengthList = document.querySelector("#strengthList");
const nextStepText = document.querySelector("#nextStepText");
const miniHintText = document.querySelector("#miniHintText");
const idealAnswerText = document.querySelector("#idealAnswerText");
const feedbackEmpty = document.querySelector("#feedbackEmpty");
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

function resetFeedback() {
  feedbackPanel.classList.add("is-empty");
  feedbackEmpty.classList.remove("is-hidden");
  feedbackTitle.textContent = "Här ser du direkt vad som var bra och vad du ska lägga till.";
  gradeBadge.textContent = "-";
  gradeBadge.dataset.band = "";
  strengthList.innerHTML = "";
  nextStepText.textContent = "";
  miniHintText.textContent = "";
  idealAnswerText.textContent = "";
}

function resetCoachPanel() {
  coachPanel.classList.add("is-hidden");
  coachMeaning.textContent = "";
  coachStep.textContent = "";
  coachStarterText.textContent = "";
  coachButton.disabled = false;
  coachButton.textContent = "Jag behöver hjälp";
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

  questionPrompt.textContent = state.currentQuestion.prompt;
  focusBadge.textContent = state.currentQuestion.focusLabel || "Fokusfråga";
  focusBadge.classList.toggle("is-hidden", !state.currentQuestion.isFocus);
  sectionBadge.textContent = state.currentQuestion.sectionLabel;
  levelBadge.textContent = `${state.currentQuestion.level}-nivå`;
  questionHint.textContent = state.currentQuestion.hint;
  questionStarter.textContent = state.currentQuestion.starter;
  answerInput.value = "";
  retryButton.classList.add("is-hidden");
  answerInput.focus();
  resetCoachPanel();
  resetFeedback();
}

function updatePracticeProgress() {
  const target = 10;
  const current = Math.min(state.answersChecked, target);
  const percent = (current / target) * 100;
  practiceProgress.style.width = `${percent}%`;
  progressCaption.textContent = `${current} av ${target} fokusfrågor tränade`;
}

function renderFeedback(feedback) {
  feedbackPanel.classList.remove("is-empty");
  feedbackEmpty.classList.add("is-hidden");
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

function renderCoachHelp(coach) {
  coachPanel.classList.remove("is-hidden");
  coachMeaning.textContent = coach.questionInSimpleWords;
  coachStep.textContent = coach.firstStep;
  coachStarterText.textContent = coach.sentenceStarter;
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
      showStatus(`OpenAI är redo. Modellen som används är ${status.model}.`, "ok");
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
    updatePracticeProgress();
    renderFeedback(data.feedback);
  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    checkButton.disabled = false;
    checkButton.textContent = "Kolla svar";
  }
}

async function getCoachHelp() {
  if (!state.currentQuestion) {
    showStatus("Ingen fråga laddad ännu.", "error");
    return;
  }

  hideStatus();
  coachButton.disabled = true;
  coachButton.textContent = "Hjälper ...";

  try {
    const data = await fetchJson("/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: state.currentQuestion.id
      })
    });

    renderCoachHelp(data.coach);
  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    coachButton.disabled = false;
    coachButton.textContent = "Jag behöver hjälp";
  }
}

checkButton.addEventListener("click", checkAnswer);
coachButton.addEventListener("click", getCoachHelp);
nextButton.addEventListener("click", chooseNextQuestion);
retryButton.addEventListener("click", () => {
  answerInput.focus();
  showStatus("Bra, testa igen och lägg till det som saknas.", "ok");
});

loadApp();
