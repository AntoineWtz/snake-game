// GameLogic.js
import React, { useState, useEffect } from 'react';

const GameLogic = ({ generateFood }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        let newHead = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            newHead.y -= 1;
            break;
          case 'DOWN':
            newHead.y += 1;
            break;
          case 'LEFT':
            newHead.x -= 1;
            break;
          case 'RIGHT':
            newHead.x += 1;
            break;
          default:
            break;
        }

        // Check collision with walls
        if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20) {
          setGameOver(true);
          return prevSnake;
        }

        // Check collision with itself
        if (newSnake.slice(1).some(part => part.x === newHead.x && part.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(newHead);
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(score + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    };

    const gameLoop = setInterval(() => {
      moveSnake();
    }, speed);

    return () => {
      clearInterval(gameLoop);
    };
  }, [direction, food, generateFood, score, speed]);

  return (
    <div>
      <p>Score: {score}</p>
      {gameOver && <p>Game Over</p>}
    </div>
  );
};

export default GameLogic;
