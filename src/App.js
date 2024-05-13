// App.js
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

  useEffect(() => {
    const savedHighScore = localStorage.getItem('high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    const moveSnake = () => {
      if (gameOver) return handleGameOver();
      let newSnake = [...snake];
      let snakeX = newSnake[0][0] + velocityX;
      let snakeY = newSnake[0][1] + velocityY;

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
        updateFoodPosition();
      } else {
        newSnake.pop();
      }
      setSnake(newSnake);
    };

    const id = setInterval(moveSnake, 100);
    return () => clearInterval(id);
  }, [gameOver, snake, foodX, foodY, score, velocityX, velocityY]);

  useEffect(() => {
    const handleDirectionChange = (event) => {
      switch (event.detail) {
        case 'ArrowUp':
          if (velocityY !== 1) {
            setVelocityX(0);
            setVelocityY(-1);
          }
          break;
        case 'ArrowDown':
          if (velocityY !== -1) {
            setVelocityX(0);
            setVelocityY(1);
          }
          break;
        case 'ArrowLeft':
          if (velocityX !== 1) {
            setVelocityX(-1);
            setVelocityY(0);
          }
          break;
        case 'ArrowRight':
          if (velocityX !== -1) {
            setVelocityX(1);
            setVelocityY(0);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('changeDirection', handleDirectionChange);

    return () => {
      document.removeEventListener('changeDirection', handleDirectionChange);
    };
  }, [velocityX, velocityY]);

  useEffect(() => {
    updateFoodPosition();
  }, [score]);

  const updateFoodPosition = () => {
    setFoodX(Math.floor(Math.random() * 30) + 1);
    setFoodY(Math.floor(Math.random() * 30) + 1);
  };

  const handleGameOver = () => {
    const savedHighScore = localStorage.getItem('high-score');
    const parsedHighScore = savedHighScore ? parseInt(savedHighScore) : 0;
    const newHighScore = Math.max(parsedHighScore, score);
    setHighScore(newHighScore);
    localStorage.setItem('high-score', newHighScore.toString());
    setScore(0);
    setGameOver(false);
    setSnake([[5, 5]]);
    setVelocityX(0);
    setVelocityY(0);
    updateFoodPosition();
  };

  return (
    <div className="wrapper">
      <GameDetails score={score} highScore={highScore} />
      <PlayBoard snake={snake} foodX={foodX} foodY={foodY} />
      <Controls />
    </div>
  );
}

export default App;
