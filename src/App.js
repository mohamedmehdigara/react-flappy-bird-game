import React, { useState, useEffect, useCallback } from 'react';
import Bird from './components/Bird';
import GameMenu from './components/GameMenu';
import GameLoop from './components/GameLoop';
import Leaderboard from './components/Leaderboard';
import GameLevel from './components/GameLevel';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';
import Game from './components/Game';
import { Route, Routes , useNavigate} from 'react-router-dom';

function App  ()  {
  const [gameState, setGameState] = useState('menu');
  const navigate = useNavigate();

  const startGame = () => {
    setGameState('playing');
    navigate('/game');
  };

  return (
      <Routes>
        {gameState === 'menu' && <Route path="/" element={<GameMenu startGame={startGame} />}/>}
        {gameState === 'playing' && (
          <div>
            <Bird />
            <Obstacle />
            <PowerUp />
            <Leaderboard />
            <GameLevel />
            <GameLoop />
            <Game gameState={gameState} />
          </div>
        )}
      </Routes>
  );
};

export default App;
