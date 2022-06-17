
const gameBoard = [];
const boardElement = document.getElementById('board');
const winnerMessage = document.getElementById('print');
const players = {
    X: { name: 'Antonio', innerHTML: `<img src="./assets/antonio.png">` },
    O: { name: 'Jose', innerHTML: `<img src="./assets/jose.png">` }
}

const winningMessage = () => `Player $ {currentPlayer} has won!`;
window.addEventListener('DOMContentLoaded', makeGameBoard)

const O = 'O';
const X = 'X';
function makeGameBoard() {
    for (let index = 0; index < 3; index++) {
        let row = [];
        for (let y = 0; y < 3; y++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style = 'color:white';
            box.addEventListener('click', (_event) => {
                onClickBox(box, { row: index, column: y });
                const player = hasAWinner();
                if (player) {
                    winnerMessage.innerHTML = "Player " + players[player].name + " won";
                    boardElement.style = "pointer-events: none;";

                }

            })
            row.push(null);
            boardElement.appendChild(box);
        }
        gameBoard.push(row);
    }

}

let clickCounter = 0;
function onClickBox(box, { row, column }) {
    clickCounter++;
    if (box.innerHTML) {
        return;
    }

    if (clickCounter % 2) {
        box.innerHTML = players['X'].innerHTML;
        gameBoard[row][column] = 'X';

    } else {
        box.innerHTML = players['O'].innerHTML;
        gameBoard[row][column] = 'O';
    }
}

const endCounter = 3;
function hasAWinner() {
    for (let i = 0; i < gameBoard.length; i++) {
        let rowsX = 0;
        let columnsX = 0;
        let rowsO = 0;
        let columnsO = 0;
        let diagonalLeftToRightX = 0;
        let diagonalLeftToRightO = 0;
        let diagonalRightToLeftX = 0;
        let diagonalRightToLeftO = 0;

        for (let j = 0; j < gameBoard.length; j++) {

            if (gameBoard[j][j] === X) {
                diagonalLeftToRightX++;
            }
            if (gameBoard[j][j] === O) {
                diagonalLeftToRightO++;
            }

            if (gameBoard[j][gameBoard.length - j - 1] === X) {
                diagonalRightToLeftX++;
            }
            if (gameBoard[j][gameBoard.length - j - 1] === O) {
                diagonalRightToLeftO++;
            }
            if (gameBoard[i][j] === X) {
                rowsX++;
            }
            if (gameBoard[j][i] === X) {
                columnsX++;
            }
            if (gameBoard[i][j] === O) {
                rowsO++;
            }
            if (gameBoard[j][i] === O) {
                columnsO++;
            }
            if (diagonalLeftToRightX === endCounter || diagonalRightToLeftX === endCounter || rowsX === endCounter || columnsX === endCounter) {
                return X;
            }

            if (diagonalLeftToRightO === endCounter || diagonalRightToLeftO === endCounter || rowsO === endCounter || columnsO === endCounter) {
                return O;
            }
        }
    }

    return "";
}

function restartGame() {
    clickCounter = 0;
    resetBoard();
    resetBoxes();
    boardElement.style = "";
    winnerMessage.innerHTML = "";
}
function resetBoxes() {
    const boxes = document.getElementsByClassName("box");
    for (const box of boxes) {
        box.innerHTML = '';
    }
}
function resetBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard.length; j++) {
            gameBoard[i][j] = null;
        }
    }
}



