const state = {
  courses: [],
  questions: [],
  questionMap: new Map(),
  currentCourse: null,
  currentCourseQuestions: [],
  currentQuestion: null,
  currentQuestionIndex: 0,
  selectedChoiceIndex: null,
  progressByCourseId: {},
  lastHoleIndexByCourseId: {},
  selectedReplayIndexes: [],
  replayQueueIndexes: [],
  replayQueuePosition: 0
};

const STORAGE_KEY = "kemi-isak-progress-v1";

const statusBanner = document.querySelector("#statusBanner");
const questionPrompt = document.querySelector("#questionPrompt");
const focusBadge = document.querySelector("#focusBadge");
const sectionBadge = document.querySelector("#sectionBadge");
const levelBadge = document.querySelector("#levelBadge");
const questionHint = document.querySelector("#questionHint");
const questionStarter = document.querySelector("#questionStarter");
const answerLabel = document.querySelector("#answerLabel");
const choicePanel = document.querySelector("#choicePanel");
const answerInput = document.querySelector("#answerInput");
const checkButton = document.querySelector("#checkButton");
const coachButton = document.querySelector("#coachButton");
const retryButton = document.querySelector("#retryButton");
const nextButton = document.querySelector("#nextButton");
const coachPanel = document.querySelector("#coachPanel");
const closeCoachButton = document.querySelector("#closeCoachButton");
const coachBackButton = document.querySelector("#coachBackButton");
const coachTryButton = document.querySelector("#coachTryButton");
const coachMeaning = document.querySelector("#coachMeaning");
const coachStep = document.querySelector("#coachStep");
const coachStarterText = document.querySelector("#coachStarter");
const coachBook = document.querySelector("#coachBook");
const coachExample = document.querySelector("#coachExample");
const coachWords = document.querySelector("#coachWords");
const feedbackPanel = document.querySelector("#feedbackPanel");
const closeFeedbackButton = document.querySelector("#closeFeedbackButton");
const feedbackRetryButton = document.querySelector("#feedbackRetryButton");
const feedbackNextButton = document.querySelector("#feedbackNextButton");
const feedbackTitle = document.querySelector("#feedbackTitle");
const shotBadge = document.querySelector("#shotBadge");
const gradeBadge = document.querySelector("#gradeBadge");
const strengthList = document.querySelector("#strengthList");
const nextStepText = document.querySelector("#nextStepText");
const miniHintText = document.querySelector("#miniHintText");
const idealAnswerText = document.querySelector("#idealAnswerText");
const feedbackBookText = document.querySelector("#feedbackBookText");
const feedbackEmpty = document.querySelector("#feedbackEmpty");
const practiceProgress = document.querySelector("#practiceProgress");
const progressCaption = document.querySelector("#progressCaption");
const holeCaption = document.querySelector("#holeCaption");
const holeNumberDisplay = document.querySelector("#holeNumberDisplay");
const holeTotalDisplay = document.querySelector("#holeTotalDisplay");
const holeCourseDisplay = document.querySelector("#holeCourseDisplay");
const holeProgressDots = document.querySelector("#holeProgressDots");
const handicapValue = document.querySelector("#handicapValue");
const pegCount = document.querySelector("#pegCount");
const ballCount = document.querySelector("#ballCount");
const clubCount = document.querySelector("#clubCount");
const courseGrid = document.querySelector("#courseGrid");
const courseCaption = document.querySelector("#courseCaption");
const courseSection = document.querySelector("#courseSection");
const currentCourseTitle = document.querySelector("#currentCourseTitle");
const currentCourseMeta = document.querySelector("#currentCourseMeta");
const currentCourseHandicap = document.querySelector("#currentCourseHandicap");
const currentCourseProgress = document.querySelector("#currentCourseProgress");
const scorecardPanel = document.querySelector("#scorecardPanel");
const scorecardHeader = document.querySelector("#scorecardHeader");
const scorecardTitle = document.querySelector("#scorecardTitle");
const scorecardSummary = document.querySelector("#scorecardSummary");
const scorecardBody = document.querySelector("#scorecardBody");
const closeScorecardButton = document.querySelector("#closeScorecardButton");
const openScorecardButton = document.querySelector("#openScorecardButton");
const goToSelectedButton = document.querySelector("#goToSelectedButton");
const replaySelectedButton = document.querySelector("#replaySelectedButton");
const clearReplaySelectionButton = document.querySelector("#clearReplaySelectionButton");

const scorecardDrag = {
  active: false,
  offsetX: 0,
  offsetY: 0
};

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Något gick fel.");
  }

  return data;
}

function saveAppState() {
  try {
    const payload = {
      currentCourseId: state.currentCourse?.id || null,
      currentQuestionIndex: state.currentQuestionIndex,
      progressByCourseId: state.progressByCourseId,
      lastHoleIndexByCourseId: state.lastHoleIndexByCourseId
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (_error) {
    // Ignore localStorage failures so practice can continue.
  }
}

function loadSavedAppState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") {
      return null;
    }

    return {
      currentCourseId:
        typeof saved.currentCourseId === "string" ? saved.currentCourseId : null,
      currentQuestionIndex:
        Number.isInteger(saved.currentQuestionIndex) ? saved.currentQuestionIndex : 0,
      progressByCourseId:
        saved.progressByCourseId && typeof saved.progressByCourseId === "object"
          ? saved.progressByCourseId
          : {},
      lastHoleIndexByCourseId:
        saved.lastHoleIndexByCourseId && typeof saved.lastHoleIndexByCourseId === "object"
          ? saved.lastHoleIndexByCourseId
          : {}
    };
  } catch (_error) {
    return null;
  }
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
  feedbackPanel.classList.add("is-hidden");
  feedbackPanel.classList.add("is-empty");
  feedbackPanel.setAttribute("aria-hidden", "true");
  feedbackEmpty.classList.remove("is-hidden");
  feedbackTitle.textContent = "Här ser du direkt vad som var bra och vad du ska lägga till.";
  shotBadge.textContent = "-";
  shotBadge.dataset.shot = "";
  gradeBadge.textContent = "-";
  gradeBadge.dataset.band = "";
  strengthList.innerHTML = "";
  nextStepText.textContent = "";
  miniHintText.textContent = "";
  idealAnswerText.textContent = "";
  feedbackBookText.textContent = "";
}

function resetCoachPanel() {
  coachPanel.classList.add("is-hidden");
  coachPanel.setAttribute("aria-hidden", "true");
  coachMeaning.textContent = "";
  coachStep.textContent = "";
  coachStarterText.textContent = "";
  coachBook.textContent = "";
  coachExample.textContent = "";
  coachWords.textContent = "";
  coachButton.disabled = false;
  coachButton.textContent = "Fråga Ludvig Åberg";
}

function updateReplayButtons() {
  const count = state.selectedReplayIndexes.length;
  goToSelectedButton.disabled = count !== 1;
  replaySelectedButton.disabled = count === 0;
  clearReplaySelectionButton.disabled = count === 0;
  goToSelectedButton.textContent =
    count === 1
      ? `Gå till hål ${state.selectedReplayIndexes[0] + 1}`
      : "Gå till valt hål";
  replaySelectedButton.textContent = "Spela om valda hål";
  if (count > 1) {
    replaySelectedButton.textContent = `Spela om ${count} valda hål`;
  } else if (count === 1) {
    replaySelectedButton.textContent = "Spela om 1 valt hål";
  }
}

function focusCurrentAnswerInput() {
  if (state.currentQuestion?.type === "multiple-choice") {
    choicePanel.querySelector(".choice-option")?.focus();
    return;
  }

  answerInput.focus();
}

function getCurrentCourseProgress() {
  return getCourseProgressById(state.currentCourse?.id);
}

function getCourseProgressById(courseId) {
  if (!courseId) {
    return { answersChecked: 0, resultsByHoleIndex: {} };
  }

  if (!state.progressByCourseId[courseId]) {
    state.progressByCourseId[courseId] = {
      answersChecked: 0,
      resultsByHoleIndex: {}
    };
  }

  return state.progressByCourseId[courseId];
}

function buildCourseQuestionSequence(course) {
  return course.holeIds
    .map((questionId, index) => {
      const question = state.questionMap.get(questionId);
      if (!question) {
        return null;
      }

      return {
        ...question,
        holeNumber: index + 1,
        repeatedHole: course.holeIds.indexOf(questionId) !== index
      };
    })
    .filter(Boolean);
}

function setCurrentQuestion(index) {
  if (state.currentCourseQuestions.length === 0) {
    return;
  }

  const safeIndex =
    ((index % state.currentCourseQuestions.length) + state.currentCourseQuestions.length) %
    state.currentCourseQuestions.length;

  state.currentQuestionIndex = safeIndex;
  state.currentQuestion = state.currentCourseQuestions[safeIndex];
  if (state.currentCourse?.id) {
    state.lastHoleIndexByCourseId[state.currentCourse.id] = safeIndex;
  }

  questionPrompt.textContent = state.currentQuestion.prompt;
  focusBadge.textContent = state.currentQuestion.focusLabel || "Fokusfråga";
  focusBadge.classList.toggle("is-hidden", !state.currentQuestion.isFocus);
  sectionBadge.textContent = state.currentQuestion.sectionLabel;
  levelBadge.textContent = `${state.currentQuestion.level}-nivå`;
  holeCaption.textContent = `${state.currentCourse?.title || "Bana"} · Hål ${safeIndex + 1} av ${state.currentCourseQuestions.length}`;
  if (state.replayQueueIndexes.length > 0) {
    holeCaption.textContent += ` · Omspel ${state.replayQueuePosition + 1} av ${state.replayQueueIndexes.length}`;
  }
  holeNumberDisplay.textContent = `Hål ${safeIndex + 1}`;
  holeTotalDisplay.textContent = `av ${state.currentCourseQuestions.length}`;
  holeCourseDisplay.textContent = state.currentCourse?.title || "Kemibana";
  questionHint.textContent = state.currentQuestion.hint;
  questionStarter.textContent = state.currentQuestion.starter;
  state.selectedChoiceIndex = null;
  answerInput.value = "";
  renderQuestionInput();
  retryButton.classList.add("is-hidden");
  nextButton.textContent =
    state.replayQueueIndexes.length > 0
      ? state.replayQueuePosition === state.replayQueueIndexes.length - 1
        ? "Avsluta omspel"
        : "Nästa valda hål"
      : safeIndex === state.currentCourseQuestions.length - 1
        ? "Spela om banan"
        : "Nästa hål";
  focusCurrentAnswerInput();
  resetCoachPanel();
  resetFeedback();
  renderHoleProgressDots();
  renderScorecard();
  saveAppState();
}

function chooseNextQuestion() {
  if (state.replayQueueIndexes.length > 0) {
    const nextReplayPosition = state.replayQueuePosition + 1;
    if (nextReplayPosition < state.replayQueueIndexes.length) {
      state.replayQueuePosition = nextReplayPosition;
      setCurrentQuestion(state.replayQueueIndexes[nextReplayPosition]);
      return;
    }

    const lastHoleIndex = state.currentQuestionIndex;
    state.replayQueueIndexes = [];
    state.replayQueuePosition = 0;
    showStatus("Omspelsrundan är klar. Nu är du tillbaka på banan.", "ok");
    setCurrentQuestion(lastHoleIndex);
    return;
  }

  setCurrentQuestion(state.currentQuestionIndex + 1);
}

function jumpToHole(index, message = "") {
  if (!Number.isInteger(index) || index < 0 || index >= state.currentCourseQuestions.length) {
    return;
  }

  state.replayQueueIndexes = [];
  state.replayQueuePosition = 0;
  state.selectedReplayIndexes = [];

  if (message) {
    showStatus(message, "ok");
  }

  setCurrentQuestion(index);
}

function getBandPoints(band) {
  if (band === "A") return 4;
  if (band === "C") return 3;
  if (band === "E") return 2;
  return 1;
}

function getShotPoints(shot) {
  if (shot === "Hole in one") return 5;
  if (shot === "Birdie") return 4;
  if (shot === "Par") return 3;
  if (shot === "Bogey") return 2;
  return 1;
}

function getShotClassName(shot) {
  return shot ? shot.toLowerCase().replace(/\s+/g, "-") : "pending";
}

function renderChoiceOptions() {
  choicePanel.innerHTML = "";

  if (!state.currentQuestion?.options?.length) {
    return;
  }

  state.currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "choice-option";
    optionButton.dataset.selected = String(state.selectedChoiceIndex === index);
    optionButton.setAttribute("aria-pressed", String(state.selectedChoiceIndex === index));
    optionButton.innerHTML = `
      <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
      <span class="choice-copy">${option}</span>
    `;
    optionButton.addEventListener("click", () => {
      state.selectedChoiceIndex = index;
      renderChoiceOptions();
    });
    choicePanel.appendChild(optionButton);
  });
}

function renderQuestionInput() {
  const isMultipleChoice = state.currentQuestion?.type === "multiple-choice";

  answerLabel.textContent = isMultipleChoice ? "Välj ett svar" : "Isaks svar";
  choicePanel.classList.toggle("is-hidden", !isMultipleChoice);
  answerInput.classList.toggle("is-hidden", isMultipleChoice);

  if (isMultipleChoice) {
    renderChoiceOptions();
  } else {
    choicePanel.innerHTML = "";
  }
}

function calculateRoundProgress(courseId = state.currentCourse?.id, holeCount = state.currentCourseQuestions.length) {
  const progress = getCourseProgressById(courseId);
  const answeredIndexes = Object.keys(progress.resultsByHoleIndex);
  const answeredCount = answeredIndexes.length;
  const answeredBands = answeredIndexes.map(
    (index) => progress.resultsByHoleIndex[index]?.gradeBand || "På väg mot E"
  );
  const averagePoints =
    answeredBands.length > 0
      ? answeredBands.reduce((sum, band) => sum + getBandPoints(band), 0) /
        answeredBands.length
      : 1;
  const handicap = Math.max(0, Math.round((5 - averagePoints) * 9));
  const balls = answeredBands.filter((band) => band === "A" || band === "C").length;

  return {
    answeredCount,
    handicap,
    pegs: answeredCount,
    balls,
    clubs: Math.floor(answeredCount / 9),
    holeCount
  };
}

function renderHoleProgressDots() {
  holeProgressDots.innerHTML = "";

  const progress = getCurrentCourseProgress();

  state.currentCourseQuestions.forEach((question, index) => {
    const dot = document.createElement("button");
    const holeResult = progress.resultsByHoleIndex[index];
    dot.className = "hole-dot";
    dot.type = "button";
    dot.dataset.state = holeResult ? "done" : "upcoming";
    dot.dataset.current = String(index === state.currentQuestionIndex);
    dot.setAttribute("aria-label", `Gå till hål ${index + 1}`);

    if (holeResult?.shotResult) {
      dot.dataset.shot = holeResult.shotResult;
      dot.title = `Hål ${index + 1}: ${holeResult.shotResult}`;
    } else {
      dot.title = `Hål ${index + 1}`;
    }

    dot.addEventListener("click", () => {
      jumpToHole(index, `Nu hoppar Isak till hål ${index + 1}.`);
    });

    holeProgressDots.appendChild(dot);
  });
}

function renderScorecard() {
  if (!state.currentCourse) {
    scorecardTitle.textContent = "Ingen bana vald";
    scorecardSummary.textContent = "Välj en bana för att se scorecard.";
    scorecardBody.innerHTML = "";
    return;
  }

  const progress = getCurrentCourseProgress();
  const roundProgress = calculateRoundProgress(
    state.currentCourse.id,
    state.currentCourseQuestions.length
  );

  scorecardTitle.textContent = state.currentCourse.title;
  scorecardSummary.textContent = `Nu: hål ${state.currentQuestionIndex + 1} av ${state.currentCourseQuestions.length} • Hcp ${roundProgress.handicap} • ${roundProgress.answeredCount} spelade`;
  scorecardBody.innerHTML = "";

  state.currentCourseQuestions.forEach((question, index) => {
    const row = document.createElement("div");
    const holeResult = progress.resultsByHoleIndex[index];
    const isCurrentHole = index === state.currentQuestionIndex;
    const isSelectedForReplay = state.selectedReplayIndexes.includes(index);
    row.className = "scorecard-row";
    row.dataset.current = String(isCurrentHole);
    row.dataset.selected = String(isSelectedForReplay);
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.setAttribute("aria-pressed", String(isSelectedForReplay));

    const shotLabel = holeResult?.shotResult || "Ej spelat";
    const gradeLabel = holeResult?.gradeBand || "-";
    const currentLabel = isSelectedForReplay
      ? "Valt hål"
      : isCurrentHole
        ? "Spelar nu"
        : question.sectionLabel;

    row.innerHTML = `
      <div class="scorecard-hole-meta">
        <strong>Hål ${index + 1}</strong>
        <span>${currentLabel}</span>
      </div>
      <div class="scorecard-hole-results">
        <span class="scorecard-shot scorecard-shot-${getShotClassName(shotLabel)}">${shotLabel}</span>
        <span class="scorecard-grade">${gradeLabel}</span>
      </div>
    `;

    const toggleSelection = () => {
      toggleReplayHole(index);
    };

    row.addEventListener("click", toggleSelection);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleSelection();
      }
    });

    scorecardBody.appendChild(row);
  });

  updateReplayButtons();
}

function setScorecardOpen(isOpen) {
  scorecardPanel.classList.toggle("is-hidden", !isOpen);
  openScorecardButton.classList.toggle("is-hidden", isOpen);
  scorecardPanel.setAttribute("aria-hidden", String(!isOpen));
}

function startScorecardDrag(event) {
  if (window.innerWidth < 760) {
    return;
  }

  if (!(event.target instanceof HTMLElement) || event.target.closest("button")) {
    return;
  }

  const rect = scorecardPanel.getBoundingClientRect();
  scorecardPanel.style.left = `${rect.left}px`;
  scorecardPanel.style.top = `${rect.top}px`;
  scorecardPanel.style.right = "auto";
  scorecardPanel.style.bottom = "auto";
  scorecardDrag.active = true;
  scorecardDrag.offsetX = event.clientX - rect.left;
  scorecardDrag.offsetY = event.clientY - rect.top;
  scorecardPanel.classList.add("is-dragging");
}

function moveScorecard(event) {
  if (!scorecardDrag.active) {
    return;
  }

  const nextLeft = Math.max(8, event.clientX - scorecardDrag.offsetX);
  const nextTop = Math.max(8, event.clientY - scorecardDrag.offsetY);
  scorecardPanel.style.left = `${nextLeft}px`;
  scorecardPanel.style.top = `${nextTop}px`;
}

function stopScorecardDrag() {
  scorecardDrag.active = false;
  scorecardPanel.classList.remove("is-dragging");
}

function updatePracticeProgress() {
  const progress = calculateRoundProgress();
  const target = state.currentCourseQuestions.length || 1;
  const current = Math.min(progress.answeredCount, target);
  const percent = (current / target) * 100;
  practiceProgress.style.width = `${percent}%`;
  progressCaption.textContent = `${current} av ${target} frågor spelade`;
  handicapValue.textContent = String(progress.handicap);
  pegCount.textContent = String(progress.pegs);
  ballCount.textContent = String(progress.balls);
  clubCount.textContent = String(progress.clubs);
}

function toggleReplayHole(index) {
  if (state.replayQueueIndexes.length > 0) {
    showStatus("Omspel pågår redan. Spela klart de valda hålen först.", "warn");
    return;
  }

  if (state.selectedReplayIndexes.includes(index)) {
    state.selectedReplayIndexes = state.selectedReplayIndexes.filter((item) => item !== index);
  } else {
    state.selectedReplayIndexes = [...state.selectedReplayIndexes, index].sort((a, b) => a - b);
  }

  renderScorecard();
}

function clearReplaySelection() {
  state.selectedReplayIndexes = [];
  renderScorecard();
}

function goToSelectedHole() {
  if (state.selectedReplayIndexes.length !== 1) {
    return;
  }

  const [selectedHoleIndex] = state.selectedReplayIndexes;
  jumpToHole(selectedHoleIndex, `Nu hoppar Isak tillbaka till hål ${selectedHoleIndex + 1}.`);
}

function startReplayForSelectedHoles() {
  if (!state.currentCourse || state.selectedReplayIndexes.length === 0) {
    return;
  }

  const currentProgress = getCurrentCourseProgress();

  state.selectedReplayIndexes.forEach((holeIndex) => {
    delete currentProgress.resultsByHoleIndex[holeIndex];
  });

  state.replayQueueIndexes = [...state.selectedReplayIndexes];
  state.replayQueuePosition = 0;
  state.selectedReplayIndexes = [];
  saveAppState();
  updatePracticeProgress();
  updateCurrentCourseSummary();
  renderCoursePicker();
  renderHoleProgressDots();
  showStatus(
    state.replayQueueIndexes.length === 1
      ? "Nu spelar Isak om det valda hålet."
      : `Nu spelar Isak om ${state.replayQueueIndexes.length} valda hål.`,
    "ok"
  );
  setCurrentQuestion(state.replayQueueIndexes[0]);
}

function updateCurrentCourseSummary() {
  if (!state.currentCourse) {
    currentCourseTitle.textContent = "Ingen bana vald";
    currentCourseMeta.textContent = "Välj en bana för att börja spela.";
    currentCourseHandicap.textContent = "36";
    currentCourseProgress.textContent = "0/0";
    return;
  }

  const progress = calculateRoundProgress(
    state.currentCourse.id,
    state.currentCourseQuestions.length
  );

  currentCourseTitle.textContent = state.currentCourse.title;
  currentCourseMeta.textContent = `${state.currentCourse.subtitle}. ${state.currentCourse.description}`;
  currentCourseHandicap.textContent = String(progress.handicap);
  currentCourseProgress.textContent = `${progress.answeredCount}/${state.currentCourseQuestions.length}`;
  renderScorecard();
}

function renderCoursePicker() {
  courseGrid.innerHTML = "";

  state.courses.forEach((course) => {
    const courseProgress = calculateRoundProgress(course.id, course.holeCount);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "course-card";
    button.dataset.courseId = course.id;
    button.dataset.theme = course.theme;
    button.setAttribute(
      "aria-pressed",
      String(state.currentCourse?.id === course.id)
    );

    button.innerHTML = `
      <div class="course-art">
        <span class="course-fairway"></span>
        <span class="course-flag"></span>
        <span class="course-sun"></span>
      </div>
      <div class="course-copy">
        <p class="course-kicker">${course.holeCount} hål</p>
        <h3>${course.title}</h3>
        <p class="course-subtitle">${course.subtitle}</p>
        <div class="course-stats">
          <span class="course-stat">Hcp ${courseProgress.handicap}</span>
          <span class="course-stat">${courseProgress.answeredCount}/${course.holeCount} hål</span>
        </div>
        <p class="course-description">${course.description}</p>
      </div>
    `;

    button.addEventListener("click", () => {
      selectCourse(course.id);
    });

    courseGrid.appendChild(button);
  });
}

function selectCourse(courseId) {
  const course = state.courses.find((item) => item.id === courseId);
  if (!course) {
    return;
  }

  state.currentCourse = course;
  state.currentCourseQuestions = buildCourseQuestionSequence(course);
  state.selectedReplayIndexes = [];
  state.replayQueueIndexes = [];
  state.replayQueuePosition = 0;
  courseCaption.textContent = `${course.subtitle}. ${course.description}`;
  renderCoursePicker();
  const savedHoleIndex = state.lastHoleIndexByCourseId[course.id];
  setCurrentQuestion(Number.isInteger(savedHoleIndex) ? savedHoleIndex : 0);
  updatePracticeProgress();
  updateCurrentCourseSummary();
  renderScorecard();
  saveAppState();
}

function renderFeedback(feedback) {
  feedbackPanel.classList.remove("is-empty");
  feedbackPanel.classList.remove("is-hidden");
  feedbackPanel.setAttribute("aria-hidden", "false");
  feedbackEmpty.classList.add("is-hidden");
  feedbackTitle.textContent = feedback.encouragement;
  shotBadge.textContent = feedback.shotResult;
  shotBadge.dataset.shot = feedback.shotResult;
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
  feedbackBookText.textContent =
    state.currentQuestion?.bookSupport ||
    "Titta i boken efter orden som hör ihop med frågan.";
  retryButton.classList.remove("is-hidden");
}

function closeFeedbackModal() {
  feedbackPanel.classList.add("is-hidden");
  feedbackPanel.setAttribute("aria-hidden", "true");
}

function renderCoachHelp(coach) {
  coachPanel.classList.remove("is-hidden");
  coachPanel.setAttribute("aria-hidden", "false");
  coachMeaning.textContent = coach.questionInSimpleWords;
  coachStep.textContent = coach.firstStep;
  coachStarterText.textContent = coach.sentenceStarter;
  coachBook.textContent = coach.bookConnection;
  coachExample.textContent =
    state.currentQuestion?.bookSupport ||
    "Leta efter ett konkret exempel i texten som hör ihop med den här frågan.";
  coachWords.textContent = coach.lookForWords.join(", ");
}

function closeCoachModal() {
  coachPanel.classList.add("is-hidden");
  coachPanel.setAttribute("aria-hidden", "true");
}

function announceRewardChanges(previous, current) {
  if (current.clubs > previous.clubs) {
    showStatus("Snyggt! Isak vann en klubba genom att klara ett helt avsnitt.", "ok");
    return;
  }

  if (current.balls > previous.balls) {
    showStatus("Bra spelat! Isak vann en golfboll med ett starkt svar.", "ok");
    return;
  }

  if (current.pegs > previous.pegs) {
    showStatus("En ny pegg är säkrad. Ett hål till är genomgånget.", "ok");
  }
}

async function loadApp() {
  try {
    const [status, questions] = await Promise.all([
      fetchJson("/api/status"),
      fetchJson("/api/questions")
    ]);

    state.courses = questions.courses || [];
    state.questions = questions.questions;
    state.questionMap = new Map(
      state.questions.map((question) => [question.id, question])
    );
    const savedState = loadSavedAppState();
    if (savedState) {
      state.progressByCourseId = savedState.progressByCourseId;
      state.lastHoleIndexByCourseId = savedState.lastHoleIndexByCourseId;
    }

    if (!status.configured) {
      showStatus(
        "OpenAI-nyckel saknas just nu. Lägg in OPENAI_API_KEY i .env för att få AI-coaching och bedömning.",
        "warn"
      );
    } else {
      showStatus(`OpenAI är redo. Modellen som används är ${status.model}.`, "ok");
    }

    const savedCourseId = savedState?.currentCourseId;
    const initialCourseId = state.courses.some((course) => course.id === savedCourseId)
      ? savedCourseId
      : state.courses[0]?.id;

    if (savedState && initialCourseId) {
      state.lastHoleIndexByCourseId[initialCourseId] = savedState.currentQuestionIndex;
    }

    selectCourse(initialCourseId);

    if (savedState && initialCourseId) {
      showStatus("Fortsätter där Isak slutade senast på den här datorn.", "ok");
    }
  } catch (error) {
    showStatus(error.message, "error");
  }
}

async function checkAnswer() {
  if (!state.currentQuestion) {
    showStatus("Ingen fråga laddad ännu.", "error");
    return;
  }

  const isMultipleChoice = state.currentQuestion.type === "multiple-choice";
  const answer = isMultipleChoice
    ? state.currentQuestion.options[state.selectedChoiceIndex] || ""
    : answerInput.value.trim();

  if (isMultipleChoice) {
    if (!Number.isInteger(state.selectedChoiceIndex)) {
      showStatus("Välj ett svar först.", "warn");
      return;
    }
  } else if (answer.length < 3) {
    showStatus("Skriv lite mer först, gärna en hel mening.", "warn");
    return;
  }

  hideStatus();
  checkButton.disabled = true;
  checkButton.textContent = "Tänker ...";

  try {
    const previousProgress = calculateRoundProgress();
    const currentProgress = getCurrentCourseProgress();
    const data = await fetchJson("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: state.currentQuestion.id,
        answer,
        selectedOptionIndex: state.selectedChoiceIndex
      })
    });

    currentProgress.answersChecked += 1;
    currentProgress.resultsByHoleIndex[state.currentQuestionIndex] =
      {
        gradeBand: data.feedback.gradeBand,
        shotResult: data.feedback.shotResult
      };
    saveAppState();
    updatePracticeProgress();
    updateCurrentCourseSummary();
    renderCoursePicker();
    renderHoleProgressDots();
    announceRewardChanges(previousProgress, calculateRoundProgress());
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
    coachButton.textContent = "Fråga Ludvig Åberg";
  }
}

checkButton.addEventListener("click", checkAnswer);
coachButton.addEventListener("click", getCoachHelp);
nextButton.addEventListener("click", chooseNextQuestion);
goToSelectedButton.addEventListener("click", goToSelectedHole);
replaySelectedButton.addEventListener("click", startReplayForSelectedHoles);
clearReplaySelectionButton.addEventListener("click", clearReplaySelection);
openScorecardButton.addEventListener("click", () => setScorecardOpen(true));
closeScorecardButton.addEventListener("click", () => setScorecardOpen(false));
scorecardHeader.addEventListener("pointerdown", startScorecardDrag);
window.addEventListener("pointermove", moveScorecard);
window.addEventListener("pointerup", stopScorecardDrag);
closeCoachButton.addEventListener("click", closeCoachModal);
coachBackButton.addEventListener("click", () => {
  closeCoachModal();
  focusCurrentAnswerInput();
});
coachTryButton.addEventListener("click", () => {
  closeCoachModal();
  focusCurrentAnswerInput();
});
closeFeedbackButton.addEventListener("click", closeFeedbackModal);
feedbackRetryButton.addEventListener("click", () => {
  closeFeedbackModal();
  if (state.currentQuestion?.type === "multiple-choice") {
    state.selectedChoiceIndex = null;
    renderChoiceOptions();
  }
  focusCurrentAnswerInput();
});
feedbackNextButton.addEventListener("click", () => {
  closeFeedbackModal();
  chooseNextQuestion();
});
feedbackPanel.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeFeedback === "true") {
    closeFeedbackModal();
  }
});
coachPanel.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeCoach === "true") {
    closeCoachModal();
  }
});
retryButton.addEventListener("click", () => {
  if (state.currentQuestion?.type === "multiple-choice") {
    state.selectedChoiceIndex = null;
    renderChoiceOptions();
  }
  focusCurrentAnswerInput();
  showStatus("Ta en Mulligan och prova igen.", "ok");
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const usesSubmitShortcut =
    key === "enter" && (event.ctrlKey || event.metaKey);

  if (usesSubmitShortcut) {
    event.preventDefault();
    checkAnswer();
    return;
  }

  if (event.altKey && key === "h") {
    event.preventDefault();
    getCoachHelp();
    return;
  }

  if (event.altKey && key === "n") {
    event.preventDefault();
    chooseNextQuestion();
    return;
  }

  if (key === "escape" && !coachPanel.classList.contains("is-hidden")) {
    closeCoachModal();
    return;
  }

  if (key === "escape" && !feedbackPanel.classList.contains("is-hidden")) {
    closeFeedbackModal();
  }
});

loadApp();
