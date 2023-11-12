import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GameMenu from './components/GameMenu';
import GameLevel from './components/GameLevel';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import PowerUp from './components/PowerUp';
import Obstacle from './components/Obstacle';
import GameLoop from './components/GameLoop'; // Assuming you have a GameLoop component

function App() {
  const [gameState, setGameState] = useState('menu');
  const navigate = useNavigate();

  const startGame = useCallback(() => {
    setGameState('playing');
    navigate('/game');
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<GameMenu startGame={startGame} />} />
      <Route
        path="/game"
        element={
          <>
            <Game gameState={gameState} />
            {/* Additional components like Bird, Obstacle, PowerUp can be used within the Game component */}
            <Obstacle />
            <PowerUp />
          </>
        }
      />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/gameLevel" element={<GameLevel />} />
      <Route path="/gameLoop" element={<GameLoop />} />
    </Routes>
  );
}

export default App;
