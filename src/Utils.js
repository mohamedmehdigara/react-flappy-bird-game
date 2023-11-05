import React,{ useState } from 'react';
import GameMenu from './components/GameMenu';
import Game from './components/Game';

const initialState = 'menu';

export function useSetGameState() {
  const [usegameState, usesetGameState] = useState(initialState);

  return { usegameState, usesetGameState };
}

export function useStartGameTimer() {
  const [timer, setTimer] = useState(0);

  setInterval(() => {
    setTimer(timer + 1);
  }, 16.6);

  return timer;
}

export function useRenderGameComponents() {
  const usegameState = useState('menu');

  switch (usegameState) {
    case 'menu':
      return <GameMenu />;
    case 'playing':
      return <Game />;
    
    default:
      return null;
  }
}
