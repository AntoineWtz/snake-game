import React, { useState, useEffect, useCallback } from 'react';
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

    const id = setInterval(moveSnake, 100);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [gameOver, snake, foodX, foodY, score, velocityX, velocityY]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.startsWith('Arrow')) {
        startGame();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    updateFoodPosition();
  }, [score]);

  const startGame = () => {
    setVelocityX(1);
  };

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
    if (!gameOver) {
      switch (key) {
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
    } else {
      // Si le jeu est terminé et qu'une touche directionnelle est pressée,
      // redémarre le jeu
      if (key.startsWith('Arrow')) {
        startGame();
      }
    }
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
