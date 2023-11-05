import React, { useState, useEffect, useCallback } from 'react';
import Bird from './components/Bird';
import GameMenu from './components/GameMenu';
import GameLoop from './components/GameLoop';
import Leaderboard from './components/Leaderboard';
import GameLevel from './components/GameLevel';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';

const App = () => {
  const [gameState, setGameState] = useState('menu');

  const startGame = () => {
    setGameState('playing');
  };

  if (gameState === 'menu') {
    return <GameMenu startGame={startGame} />;
  } else if (gameState === 'playing') {
    return (
      <div>
        <Bird />
        <Obstacle />
        <PowerUp />
        <Leaderboard />
        <GameLevel />
        <GameLoop />
      </div>
    );
  } else {
    return null;
  }
}  
export default App;
