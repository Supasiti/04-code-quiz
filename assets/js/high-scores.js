let tableUl = document.querySelector(".table");
let highScores =[];

function renderTable() {
  highScores = getOrCreateHighScores();
  tableUl.innerHTML = "";

  console.log(highScores);
  for (let entry of highScores) {
    let tableRow = createTableRow();
    let tableName = tableRow.querySelector(".tableLeft");
    let tableScore = tableRow.querySelector(".tableRight");

    tableName.textContent = entry.name;
    tableScore.textContent = entry.score;
    tableUl.appendChild(tableRow);
  };

  function createTableRow(){
    let result = document.createElement("li");
    result.innerHTML = `
      <p class="tableLeft"></p>
      <p class="tableRight textCenter"></p>
    `
    result.classList.add("flexRow", "tableRow");
    return result;
  };
};


// return an array of high scores from local storage or create an empty one
function getOrCreateHighScores() {
  let result = JSON.parse(localStorage.getItem("highScores"));
  if (!result) {
    result = [];
  }
  return result;
};

// set high scores
function setHighScores(value) {
  localStorage.setItem("highScores", JSON.stringify(value));
}


function init(){
  renderTable();
};

init();
