const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
       {text: "Bear", correct: false},
       {text: "Zebra", correct: false},
       {text: "Blue Whale", correct: true},
       {text: "Cow", correct: false},
    ]
  },
  {
    question: "What color is Mario's hat?",
    answers: [
       {text: "Red", correct: true},
       {text: "green", correct: false},
       {text: "Blue", correct: false},
       {text: "Yellow", correct: false},
    ]
  },
  {
    question: "What is a common Thanksgiving food?",
    answers: [
       {text: "Steak", correct: false},
       {text: "Turkey", correct: true},
       {text: "Venison", correct: false},
       {text: "Octopus", correct: false},
    ]
  },
  {
    question: "How many directions are depicted on a map?",
    answers: [
       {text: "One", correct: false},
       {text: "Two", correct: false},
       {text: "Three", correct: false},
       {text: "Four", correct: true},
    ]
  },
  {
    question: "which drink is best for hydration?",
    answers: [
       {text: "Water", correct: true},
       {text: "Tea", correct: false},
       {text: "Beer", correct: false},
       {text: "Soda", correct: false},
    ]
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore (){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display= "block"
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion() ;
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=> {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();