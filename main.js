import { questions } from "./questions.js";

const questionDiv = document.querySelector(".js-question");
const answerDivs = document.querySelectorAll(".answer");
const resultGraphic = document.querySelectorAll(".result");
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

// function answerHandling(answer) {
//   if (
//     answer.innerText === shuffledArray.answers.text &&
//     shuffledArray.answers.correct
//   ) {
//       answer.classList.add("correct")
//     //dodaje se klasa zelena
//     score++;
//     scoreGraphic.innerHTML = `Score: ${score}/${currentQuestionCounter}`;
//   } else {
//      answer.classList.add("correct")
//     //dodaje se klasa crvena
//     scoreGraphic.innerHTML = `Score: ${score}/${currentQuestionCounter}`;
//   }
// }

answerDivs.forEach((answer) => {
  answer.addEventListener("click", () => {
    if (!click) {
      timeout = setTimeout(loadQuestion, 3000);
    }
    click++;
  });
});
