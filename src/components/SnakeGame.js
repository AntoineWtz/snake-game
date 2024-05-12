// SnakeGame.js
import React, { useState, useEffect } from 'react';
import PlayBoard from './PlayBoard';

const SnakeGame = () => {
  // Votre logique de jeu Snake ici
  
  return (
    <div className="SnakeGame">
      <PlayBoard />
      {/* Autres éléments du jeu */}
    </div>
  );
};

export default SnakeGame;
