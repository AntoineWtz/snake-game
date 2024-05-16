import React from 'react';

function GameOverPopup({ startGame, score }) {
    return (
        <div className="game-over-popup">
            <h2>Game Over</h2>
            <p>Your score: {score}</p>
            <button onClick={startGame} className="restart-button">
                Restart Game
            </button>
        </div>
    );
}

export default GameOverPopup;
