import { questions } from "./questions.js";

const questionDiv = document.querySelector(".js-question");
const answerDivs = document.querySelectorAll(".answer");
const resultGraphic = document.querySelectorAll(".result");

let currentQuestionCounter = 0;
let score = 0;

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
  let currentQuestion = shuffledArray[currentQuestionCounter];
  questionDiv.innerHTML = currentQuestion.question;
  resultGraphic[currentQuestionCounter].classList.add("current");

  let shuffledAnswers = shuffleArray(currentQuestion.answers);
  console.log(shuffledAnswers);
  shuffledAnswers.forEach((answer, index) => {
    answerDivs[index].innerHTML = answer.text;
  });
}
