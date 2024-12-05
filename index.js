const cells = document.querySelectorAll('.cell');
const xScoreElement = document.getElementById('x-score');
const oScoreElement = document.getElementById('o-score');
const congratulations = document.getElementById('congratulations');
const winnerAnnouncement = document.getElementById('winner-announcement');
const winnerMessage = document.getElementById('winner-message');
const backButton = document.getElementById('back-button');

let xScore = 0;
let oScore = 0;
let currentPlayer = 'X';
let roundCount = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            cell.style.color = currentPlayer === 'X' ? 'darkgreen' : 'blue';

            if (checkWinner()) {
                currentPlayer === 'X' ? xScore++ : oScore++;
                updateScores();
                showCongratulations();
                setTimeout(handleRoundEnd, 2000);
            } else if (isBoardFull()) {
                setTimeout(handleRoundEnd, 2000); // No congratulations for a tie
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isBoardFull() {
    return [...cells].every(cell => cell.textContent);
}

function updateScores() {
    xScoreElement.textContent = xScore;
    oScoreElement.textContent = oScore;
}

function showCongratulations() {
    congratulations.classList.remove('hidden');
}

function handleRoundEnd() {
    congratulations.classList.add('hidden');

    if (xScore >= 3 || oScore >= 3) {
        announceWinner();
        resetScores();
    } else {
        resetGame();
    }
}

function announceWinner() {
    let winner = xScore > oScore ? 'X is the Winner!' : 'O is the Winner!';
    winnerMessage.textContent = winner;
    winnerAnnouncement.classList.remove('hidden');
    setTimeout(() => {
        winnerAnnouncement.classList.add('hidden');
    }, 3000);
}

function resetScores() {
    xScore = 0;
    oScore = 0;
    updateScores();
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

backButton.addEventListener('click', () => {
    // Code to handle going back to previous page if necessary
});
