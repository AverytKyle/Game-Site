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
                } else if (row < 3){
                    const piece = new Piece({ row, col }, 'red', boardElement);
                    cell.classList.add('dark');
                    cell.appendChild(piece.render());
                } else if (row > 4){
                    const piece = new Piece({ row, col }, 'black', boardElement);
                    cell.classList.add('dark');
                    cell.appendChild(piece.render());
                } else {
                    cell.classList.add('dark');
                }
                boardElement.appendChild(cell);
            }
        } return boardElement;
    }

    placePiece() {
        const boardElement = document.getElementsByClassName('checkers-game-board')[0];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (row < 3 && (row + col) % 2 === 1) {
                    const newPiece = new Piece({ row, col }, 'red', boardElement);
                    this.board[row][col] = newPiece;
                } else if (row > 4 && (row + col) % 2 === 1) {
                    const newPiece = new Piece({ row, col }, 'black', boardElement);
                    this.board[row][col] = newPiece;
                } else {
                    this.board[row][col] = null;
                }
            }
        }
    }

    getBoard() {
        return this.board;
    }
}

export default Board;