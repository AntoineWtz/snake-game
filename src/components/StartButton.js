import React from 'react';

function StartButton({ startGame }) {
    return (
        <button onClick={startGame} className="start-button">
            Start Game
        </button>
    );
}

export default StartButton;
