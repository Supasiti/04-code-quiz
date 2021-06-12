let quizTitle = document.querySelector(".quizTitle");
let quizSubtitle = document.querySelector(".quizSubtitle");
let quizContentDiv = document.querySelector(".quizContent");
let quizTitleContainer = document.querySelector(".quizTitleContainer");

//   need work out how to load data from somewhere  in the future
let questions = [
  {
    question: "Which is the correct way to write a JavaScript array?",
    choices: {
      a: "var txt = new Array(1:\"tim\",2:\"kim\",3:\"jim\")",
      b: "var txt = new Array:1=(\"tim\")2=(\"kim\")3=(\"jim\")",
      c: "var txt = new Array(\"tim\",\"kim\",\"jim\")",
      d: "var txt = new Array=\"tim\",\"kim\",\"jim\""
    }, 
    correctChoice: "c"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: {
      a: "<js>",
      b: "<scripting>",
      c: "<script>",
      d: "<javascript>"
    }, 
    correctChoice: "c"
  },
  {
    question: "If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?",
    choices: {
      a: "\"New Text\"?",
      b: "para1.value=\"New Text\";",
      c: "para1.firstChild.nodeValue= \"New Text\";",
      d: "para1.nodeValue=\"New Text\""
    }, 
    correctChoice: "b"
  },
  {
    question: "Using _______ statement is how you test for a specific condition.",
    choices: {
      a: "Select",
      b: "If",
      c: "Switch",
      d: "For"
    }, 
    correctChoice: "b"
  },
  {
    question: "Which of the following is the structure of an if statement?",
    choices: {
      a: "if (conditional expression is true) {then execute this code>->}",
      b: "if (conditional expression is true) thenexecute this codeend if",
      c: "if (conditional expression is true)execute this codeend if",
      d: "if (conditional expression is true) then {execute this code}"
    }, 
    correctChoice: "a"
  }
];
let currentQuestion = 0;


function clearInnerHtml(el) {
  el.innerHTML = "";
};


//----------------------------------------
// Rendering questions 

// render the question for the first time
//  - subsequentially rendering can use renderQuestion instead
function renderFirstQuestion (question) {  
  quizSubtitle.textContent = question.question; 
  renderFirstQuizNumber();
  renderFirstChoiceSet(question);
};

// render the quiz number for the first time
function renderFirstQuizNumber() {
  let numberDiv = document.createElement("div");
  numberDiv.classList.add("circleContainer", "flexColumn", "flexCenter");
  numberDiv.innerHTML = `<h2 class="quizNumber">1</h2>`;
  quizTitleContainer.appendChild(numberDiv);
};

// render the screen to create all li elements for choices for the first time
function renderFirstChoiceSet(question) {
  let choices = question.choices;
  let ulContainer = document.createElement("ul");
  clearInnerHtml(quizContentDiv);
  quizContentDiv.appendChild(ulContainer);

  for (let choice in choices) {
    let quizChoiceLi = createQuizChoiceLi(choice, choices[choice]);
    ulContainer.appendChild(quizChoiceLi);
  };
};

// create each <li> tag corresponding to the available choice.
function createQuizChoiceLi(choice, text) {
  let result = document.createElement("li");
  result.innerHTML = `
    <div class="circleContainer flexColumn flexCenter"> 
      <p class="choiceNumber">` + choice + `</p>
    </div>
    <p class="choiceText">` + text + `</p>`
  result.dataset.choice = choice;
  result.classList.add("choiceContainer", "flexRow");
  result.addEventListener("click", getNextQuestion);
  return result;
};

function getNextQuestion() {
  currentQuestion++;
  if (currentQuestion == questions.length){
    stopTimer();
    showFinalScore();
    return 
  }
  renderNextQuestion(currentQuestion);
}

// render the next question
function renderNextQuestion(index) {
  quizTitleContainer.querySelector(".quizNumber").innerHTML = index + 1;
  quizSubtitle.textContent = questions[index].question;
  renderNextChoiceSet(index);
};

function renderNextChoiceSet(index) {
  let choiceEls = quizContentDiv.querySelectorAll(".choiceText");
  for (let el of choiceEls) {
    let choice = el.parentElement.dataset.choice;
    el.textContent =  questions[index].choices[choice];
  }
};






renderFirstQuestion(questions[currentQuestion]);