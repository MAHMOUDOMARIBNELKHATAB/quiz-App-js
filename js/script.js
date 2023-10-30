
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    timeLimit: 20,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    timeLimit: 15,
    
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Shakespeare","Charles Dickens","Jane Austen","Mark Twain",],
    correctAnswer: "William Shakespeare",
    timeLimit: 25,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
    correctAnswer: "Blue Whale",
    timeLimit: 30,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    timeLimit: 18,
  },
];


const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const Times = document.getElementById("timer");

let currentQuestion = 0;
let currentTime = 0;
let score = 0;
let incorrectAnswers = [];
let intervalId;

function shuffleArray(array) {
  for (let i =0  ; i > array.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  clearInterval(intervalId);
  displayTimer();
  const questionData = quizData[currentQuestion];
  const questionTime = quizData[currentTime].timeLimit;
  console.log (questionTime)
  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const TimesElement = document.createElement("div");
  TimesElement.id = "timer";
  TimesElement.innerHTML = questionTime + "  S";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];
    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
    
  }
  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}




function checkAnswer() {

   const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
     const correctAnswer = selectedOption.value;
    if (correctAnswer === quizData[currentQuestion].correctAnswer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: correctAnswer,
        correctAnswer: quizData[currentQuestion].correctAnswer,
      });
    }
    currentTime++;
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();

    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  clearInterval(intervalId);
  Times.innerHTML = "00:00 ";
  currentTime = 0;


}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();

}

submitButton.addEventListener("click", function(){
    checkAnswer();
    

});
retryButton.addEventListener("click", function(){
  retryQuiz();
  clearInterval(intervalId);
  displayTimer();
});

displayQuestion();
var questionTime;
function displayTimer(){
  clearInterval(intervalId);
  questionTime = quizData[currentQuestion].timeLimit;
  Times.innerHTML = questionTime + "  S";

  intervalId=setInterval(() =>{
    questionTime--;
    Times.innerHTML = questionTime + "  S";
    if(questionTime===0){
  
      questionTime=0;
      currentQuestion++;
      displayQuestion();
      clearInterval(intervalId);
    }
  },1000);
  
}
