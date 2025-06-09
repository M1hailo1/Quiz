import { questions } from "./questions.js";

const questionDiv = document.querySelector(".js-question");
const answerDivs = document.querySelectorAll(".answer");
const resultGraphic = document.querySelectorAll(".result");
const resetButton = document.querySelector(".js-reset-button");
let scoreGraphic = document.querySelector(".js-score");

let currentQuestionCounter = 0;
let score = 0;
let timeout;
let click = 0;
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

let shuffledArray = shuffleArray(questions);
startGame();

function startGame() {
  currentQuestionCounter = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionCounter === 10) return;

  answerDivs.forEach((answer) => {
    answer.classList.remove("correct", "wrong");
  });

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
}

function answerHandling(answer, index) {
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
  }
}

function loadReset() {
  if (currentQuestionCounter === 10) {
    resetButton.classList.add("reset-button-show");
  }
}

function restartGame() {
  startGame();
  scoreGraphic.innerHTML = "Score: 0/0";
  resultGraphic[9].classList.remove("current");
  resetButton.classList.remove("reset-button-show");
}

resetButton.addEventListener("click", restartGame);

answerDivs.forEach((answer, index) => {
  answer.addEventListener("click", () => {
    if (!click) {
      answerHandling(answer, index);
      timeout = setTimeout(loadQuestion, 1500);
      loadReset();
    }
    click++;
  });
});
