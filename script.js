const statusElem = document.querySelector("#status");
const board = document.querySelector("#board");
const restartBtn = document.getElementById("restart-btn");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const hardResetBtn = document.getElementById("hard-reset-btn");

let player;
let boardInputArr = Array.from({ length: 9 });
const player1 = "X";
const player2 = "O";
player1Score.innerText = localStorage.getItem("player1Score") || 0;
player2Score.innerText = localStorage.getItem("player2Score") || 0;
//  Initialize Game #####################
function initGame() {
  player = player1;
  boardInputArr.fill(undefined);
  statusElem.innerText = `Player ${player1}'s turn`;
}

//  Check Win #####################
function checkWin() {
  if (
    boardInputArr[0] !== undefined &&
    boardInputArr[0] === boardInputArr[1] &&
    boardInputArr[0] === boardInputArr[2]
  ) {
    return [0, 1, 2];
  } else if (
    boardInputArr[3] !== undefined &&
    boardInputArr[3] === boardInputArr[4] &&
    boardInputArr[3] === boardInputArr[5]
  ) {
    return [3, 4, 5];
  } else if (
    boardInputArr[6] !== undefined &&
    boardInputArr[6] === boardInputArr[7] &&
    boardInputArr[6] === boardInputArr[8]
  ) {
    return [6, 7, 8];
  } else if (
    boardInputArr[0] !== undefined &&
    boardInputArr[0] === boardInputArr[4] &&
    boardInputArr[0] === boardInputArr[8]
  ) {
    return [0, 4, 8];
  } else if (
    boardInputArr[2] !== undefined &&
    boardInputArr[2] === boardInputArr[4] &&
    boardInputArr[2] === boardInputArr[6]
  ) {
    return [2, 4, 6];
  } else if (
    boardInputArr[0] !== undefined &&
    boardInputArr[0] === boardInputArr[3] &&
    boardInputArr[0] === boardInputArr[6]
  ) {
    return [0, 3, 6];
  } else if (
    boardInputArr[1] !== undefined &&
    boardInputArr[1] === boardInputArr[4] &&
    boardInputArr[1] === boardInputArr[7]
  ) {
    return [1, 4, 7];
  } else if (
    boardInputArr[2] !== undefined &&
    boardInputArr[2] === boardInputArr[5] &&
    boardInputArr[2] === boardInputArr[8]
  ) {
    return [2, 5, 8];
  }
  return [];
}
// Restart game function
function restartGame() {
  initGame();
  const boardCells = board.querySelectorAll(".cell");
  boardCells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("win");
  });

  board.onclick = checkClick;
}

function isGameDraw() {
  return !boardInputArr.includes(undefined);
}

function addScore(player) {
  console.log("welcome addScore");
  if (player === player1) {
    player1Score.innerText = parseInt(player1Score.innerText) + 1;
    localStorage.setItem("player1Score", player1Score.innerText);
  } else if (player === player2) {
    player2Score.innerText = parseInt(player2Score.innerText) + 1;
    localStorage.setItem("player2Score", player2Score.innerText);
  }
}
//  Check Cell or Not #####################

function checkClick(e) {
  if (!e.target.classList.contains("cell")) {
    return;
  }
  const indexNo = e.target.dataset.index;
  if (boardInputArr[indexNo] !== undefined) {
    //check cell is empty or not
    alert("Cell is already filled!☹️");
    return;
  }
  e.target.innerText = player;
  boardInputArr[indexNo] = player;

  if (isGameDraw()) {
    // check game draw or not
    statusElem.innerText = `Game is Draw`;
    board.onclick = resetGame;
    return;
  }
  const winner = checkWin(); //store winner's base index

  if (winner.length !== 0) {
    // console.log(winner);

    const boardCells = board.querySelectorAll(".cell");

    winner.forEach((elem) => {
      boardCells[elem].classList.add("win");
    });
    statusElem.innerText = `${player} Wins ✨`;
    console.log("hello");
    addScore(player);
    board.onclick = restartGame; //restart game after match wins
    return;
  }

  player = player === player2 ? player1 : player2;
  statusElem.innerText = `Player ${player}'s turn`;
}

// Function Call and Event Handler
initGame();

// board.addEventListener("click", checkClick);
board.onclick = checkClick;
restartBtn.addEventListener("click", restartGame);
hardResetBtn.addEventListener("click", () => {
  localStorage.clear();
  player1Score.innerText = 0;
  player2Score.innerText = 0;
  restartGame();
});
