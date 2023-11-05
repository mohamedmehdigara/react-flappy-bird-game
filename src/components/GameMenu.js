import React, { useState } from 'react';
import styled from 'styled-components';
import GameLevel from './GameLevel';
import { useSetGameState, useStartGameTimer, useRenderGameComponents } from '../Utils';

const GameMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const GameMenuButton = styled.button`
  width: 100px;
  height: 50px;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;

export const useOnStartGameTimer = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const onStartGame = () => {
    setIsGameStarted(true);
  };

  const SetGameState = useSetGameState();
  setTimeout(() => {
    onStartGame();
  }, 1000);

  return {
    onStartGame,
    isGameStarted,
  };
};

const GameMenu = () => {
  const { onStartGame } = useOnStartGameTimer();
  const gameComponents = useRenderGameComponents(); // Define the `gameComponents` variable here

  return (
    <div>
      <button onClick={() => onStartGame()}>Start Game</button>
      <h1>Flappy Bird</h1>
      {gameComponents} 
    </div>
  );
};

export default GameMenu;
