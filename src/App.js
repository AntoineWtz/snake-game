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
  const [gameStarted, setGameStarted] = useState(false);

  const changeDirection = useCallback((key) => {
    if (!gameStarted) {
      setGameStarted(true);
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
    } else if (!gameOver) {
      switch (key) {
        case 'ArrowUp':
          if (velocityY === 0) {
            setVelocityX(0);
            setVelocityY(-1);
          }
          break;
        case 'ArrowDown':
          if (velocityY === 0) {
            setVelocityX(0);
            setVelocityY(1);
          }
          break;
        case 'ArrowLeft':
          if (velocityX === 0) {
            setVelocityX(-1);
            setVelocityY(0);
          }
          break;
        case 'ArrowRight':
          if (velocityX === 0) {
            setVelocityX(1);
            setVelocityY(0);
          }
          break;
        default:
          break;
      }
    }
  }, [gameOver, gameStarted, velocityX, velocityY]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          changeDirection(event.key);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeDirection]);

  useEffect(() => {
    const handleGameOver = () => {
      setGameOver(true);
      alert('Game Over! Press OK to replay...');
      setSnake([[5, 5]]);
      setVelocityX(0);
      setVelocityY(0);
      setScore(0);
      updateFoodPosition();
    };

    const moveSnake = () => {
      let newSnake = [...snake];
      let snakeHead = newSnake[0];
      let newSnakeX = snakeHead[0] + velocityX;
      let newSnakeY = snakeHead[1] + velocityY;

      if (newSnakeX < 1 || newSnakeX > 30 || newSnakeY < 1 || newSnakeY > 30) {
        handleGameOver();
        return;
      }

      for (let i = 1; i < newSnake.length; i++) {
        if (newSnakeX === newSnake[i][0] && newSnakeY === newSnake[i][1]) {
          handleGameOver();
          return;
        }
      }

      let newSnakeHead = [newSnakeX, newSnakeY];

      newSnake.unshift(newSnakeHead);

      if (newSnakeX === foodX && newSnakeY === foodY) {
        setScore(score + 1);
        updateFoodPosition();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };


    if (gameStarted) {
      const id = setInterval(moveSnake, 100);
      return () => clearInterval(id);
    }
  }, [gameOver, gameStarted, snake, foodX, foodY, score, velocityX, velocityY]);

  useEffect(() => {
    updateFoodPosition();
  }, [score]);

  const updateFoodPosition = () => {
    setFoodX(Math.floor(Math.random() * 30) + 1);
    setFoodY(Math.floor(Math.random() * 30) + 1);
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
