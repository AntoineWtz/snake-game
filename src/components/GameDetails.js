// GameDetails.js
import React from 'react';

function GameDetails({ score, highScore }) {
  return (
    <div className="game-details">
      <span className="score">Score: {score}</span>
      <span className="high-score">High Score: {highScore}</span>
    </div>
  );
}

export default GameDetails;
