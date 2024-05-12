// GameDisplay.js
import React from 'react';

const GameDisplay = ({ snake, food }) => {
  const cellSize = 20;

  const renderCell = (x, y, isSnake = false, isFood = false) => {
    const cellStyle = {
      width: cellSize,
      height: cellSize,
      backgroundColor: isSnake ? '#1abc9c' : isFood ? '#e74c3c' : '#ecf0f1',
      border: '1px solid #bdc3c7',
      boxSizing: 'border-box',
    };

    return <div key={`${x}-${y}`} style={cellStyle}></div>;
  };

  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        const isSnake = snake.some(part => part.x === x && part.y === y);
        const isFood = food.x === x && food.y === y;
        board.push(renderCell(x, y, isSnake, isFood));
      }
    }
    return board;
  };

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(20, ${cellSize}px)`,
    gridTemplateRows: `repeat(20, ${cellSize}px)`,
    gap: '1px',
    backgroundColor: '#34495e',
    border: '1px solid #2c3e50',
  };

  return <div style={boardStyle}>{renderBoard()}</div>;
};

export default GameDisplay;
