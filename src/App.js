import React, { useState, useEffect, useCallback } from 'react';
import GameMenu from './components/GameMenu';
import GameLoop from './components/GameLoop';

const App = () => {
  const [gameState, setGameState] = useState('menu');

  const startGame = () => {
    setGameState('playing');
  };

  return (
    <div>
      {(gameState === 'menu') ? <GameMenu startGame={startGame} /> : <GameLoop />}
    </div>
  );
};

export default App;
