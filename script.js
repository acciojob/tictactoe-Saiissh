var player1Name, player2Name;
var currentPlayer;
var gameActive = true;
var boardState = ['', '', '', '', '', '', '', '', ''];
var winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

function startGame() {
  player1Name = document.getElementById('player1').value;
  player2Name = document.getElementById('player2').value;
  
  if (player1Name === '' || player2Name === '') {
    alert('Please enter names for both players.');
    return;
  }
  
  currentPlayer = player1Name;
  document.getElementById('inputSection').style.display = 'none';
  document.getElementById('boardSection').style.display = 'block';
  updateMessage(currentPlayer + ", you're up!");
}

function handleCellClick(cellId) {
  var cell = document.getElementById(cellId);
  
  if (!gameActive || cell.innerText !== '') {
    return;
  }
  
  cell.innerText = getPlayerSymbol();
  boardState[cellId - 1] = currentPlayer;
  
  if (checkWin()) {
    gameActive = false;
    document.querySelector('.message').innerText = currentPlayer + ", congratulations, you won!";
    return;
  }
  
  if (checkTie()) {
    gameActive = false;
    document.querySelector('.message').innerText = "It's a tie!";
    return;
  }
  
  currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
  updateMessage(currentPlayer + ", you're up!");
}

function getPlayerSymbol() {
  return currentPlayer === player1Name ? 'X' : 'O';
}

function updateMessage(message) {
  document.querySelector('.message').innerText = message;
}

function checkWin() {
  for (var i = 0; i < winningCombos.length; i++) {
    var [a, b, c] = winningCombos[i];
    if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return !boardState.includes('');
}


