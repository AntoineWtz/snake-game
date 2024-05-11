// SnakeGame.js
import React, { useState } from 'react';
import GameLogic from './GameLogic';
import GameDisplay from './GameDisplay';

// Définir generateFood en dehors de SnakeGame pour qu'il soit accessible
const generateFood = () => {
  return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });

  return (
    <div>
      <h1>Snake Game</h1>
      <GameLogic snake={snake} setSnake={setSnake} setFood={setFood} generateFood={generateFood} />
      <GameDisplay snake={snake} food={food} />
    </div>
  );
};

export default SnakeGame;
