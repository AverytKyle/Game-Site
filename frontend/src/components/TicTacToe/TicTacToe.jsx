import { useEffect, useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
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

  const [board, setBoard] = useState(Array(9).fill(null));
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  useEffect(() => {
    const winner = checkForWinner();
    if (winner) {
      if (winner === 'X') {
        setScoreX(scoreX + 1);
      } else if (winner === 'O') {
        setScoreO(scoreO + 1);
      }
    }
  }, [board]);

  const checkForWinner = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return false;
  };

  const handleWinner = () => {
    return checkForWinner();
  }

  const handleCellClick = (index) => {
    const winner = checkForWinner();
    if (winner) return;

    if (checkDraw()) return;

    const cell = board[index];

    if (cell !== null) return;

    if (cell === 'X' || cell === 'O') return;

    board[index] = 'X';
    setBoard(board.slice());

    setTimeout(() => {
      handleOTurn();
    }, 500);
  }

  const handleOTurn = () => {
    const winner = checkForWinner();
    if (winner) return;

    if (checkDraw()) return;

    const blockMove = findOBlock();
    const winMove = findOWin();
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);

    if (winMove !== -1) {
      board[winMove] = 'O';
    }
    else if (blockMove !== -1) {
      board[blockMove] = 'O';
    } else {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const cellIndex = emptyCells[randomIndex];
      board[cellIndex] = 'O';
    }
    setBoard(board.slice());
  }

  const createBoard = () => {
    let newBoard = [];
    for (let i = 0; i < 9; i++) {
      newBoard.push(
        <div key={i} className="ttt-cell" onClick={() => handleCellClick(i)}>
          {board[i]}
        </div>
      );
    }
    return newBoard;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
  }

  const findOBlock = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      const values = [board[a], board[b], board[c]];

      if (values.filter(v => v === 'X').length === 2 && values.includes(null)) {
        const emptyCell = combo[values.indexOf(null)];
        return emptyCell;
      }
    } return -1;
  }

  const findOWin = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      const values = [board[a], board[b], board[c]];

      if (values.filter(v => v === 'O').length === 2 && values.includes(null)) {
        const emptyCell = combo[values.indexOf(null)];
        return emptyCell;
      }
    } return -1;
  }

  const checkDraw = () => {
    return board.every(cell => cell !== null) && !checkForWinner();
  }

  return (
    <div className="ttt-container">
      <div className="ttt-title">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className='ttt-score-container'>
        <div className='ttt-score'>
          <h2>Player X: {scoreX}</h2>
        </div>
        <div className='ttt-score'>
          <h2>Player O: {scoreO}</h2>
        </div>
      </div>
      <div className='ttt-winner-container'>
        <h2 className='ttt-winner'>{handleWinner() ? `${handleWinner()} wins!` : ''}</h2>
        <h2>{checkDraw() ? "It's a draw!" : ''}</h2>
      </div>
      <div className="ttt-board">
        {createBoard()}
      </div>
      <div className='ttt-reset-container'>
        <button className='ttt-reset-button' onClick={handleReset}>Reset Game</button>
        <button className='ttt-reset-score' onClick={() => { setScoreX(0); setScoreO(0); }}>Reset Score</button>
      </div>
    </div>
  );
}

export default TicTacToe;