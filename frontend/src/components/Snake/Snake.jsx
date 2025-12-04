import { useEffect, useState } from 'react';
import './Snake.css';

function Snake() {
    

    return (
        <div className='snake-game-container'>
            <div className='snake-game-info'>
                <h2>Snake Game</h2>
                <p>Use arrow keys to control the snake.</p>
            </div>
            <div className='snake-board'>

            </div>
        </div>
    );
}

export default Snake;