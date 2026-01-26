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

    const initializePieces = () => {
        board.initializePieces();
    };


    return (
        <div className="checkers-game-container">
            <div className="checkers-game-title">
                <h2>Checkers Game</h2>
            </div>
            <div className="checkers-game-board">
                {initializePieces()}
            </div>
        </div>
    );
}

export default CheckersGame;