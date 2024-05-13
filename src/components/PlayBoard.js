// PlayBoard.js
import React from 'react';

function PlayBoard({ snake, foodX, foodY }) {
  return (
    <div className="play-board">
      {[...Array(30)].map((_, row) => (
        [...Array(30)].map((_, col) => {
          let cellClass = '';
          if (snake.some(([x, y]) => x === row + 1 && y === col + 1)) {
            cellClass = 'head';
          } else if (foodX === row + 1 && foodY === col + 1) {
            cellClass = 'food';
          }
          return <div key={`${row}-${col}`} className={cellClass}></div>;
        })
      ))}
    </div>
  );
}

export default PlayBoard;
