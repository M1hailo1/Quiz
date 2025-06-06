import { questions } from "./questions.js";

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

function pickOutQuestion() {
  let pastQuestions = [];
  for (let i = 0; i < questions.length; i++) {
    const question = questions;
  }
}

shuffleArray(questions).forEach((question) => {
  document.querySelector(".js-question").innerHTML = question.question;
  let firstOption = question.optionOne;
  let secondOption = question.optionTwo;
  let thirdOption = question.optionThree;
  let correctOption = question.optionCorrect;
  let answersArray = [firstOption, secondOption, thirdOption, correctOption];
  let shuffledAnswers = shuffleArray(answersArray);
  for (let i = 0; i < shuffledAnswers.length; i++) {
    document.querySelectorAll(".answer").innerHTML =
      shuffledAnswers.firstOption;
  }
});
