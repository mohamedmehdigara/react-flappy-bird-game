import React, { useState, useEffect, useCallback  } from 'react';
import Bird from './components/Bird';
import GameMenu from './components/GameMenu';
import GameLoop from './components/GameLoop';
import Leaderboard from './components/Leaderboard';
import GameLevel from './components/GameLevel';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';
import Game from './components/Game';
import { BrowserRouter as Route, useNavigate, Router, Routes } from 'react-router-dom';

const App = () => {
  const [gameState, setGameState] = useState('menu');
  const navigate = useNavigate();

  const startGame = () => {
    setGameState('playing');
    navigate('/game');
  };

  return (
    <div>
      <Router path="/">
        <Routes>
        {gameState === 'menu' && <Route path="/game" component={<GameMenu startGame={startGame} />} />
}
        {gameState === 'playing' && (
          <div>
            <Route path="/game" component={<Bird />} />
            <Route path="/game" component={<Obstacle/>} />
            <Route path="/game" component={<PowerUp/>} />
            <Route path="/game" component={<Leaderboard/>} />
            <Route path="/game" component={<GameLevel/>} />
            <Route path="/game" component={<GameLoop/>} />
            <Route path="/game" component = {<Game gameState={gameState} />} />
          </div>
        )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
