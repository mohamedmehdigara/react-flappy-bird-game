import React, { useState, useEffect, useCallback } from 'react';
import Bird from './components/Bird';
import GameMenu from './components/GameMenu';
import GameLoop from './components/GameLoop';
import Leaderboard from './components/Leaderboard';
import GameLevel from './components/GameLevel';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Routes , useNavigate} from 'react-router-dom';

function App  ()  {
  const [gameState, setGameState] = useState('menu');
  const navigate = useNavigate();

  const startGame = () => {
    setGameState('playing');
    navigate('/Game');
  };

  return (
    
      <Routes >
         <Route path="/" element={<GameMenu startGame={startGame} />}/>
        
          
         <Route path="/game" element={<Bird />}/>
         <Route path="/game" element={ <Obstacle />}/>
         <Route path="/game" element={<PowerUp />}/>
         <Route path="/game" element={<Leaderboard />}/>
         <Route path="/game" element={<GameLevel />}/>
         <Route path="/game" element={<GameLoop />}/>
         <Route path="/game" element={<Game gameState={gameState} />}/>
          
        
      </Routes>
      
  );
};

export default App;
