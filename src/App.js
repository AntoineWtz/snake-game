import React, { useState, useEffect } from 'react';
import './App.css';
import GameDetails from './components/GameDetails';
import PlayBoard from './components/PlayBoard';
import Controls from './components/Controls';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snakeBody, setSnakeBody] = useState([[5, 5]]);
  const [foodPosition, setFoodPosition] = useState([10, 10]); // Initial food position
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    // Load high score from local storage on component mount
    const savedHighScore = localStorage.getItem('high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    // Start the game loop
    const intervalId = setInterval(moveSnake, 100);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Update high score in local storage and state
  const updateHighScore = (newHighScore) => {
    setHighScore(newHighScore);
    localStorage.setItem('high-score', newHighScore);
  };

  // Function to move the snake
  const moveSnake = () => {
    if (gameOver) return;
    const newSnake = [...snakeBody];
    const head = newSnake[newSnake.length - 1];
    let newHead;

    // Move the head in the current direction
    switch (direction) {
      case 'up':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'down':
        newHead = [head[0] + 1, head[1]];
        break;
      case 'left':
        newHead = [head[0], head[1] - 1];
        break;
      case 'right':
        newHead = [head[0], head[1] + 1];
        break;
      default:
        break;
    }

    // Check for collisions
    if (
      newHead[0] < 1 ||
      newHead[0] > 30 ||
      newHead[1] < 1 ||
      newHead[1] > 30 ||
      newSnake.some(part => part[0] === newHead[0] && part[1] === newHead[1])
    ) {
      setGameOver(true);
      return;
    }

    // Check if the snake eats the food
    if (newHead[0] === foodPosition[0] && newHead[1] === foodPosition[1]) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        updateHighScore(score + 1);
      }
      generateFoodPosition(newSnake);
    } else {
      newSnake.shift(); // Remove the tail if not eating food
    }

    newSnake.push(newHead);
    setSnakeBody(newSnake);
  };

  // Function to generate a random food position
  const generateFoodPosition = (snake) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 30) + 1;
      y = Math.floor(Math.random() * 30) + 1;
    } while (snake.some(part => part[0] === x && part[1] === y));
    setFoodPosition([x, y]);
  };

  // Function to handle changing direction
  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  return (
    <div>
      <h1>Snake Game</h1>
      <div className="wrapper">
        <GameDetails score={score} highScore={highScore} />
        <PlayBoard snakeBody={snakeBody} foodPosition={foodPosition} />
        <Controls changeDirection={handleDirectionChange} />
      </div>
    </div>
  );
}

export default App;
