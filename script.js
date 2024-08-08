// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const playerForm = document.getElementById('player-form');
    const game = document.getElementById('game');
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const result = document.getElementById('result');
    const winnerText = document.getElementById('winner');
    const resetBtn = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let player1 = '';
    let player2 = '';
    let player1Choice = 'X';
    let player2Choice = 'O';
    let boardState = Array(9).fill(null);

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '🔅' : '🌙';
    });

    // Start game
    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        player1 = document.getElementById('player1-name').value;
        player2 = document.getElementById('player2-name').value;
        player1Choice = document.getElementById('player1-choice').value;
        player2Choice = player1Choice === 'X' ? 'O' : 'X';
        currentPlayer = player1Choice;
        playerForm.style.display = 'none';
        game.style.display = 'flex';
    });

    // Handle cell click
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (boardState[index] === null) {
                boardState[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.style.pointerEvents = 'none';
                if (checkWin()) {
                    result.style.display = 'block';
                    winnerText.textContent = `${currentPlayer === player1Choice ? player1 : player2} wins!`;
                    cells.forEach(cell => cell.style.pointerEvents = 'none');
                    showWinAnimation();
                } else if (boardState.every(cell => cell !== null)) {
                    result.style.display = 'block';
                    winnerText.textContent = `It's a draw!`;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    // Reset game
    resetBtn.addEventListener('click', () => {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
            cell.style.backgroundColor = ''; // Reset background color
        });
        result.style.display = 'none';
        currentPlayer = player1Choice;
        clearConfetti(); // Clear confetti when resetting the game
    });

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                pattern.forEach(index => {
                    cells[index].style.backgroundColor = 'lightgreen';
                });
                return true;
            }
            return false;
        });
    }

    function showWinAnimation() {
        const confettiCount = 100;
        for (let i = 0; i < confettiCount; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.top = Math.random() * 100 + 'vh';
            piece.style.background = getRandomColor();
            piece.style.setProperty('--i', i);
            document.body.appendChild(piece);
        }
    }

    function getRandomColor() {
        const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function clearConfetti() {
        const confettiElements = document.querySelectorAll('.confetti-piece');
        confettiElements.forEach(element => element.remove());
    }
});
