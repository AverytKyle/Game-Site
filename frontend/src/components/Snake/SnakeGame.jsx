import { useEffect, useState, useRef } from 'react';
import Snake from './Snake';
import Food from './Food';
import './SnakeGame.css';

function SnakeGame() {
    const [boardRect, setBoardRect] = useState({ width: 600, height: 600 });
    const [food, setFood] = useState(new Food(0, 0));
    const canvasRef = useRef(null);
    const snakeRef = useRef(null);
    const [gameStatus, setGameStatus] = useState(true);

    const cellSize = boardRect.width ? Math.floor(boardRect.width / 40) : 10;
    const rows = boardRect.width ? Math.floor(boardRect.height / cellSize) : 20;
    const cols = boardRect.width ? Math.floor(boardRect.width / cellSize) : 20;
    const middleRow = Math.floor(rows / 2);
    const middleCol = Math.floor(cols / 2);

    useEffect(() => {
        setFood(new Food(
            Math.floor(Math.random() * cols) * cellSize,
            Math.floor(Math.random() * rows) * cellSize
        ));
    }, [cols, rows, cellSize]);

    // Get board dimensions
    useEffect(() => {
        const element = document.getElementById('snake-canvas');
        if (element) {
            const rect = element.getBoundingClientRect();
            setBoardRect({ width: rect.width, height: rect.height });
        };
    }, []);

    // Initialize Snake
    useEffect(() => {
        if (!boardRect.width) return;

        const initialSegments = [
            { x: middleCol * cellSize, y: middleRow * cellSize },
            { x: (middleCol - 1) * cellSize, y: middleRow * cellSize },
            { x: (middleCol - 2) * cellSize, y: middleRow * cellSize }
        ];
        snakeRef.current = new Snake(initialSegments, 'RIGHT', cellSize);

        const canvas = document.getElementById('snake-canvas');
        if (canvas) canvasRef.current = canvas;
    }, [boardRect.width, cellSize, middleCol, middleRow]);

    // Game Loop
    useEffect(() => {
        if (!canvasRef.current || !snakeRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const handleKey = (e) => {
            const snake = snakeRef.current;
            if (!snake) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (snake.direction !== 'DOWN') snake.direction = 'UP';
                    break;
                case 'ArrowDown':
                    if (snake.direction !== 'UP') snake.direction = 'DOWN';
                    break;
                case 'ArrowLeft':
                    if (snake.direction !== 'RIGHT') snake.direction = 'LEFT';
                    break;
                case 'ArrowRight':
                    if (snake.direction !== 'LEFT') snake.direction = 'RIGHT';
                    break;
                default:
                    break;
            }
        };

        // Game Loop
        const loop = () => {
            // Move snake
            snakeRef.current.move();
            context.clearRect(0, 0, canvas.width, canvas.height);
            snakeRef.current.draw(context);

            // Draw and check food
            food.draw(context);
            if (food.checkEaten(snakeRef.current.segments[0])) {
                context.clearRect(food.x, food.y, cellSize, cellSize);
                snakeRef.current.grow();
                food.setPosition(
                    Math.floor(Math.random() * cols) * cellSize,
                    Math.floor(Math.random() * rows) * cellSize
                );
            }
            
            if (snakeRef.current.checkCollision(boardRect.width, boardRect.height)) {
                clearInterval(interval);
                setGameStatus(false);
            }
        };

        const interval = setInterval(loop, 200);

        window.addEventListener('keydown', handleKey);
        context.clearRect(0, 0, canvas.width, canvas.height);
        snakeRef.current.draw(context);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKey);
        };
    }, [snakeRef.current, canvasRef.current]);

    return (
        <div className='snake-game-container'>
            <div className='snake-game-info'>
                <h2>Snake Game</h2>
                <p>Use arrow keys to control the snake.</p>
            </div>
            <div className='snake-board'>
                <canvas
                    id='snake-canvas'
                    width={cellSize * cols}
                    height={cellSize * rows}
                ></canvas>
            </div>
            <div className='snake-game-restart-container'>
                {!gameStatus && <h2 className='snake-game-over'>Game Over</h2>}
                <button onClick={() => window.location.reload()}>Restart Game</button>
            </div>
        </div>
    );
}

export default SnakeGame;