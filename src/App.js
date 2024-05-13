import React, { useState, useEffect } from 'react';
import './App.css';
import GameDetails from './components/GameDetails';
import PlayBoard from './components/PlayBoard';
import Controls from './components/Controls';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [foodX, setFoodX] = useState(10);
  const [foodY, setFoodY] = useState(10);
  const [snake, setSnake] = useState([[5, 5]]);
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    const id = setInterval(moveSnake, 100);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      changeDirection(e.key);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    updateFoodPosition();
  }, [score]);

  const updateFoodPosition = () => {
    setFoodX(Math.floor(Math.random() * 30) + 1);
    setFoodY(Math.floor(Math.random() * 30) + 1);
  };

  const handleGameOver = () => {
    clearInterval(intervalId);
    setGameOver(true);
    alert('Game Over! Press OK to replay...');
    setSnake([[5, 5]]);
    setVelocityX(0);
    setVelocityY(0);
    setScore(0);
    updateFoodPosition();
  };

  const changeDirection = (key) => {
    if (key === 'ArrowUp' && velocityY !== 1) {
      setVelocityX(0);
      setVelocityY(-1);
    } else if (key === 'ArrowDown' && velocityY !== -1) {
      setVelocityX(0);
      setVelocityY(1);
    } else if (key === 'ArrowLeft' && velocityX !== 1) {
      setVelocityX(-1);
      setVelocityY(0);
    } else if (key === 'ArrowRight' && velocityX !== -1) {
      setVelocityX(1);
      setVelocityY(0);
    }
  };

  const moveSnake = () => {
    if (gameOver) return handleGameOver();
    let newSnake = [...snake];
    let snakeX = newSnake[0][0];
    let snakeY = newSnake[0][1];
    snakeX += velocityX;
    snakeY += velocityY;

    if (
      snakeX < 1 ||
      snakeX > 30 ||
      snakeY < 1 ||
      snakeY > 30 ||
      newSnake.slice(1).some(([x, y]) => x === snakeX && y === snakeY)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift([snakeX, snakeY]);
    if (snakeX === foodX && snakeY === foodY) {
      setScore(score + 1);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  return (
    <div className="wrapper">
      <GameDetails score={score} highScore={highScore} />
      <PlayBoard snake={snake} foodX={foodX} foodY={foodY} />
      <Controls changeDirection={changeDirection} />
    </div>
  );
}

export default App;
