import Piece from "./Piece";

class Board {
    constructor() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
    }

    renderBoard() {
        const boardElement = document.getElementsByClassName('checkers-game-board')[0];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if ((row + col) % 2 === 0) {
                    cell.classList.add('light');
                } else {
                    cell.classList.add('dark');
                }
                boardElement.appendChild(cell);
            }
        } return boardElement;
    }

    placePiece(piece, row, col) {
        if (row < 3 && piece.getColor() === 'red' && (row + col) % 2 === 0) {
            this.board[row][col] = piece;
        } else if (row > 5 && piece.getColor() === 'black' && (row + col) % 2 === 1) {
            this.board[row][col] = piece;
        } else {
            console.log('Invalid piece placement');
        }
    }

    getBoard() {
        return this.board;
    }
}

export default Board;