import React from 'react';

function PlayBoard({ snakeBody, foodPosition }) {
    const board = [];
    for (let row = 1; row <= 30; row++) {
        for (let col = 1; col <= 30; col++) {
            const isSnakePart = snakeBody.some(part => part[0] === row && part[1] === col);
            const isFood = foodPosition[0] === row && foodPosition[1] === col;
            let cellClassName = '';
            if (isSnakePart) {
                cellClassName = 'head';
            } else if (isFood) {
                cellClassName = 'food';
            }
            board.push(<div key={`${row}-${col}`} className={cellClassName}></div>);
        }
    }
    return <div className="play-board">{board}</div>;
}

export default PlayBoard;
