import { useState, useEffect, use } from 'react';
import Board from './Board';
import Piece from './Piece';
import './Checkers.css';

function CheckersGame() {
    const board = new Board();
    const [moveableCells, setMoveableCells] = useState([]);

    useEffect(() => {
        board.renderBoard();
        let boardSpot = document.getElementsByClassName('cell dark');
        setMoveableCells(Array.from(boardSpot));

        return () => {
            // Cleanup: clear the board on unmount
            const boardElement = document.getElementsByClassName('checkers-game-board')[0];
            if (boardElement) boardElement.innerHTML = '';
        };
    }, []);

    const createBoard = () => {
        board.placePiece()
    };

    const isFreeSpot = (spot) => {
        if (spot.children.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const piece = document.querySelector('.checkers-piece');

    console.log(piece);

    // for (let cell of moveableCells) {
    //     cell.addEventListener('dragover', (e) => {
    //         e.preventDefault();
    //         cell.classList.add('drag-over');
    //     });
    //     cell.addEventListener('dragleave', () => {
    //         cell.classList.remove('drag-over');
    //     });
    //     cell.addEventListener('drop', (e) => {
    //         e.preventDefault();
    //         cell.classList.remove('drag-over');
    //         const pieceId = e.dataTransfer.getData('text/plain');
    //         console.log(pieceId);
    //         const piece = document.getElementById(pieceId);
    //         if (isFreeSpot(cell)) {
    //             cell.appendChild(piece);
    //         }
    //     });
    // }

    return (
        <div className="checkers-game-container">
            <div className="checkers-game-title">
                <h2>Checkers Game</h2>
            </div>
            <div className="checkers-game-board">
                {createBoard()}
            </div>
        </div>
    );
}

export default CheckersGame;