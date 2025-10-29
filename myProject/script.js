const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const size = 10; // 10x10 board
const box = canvas.width / size;

let player1 = 1, player2 = 1;
let turn = 1;
const snakes = { 16: 6, 48: 30, 62: 19, 88: 24, 95: 56, 97: 78 };
const ladders = { 3: 22, 5: 8, 11: 26, 20: 29, 27: 84, 36: 44, 51: 67, 71: 91 };

function drawBoard() {
  let num = 100;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? "#a7d489" : "#6db36d";
      ctx.fillRect(c * box, r * box, box, box);
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.fillText(num--, c * box + 5, r * box + 15);
    }
  }
  drawPlayers();
}

function getCoordinates(pos) {
  let row = Math.floor((pos - 1) / size);
  let col = (pos - 1) % size;
  if (row % 2 === 1) col = size - 1 - col;
  let x = col * box + box / 2;
  let y = (size - 1 - row) * box + box / 2;
  return [x, y];
}

function drawPlayers() {
  const [x1, y1] = getCoordinates(player1);
  const [x2, y2] = getCoordinates(player2);

  ctx.beginPath();
  ctx.arc(x1, y1, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice").textContent = `You rolled ${dice}`;

  if (turn === 1) {
    player1 += dice;
    player1 = checkSnakeOrLadder(player1);
    if (player1 >= 100) return gameOver("Player 1");
    turn = 2;
    document.getElementById("status").textContent = "Player 2's turn";
  } else {
    player2 += dice;
    player2 = checkSnakeOrLadder(player2);
    if (player2 >= 100) return gameOver("Player 2");
    turn = 1;
    document.getElementById("status").textContent = "Player 1's turn";
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

function checkSnakeOrLadder(pos) {
  if (snakes[pos]) {
    alert(" Oops! Snake bite!");
    return snakes[pos];
  } else if (ladders[pos]) {
    alert("Yay! You climbed a ladder!");
    return ladders[pos];
  }
  return pos;
}

function gameOver(player) {
  alert(`${player} wins! `);
  player1 = player2 = 1;
  turn = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

drawBoard();

