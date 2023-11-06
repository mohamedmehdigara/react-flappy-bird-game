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
        
          
         <Route path="/Bird" element={<Bird />}/>
         <Route path="/Obstacle" element={ <Obstacle />}/>
         <Route path="/PowerUp" element={<PowerUp />}/>
         <Route path="/Leaderboard" element={<Leaderboard />}/>
         <Route path="/GameLevel" element={<GameLevel />}/>
         <Route path="/GameLoop" element={<GameLoop />}/>
         <Route path="/Game" element={<Game  />}/>
          
        
      </Routes>
      
  );
};

export default App;
