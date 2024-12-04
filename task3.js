const board = Array(9).fill(null); 
let currentPlayer = "X"; let isGameOver = false;
const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
function initializeGame() {gameBoard.innerHTML = ""; 
    board.fill(null);  currentPlayer = "X"; 
    isGameOver = false; 
    statusDisplay.textContent = "Player X's turn"; 
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");cell.dataset.index = index; 
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);});}
function handleCellClick(event) {const cellIndex = event.target.dataset.index;
    if (board[cellIndex] || isGameOver) return;
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");
    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;return;}
    if (board.every(cell => cell)) {
        statusDisplay.textContent = "It's a draw!";
        isGameOver = true; return;}
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;}
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];});}
restartBtn.addEventListener("click", initializeGame);initializeGame();
