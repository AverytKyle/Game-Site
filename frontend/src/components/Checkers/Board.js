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
                } else if (row < 3) {
                    const piece = new Piece({ row, col }, 'red', boardElement, this);
                    cell.classList.add('dark');
                    cell.appendChild(piece.render());
                } else if (row > 4) {
                    const piece = new Piece({ row, col }, 'black', boardElement, this);
                    cell.classList.add('dark');
                    cell.appendChild(piece.render());
                } else {
                    cell.classList.add('dark');
                }
                boardElement.appendChild(cell);
            }
        } return boardElement;
    }

    initializePieces() {
        const boardElement = document.getElementsByClassName('checkers-game-board')[0];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (row < 3 && (row + col) % 2 === 1) {
                    const newPiece = new Piece({ row, col }, 'red', boardElement, this);
                    this.board[row][col] = newPiece;
                } else if (row > 4 && (row + col) % 2 === 1) {
                    const newPiece = new Piece({ row, col }, 'black', boardElement, this);
                    this.board[row][col] = newPiece;
                } else {
                    this.board[row][col] = null;
                }
            }
        }
    }

    placePiece(piece, newRow, newCol) {
        this.board[newRow][newCol] = piece;
    }

    checkIfCanJump(piece, newRow, newCol) {
        const { row, col } = piece.position;
        const rowDiff = newRow - row;
        const colDiff = newCol - col;

        // Must be exactly 2 squares diagonally
        if (Math.abs(rowDiff) !== 2 || Math.abs(colDiff) !== 2) return false;

        // Check the piece being jumped over
        const jumpedRow = row + rowDiff / 2;
        const jumpedCol = col + colDiff / 2;

        return this.board[jumpedRow][jumpedCol] !== null && this.board[jumpedRow][jumpedCol].color !== piece.color;
    }

    isValidMove(piece, newRow, newCol) {
        if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) return false;

        if (this.board[newRow][newCol] !== null) return false;

        if (piece.color === 'red' && !piece.isKing && newRow <= piece.position.row) return false;
        if (piece.color === 'black' && !piece.isKing && newRow >= piece.position.row) return false;

        const rowDiff = Math.abs(newRow - piece.position.row);
        const colDiff = Math.abs(newCol - piece.position.col);

        if (rowDiff !== colDiff) return false;

        return (rowDiff === 1) || (rowDiff === 2 && this.checkIfCanJump(piece, newRow, newCol));
    }

    getBoard() {
        return this.board;
    }
}

export default Board;