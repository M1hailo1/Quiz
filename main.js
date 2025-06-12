import { questions, questionsSerbian } from "./questions.js";

const questionDiv = document.querySelector(".js-question");
const answerDivs = document.querySelectorAll(".answer");
const resultGraphic = document.querySelectorAll(".result");
const resetButton = document.querySelector(".js-reset-button");
const scoreGraphic = document.querySelector(".js-score");
const timerGraphic = document.querySelector(".js-timer");
const startGameDiv = document.querySelector(".js-start-game-div");
const startGameButton = document.querySelector(".js-start-game-button");
const languageSelect = document.querySelector(".js-language-select");
const progressBar = document.querySelector(".js-progress-bar");
const rewardGraphic = document.querySelector(".js-congratulations");

let currentQuestionCounter = 0;
let score = 0;
let click = 0;
let timeout;
let timer;
let timeLeft = 10;
let shuffledArray;
scoreGraphic.innerHTML = "Score: 0/0";

function shuffleArray(array) {
  let shuffledArray = array;
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }
  return shuffledArray;
}

function startGame() {
  if (languageSelect.value === "en") shuffledArray = shuffleArray(questions);
  else if (languageSelect.value === "sr")
    shuffledArray = shuffleArray(questionsSerbian);
  currentQuestionCounter = 0;
  score = 0;
  startGameDiv.classList.add("hide");
  startGameButton.classList.add("hide");

  loadQuestion();
}

function loadQuestion() {
  answerDivs.forEach((answer) => {
    answer.classList.remove("correct", "wrong");
  });

  if (currentQuestionCounter === 10) return;

  let currentQuestion = shuffledArray[currentQuestionCounter];
  questionDiv.innerHTML = currentQuestion.question;
  resultGraphic[currentQuestionCounter].classList.add("current");

  let shuffledAnswers = shuffleArray(currentQuestion.answers);
  shuffledAnswers.forEach((answer, index) => {
    answerDivs[index].innerHTML = answer.text;
  });

  if (currentQuestionCounter > 0) {
    resultGraphic[currentQuestionCounter - 1].classList.remove("current");
  }
  currentQuestionCounter++;
  click = 0;
  clearInterval(timer);
  startTimer();
}

function answerHandling(answer, index) {
  clearInterval(timer);
  const currentQuestion = shuffledArray[currentQuestionCounter - 1];
  if (
    answer.innerText === currentQuestion.answers[index].text &&
    currentQuestion.answers[index].correct
  ) {
    answer.classList.add("correct");
    score++;
    scoreGraphic.innerHTML = `Score: ${score}/${currentQuestionCounter}`;
  } else {
    answer.classList.add("wrong");
    scoreGraphic.innerHTML = `Score: ${score}/${currentQuestionCounter}`;
    answerDivs.forEach((answer, index) => {
      const currentQuestion = shuffledArray[currentQuestionCounter - 1];
      if (currentQuestion.answers[index].correct) {
        answer.classList.add("correct");
      }
    });
  }
}

function loadReset() {
  if (currentQuestionCounter === 10) {
    setTimeout(() => {
      resetButton.classList.add("reset-button-show");
      resultGraphic[9].classList.remove("current");
      rewardGraphic.classList.add("show");
    }, 2500);

    if (score > 8) {
      rewardGraphic.innerHTML = `<img src="congratulations.png" class="img-class" alt="Congratulations" />
      <p class="p-class-reward">You answered ${score} out of 10 questions correctly.</p>`;
    }
    if (score < 9 && score > 6) {
      rewardGraphic.innerHTML = `<img src="good-job.png" class="img-class" alt="Good job" />
      <p class="p-class-reward">You answered ${score} out of 10 questions correctly.</p>`;
    }
    if (score < 7 && score > 3) {
      rewardGraphic.innerHTML = `<img src="not-bad.png" class="img-class" alt="Be better" />
      <p class="p-class-reward">You answered ${score} out of 10 questions correctly.</p>`;
    }
    if (score < 4 && score >= 0) {
      rewardGraphic.innerHTML = `<img src="horrible.png" class="img-class" alt="You are a failure" />
      <p class="p-class-reward">You answered ${score} out of 10 questions correctly.</p>`;
    }
  }
}

function restartGame() {
  rewardGraphic.classList.remove("show");
  rewardGraphic.innerHTML = "";
  scoreGraphic.innerHTML = "Score: 0/0";
  resultGraphic[9].classList.remove("current");
  resetButton.classList.remove("reset-button-show");
  clearInterval(timer);
  timerGraphic.innerHTML = "Time left: 10";
  startGame();
}

function startTimer() {
  timeLeft = 10;
  timerGraphic.innerHTML = `Time left: ${timeLeft}`;
  progressBar.style.width = 100 + "%";

  timer = setInterval(() => {
    timeLeft--;
    timerGraphic.innerHTML = `Time left: ${timeLeft}`;
    const progress = (timeLeft / 10) * 100;
    progressBar.style.width = progress + "%";

    if (timeLeft <= 0) {
      clearInterval(timer);
      timerGraphic.innerHTML = "Time's up!";
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  scoreGraphic.innerHTML = `Score: ${score}/${currentQuestionCounter}`;

  answerDivs.forEach((answer, index) => {
    const currentQuestion = shuffledArray[currentQuestionCounter - 1];
    if (currentQuestion.answers[index].correct) {
      answer.classList.add("correct");
    }
  });

  loadReset();
  timeout = setTimeout(loadQuestion, 2500);
}

startGameButton.addEventListener("click", startGame);

resetButton.addEventListener("click", restartGame);

answerDivs.forEach((answer, index) => {
  answer.addEventListener("click", () => {
    if (!click) {
      answerHandling(answer, index);
      timeout = setTimeout(loadQuestion, 2500);
      loadReset();
    }
    click++;
  });
});

// Try again da vrati na start game button mozda?
// Add dark/light theme
// Add clickability to result graphics
