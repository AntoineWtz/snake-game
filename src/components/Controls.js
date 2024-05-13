// Controls.js
import React from 'react';

function Controls({ changeDirection }) {
  return (
    <div className="controls">
      <button onClick={() => changeDirection('ArrowLeft')}>Left</button>
      <button onClick={() => changeDirection('ArrowUp')}>Up</button>
      <button onClick={() => changeDirection('ArrowRight')}>Right</button>
      <button onClick={() => changeDirection('ArrowDown')}>Down</button>
    </div>
  );
}

export default Controls;
