import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import GameDetails from './components/GameDetails';
import PlayBoard from './components/PlayBoard';
import Controls from './components/Controls';
import StartButton from './components/StartButton';
import GameOverPopup from './components/GameOverPopup';

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
  const intervalRef = useRef(null);

  const changeDirection = useCallback((key) => {
    if (gameOver) return;

    switch (key) {
      case 'ArrowLeft':
        if (velocityY === 0) {
          setVelocityX(0);
          setVelocityY(-1);
        }
        break;
      case 'ArrowRight':
        if (velocityY === 0) {
          setVelocityX(0);
          setVelocityY(1);
        }
        break;
      case 'ArrowUp':
        if (velocityX === 0) {
          setVelocityX(-1);
          setVelocityY(0);
        }
        break;
      case 'ArrowDown':
        if (velocityX === 0) {
          setVelocityX(1);
          setVelocityY(0);
        }
        break;
      default:
        break;
    }
  }, [gameOver, velocityX, velocityY]);

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
      setGameStarted(false);
      if (score > highScore) {
        setHighScore(score);
      }
    };

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const snakeHead = newSnake[0];
        const newSnakeX = snakeHead[0] + velocityX;
        const newSnakeY = snakeHead[1] + velocityY;

        if (newSnakeX < 1 || newSnakeX > 30 || newSnakeY < 1 || newSnakeY > 30) {
          handleGameOver();
          return prevSnake;
        }

        for (let i = 1; i < newSnake.length; i++) {
          if (newSnakeX === newSnake[i][0] && newSnakeY === newSnake[i][1]) {
            handleGameOver();
            return prevSnake;
          }
        }

        const newSnakeHead = [newSnakeX, newSnakeY];
        newSnake.unshift(newSnakeHead);

        if (newSnakeX === foodX && newSnakeY === foodY) {
          setScore((prevScore) => prevScore + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    if (gameStarted && !gameOver) {
      intervalRef.current = setInterval(moveSnake, 100);
      return () => clearInterval(intervalRef.current);
    }
  }, [gameOver, gameStarted, snake, foodX, foodY, score, highScore, velocityX, velocityY]);

  useEffect(() => {
    if (gameStarted) {
      updateFoodPosition();
    }
  }, [gameStarted, score]);

  const updateFoodPosition = () => {
    setFoodX(Math.floor(Math.random() * 30) + 1);
    setFoodY(Math.floor(Math.random() * 30) + 1);
  };

  const startGame = () => {
    setGameOver(false);
    setGameStarted(true);
    setSnake([[5, 5]]);
    setVelocityX(0);
    setVelocityY(0);
    setScore(0);
    updateFoodPosition();
  };

  return (
    <div className="wrapper">
      <GameDetails score={score} highScore={highScore} />
      <PlayBoard snake={snake} foodX={foodX} foodY={foodY} />
      <Controls changeDirection={changeDirection} />
      {!gameStarted && !gameOver && <StartButton startGame={startGame} />}
      {gameOver && <GameOverPopup startGame={startGame} score={score} />}
    </div>
  );
}

export default App;
