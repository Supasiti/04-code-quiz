let quizContainerDiv = document.querySelector(".quizContainer");
let quizTitle = document.querySelector(".quizTitle");
let quizTitleContainer = document.querySelector(".quizTitleContainer");
let quizSubtitle = document.querySelector(".quizSubtitle");
let quizSubtitleContainer = document.querySelector(".quizSubtitleContainer");
let quizContentDiv = document.querySelector(".quizContent");
let timerEl = document.querySelector(".timerCount");
let startButton = document.querySelector("#startButton");

//   need work out how to load data from somewhere  in the future
let questions = [
  {
    question: "Which is the correct way to write a JavaScript array?",
    choices: [
      {
        prefix: "a",
        text: "var txt = new Array(1:\"tim\",2:\"kim\",3:\"jim\")"
      },
      {
        prefix: "b",
        text: "var txt = new Array:1=(\"tim\")2=(\"kim\")3=(\"jim\")"
      },
      {
        prefix: "c",
        text: "var txt = new Array(\"tim\",\"kim\",\"jim\")"
      },
      {
        prefix: "d",
        text: "var txt = new Array=\"tim\",\"kim\",\"jim\""
      },
    ], 
    correctChoice: "c"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: [
      {
        prefix: "a",
        text: "<js>"
      },
      {
        prefix: "b",
        text: "<scripting>"
      },
      {
        prefix: "c",
        text: "<script>"
      },
      {
        prefix: "d",
        text: "<javascript>"
      }
    ], 
    correctChoice: "c"
  },
  {
    question: "If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?",
    choices: [
      {
        prefix: "a",
        text: "\"New Text\"?"
      },
      {
        prefix: "b",
        text: "para1.value=\"New Text\";"
      },
      {
        prefix: "c",
        text: "para1.firstChild.nodeValue= \"New Text\";"
      },
      {
        prefix: "d",
        text: "para1.nodeValue=\"New Text\""
      }
    ], 
    correctChoice: "b"
  },
  {
    question: "Using _______ statement is how you test for a specific condition.",
    choices: [
      {
        prefix: "a",
        text: "Select"
      },
      {
        prefix: "b",
        text: "If"
      },
      {
        prefix: "c",
        text: "Switch"
      },
      {
        prefix: "d",
        text: "For"
      }
    ], 
    correctChoice: "b"
  },
  {
    question: "Which of the following is the structure of an if statement?",
    choices: [
      {
        prefix: "a",
        text: "if (conditional expression is true) {then execute this code>->}"
      },
      {
        prefix: "b",
        text: "if (conditional expression is true) thenexecute this codeend if"
      },
      {
        prefix: "c",
        text: "if (conditional expression is true)execute this codeend if"
      },
      {
        prefix: "d",
        text: "if (conditional expression is true) then {execute this code}"
      }
    ], 
    correctChoice: "a"
  }
];
let currentQuestion = 0;
let quizTimerId;
let timeLeft = 75;

//----------------------------------------
// utilities

// clear inner html
function clearInnerHtml(el) {
  el.innerHTML = "";
};

//----------------------------------------
// Rendering questions 

// render the question for the first time
//  - this will create all the html elements for the quiz.
//  - subsequentially rendering choose use renderNextQuestion instead
function renderFirstQuestion (callback) {  
  quizTitle.textContent = "Question";
  quizSubtitle.textContent = questions[currentQuestion].question; 
  renderFirstQuizNumber();
  renderFirstChoiceSet(callback);


  // render the quiz number for the first time
  function renderFirstQuizNumber() {
    let numberDiv = document.createElement("div");
    numberDiv.classList.add("circleContainer", "flexColumn", "flexCenter");
    numberDiv.innerHTML = `<h2 class="quizNumber">1</h2>`;
    quizTitleContainer.appendChild(numberDiv);
  };

  // render the screen to create all li elements for choices for the first time
  function renderFirstChoiceSet(callback) {
    let choices = questions[currentQuestion].choices;
    let ulContainer = document.createElement("ul");
    clearInnerHtml(quizContentDiv);
    quizContentDiv.appendChild(ulContainer);

    for (let choice of choices) {
      let quizChoiceLi = createQuizChoiceLi(choice, callback);
      ulContainer.appendChild(quizChoiceLi);
    };
  };

  // create each <li> tag corresponding to the available choice.
  function createQuizChoiceLi(choice, callback) {
    let result = document.createElement("li");
    result.innerHTML = `
      <div class="circleContainer flexColumn flexCenter"> 
        <p class="choiceNumber">` + choice.prefix + `</p>
      </div>
      <p class="choiceText">` + choice.text + `</p>`
    result.dataset.choice = choice.prefix;
    result.classList.add("choiceContainer", "flexRow");
    result.addEventListener("click", callback);
    return result;
  };
};

// render the next question
function renderNextQuestion() {
  quizTitleContainer.querySelector(".quizNumber").innerHTML = currentQuestion + 1;
  quizSubtitle.textContent = questions[currentQuestion].question;
  renderNextChoiceSet();

  // render the next set of choices
  function renderNextChoiceSet() {
    let choiceEls = quizContentDiv.querySelectorAll(".choiceText");
    for (let el of choiceEls) {
      let choice = el.parentElement.dataset.choice;
      let choiceText = questions[currentQuestion].choices.filter((x) => {return x.prefix === choice})[0].text;
      el.textContent = choiceText;
    };  
  };
};

//----------------------------------------
// On question answer

function onQuestionAnswered(e) {
  checkAnswer(e);
  currentQuestion++;
  checkIfLastQuestion();
};

// check if answer is correct
function checkAnswer(e){
  let userChoice = e.target.closest("[data-choice]").getAttribute("data-choice");
  if (isCorrectAnswer(userChoice)) {
    renderBackground("correctAnswer");
  } else {
    penaliseUser();
    renderBackground("wrongAnswer");
  };

  function isCorrectAnswer(userChoice){
    return userChoice === questions[currentQuestion].correctChoice;
  };

  function renderBackground(text) {
    let backgroundOptions = ["correctAnswer", "wrongAnswer"];
    if (backgroundOptions.includes(text)){
      quizContainerDiv.classList.add(text);
      
      // wait for a second before removing it 
      setTimeout(function () { 
        quizContainerDiv.classList.remove(text)
      }, 800);
    };
  };

  function penaliseUser(){
    timeLeft = Math.max(timeLeft - 15, 0);
  };
};

// check if this is the last question 
function checkIfLastQuestion() {
  if (currentQuestion == questions.length){
    stopTimer();
    renderTimer();
    return 
  }
  renderNextQuestion();
};


//----------------------------------------
// Timer 

function runTimer() {
  timeLeft = 75;
  quizTimerId = setInterval(updateTimer, 1000);
};

// update timer every 1 sec count down 
function updateTimer(){
  if (quizTimerId) {
    timeLeft--;
    if (timeLeft === 0){
      stopTimer();
    }
    renderTimer();
  };
};

// stop timer
function stopTimer() {
  if (quizTimerId) {
    clearInterval(quizTimerId);
    quizTimerId = null;
    showFinalScore();
  };
};

// render time on screen
function renderTimer () {
  timerEl.textContent = timeLeft;
};

//----------------------------------------
// Log Final Score form

// render a new form to enter for high score
function showFinalScore() {
  quizContainerDiv.classList.add("textCenter"); 
  renderTitle();
  renderScore();
  renderHighScoreForm(onSubmitClicked);
  // update subtitle to your final score is 
  // append child of score
  // update content with a form 

  // render the title
  function renderTitle() {
    let quizNumberDiv = quizTitleContainer.querySelector(".circleContainer");
    quizTitleContainer.removeChild(quizNumberDiv);
    quizTitle.textContent = "Well Done!";
    quizTitle.style.width = "100%";
  };

  // render the final score
  function renderScore() {
    let finalScore = timeLeft;
    let scoreEl = document.createElement("p");
    scoreEl.classList.add("quizScore");
    scoreEl.textContent = finalScore;
    quizSubtitleContainer.appendChild(scoreEl);
    quizSubtitle.textContent = "Your final score is";
  };

  // render the form for user to click submit
  function renderHighScoreForm(callback) {
    let form = createHighScoreForm(callback);
    clearInnerHtml(quizContentDiv);
    quizContentDiv.appendChild(form);
  };

  // create form
  function createHighScoreForm(callback) {
    let form = document.createElement("form");
    form.classList.add("flexColumn");
    form.innerHTML = `
      <label class="formLabel" for="userName">Please Enter Your Name</label>
      <input class="choiceContainer textCenter" type="text" id="userName" name="userName" placeholder="Asama Doop">
      <p class="warning hidden">A name must be non-empty.</p>
      <input class="choiceContainer" id="submitButton" type="submit" value="Submit">
    `
    let submitButton = form.querySelector("#submitButton");
    submitButton.addEventListener("click", callback);
    return form;
  };
};

// activate when a submit button is clicked
function onSubmitClicked (e) {
  e.preventDefault();
  console.log("submit");

  // check if input is empty 
  // 
};


//----------------------------------------
// Initialise

function init() {
  startButton.addEventListener("click", function(e) {
    e.preventDefault();
    renderFirstQuestion(onQuestionAnswered);
    runTimer();
  });
};


init();
