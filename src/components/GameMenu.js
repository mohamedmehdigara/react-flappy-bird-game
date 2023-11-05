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

const useOnStartGameTimer = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const SetGameState = useSetGameState();


  const onStartGame = () => {
    setIsGameStarted(true);
  };


  return {
    onStartGame,
    isGameStarted,
  };
};

const GameMenu = () => {
  const { onStartGame } = useOnStartGameTimer();
  const gameComponents = useRenderGameComponents();

  if (!onStartGame.isGameStarted) {
    return null;
  }

  return (
    <div>
      <h1>Flappy Bird</h1>
      <button onClick={onStartGame.onStartGame}>Start Game</button>
      {gameComponents}
    </div>
  );
};

export { useOnStartGameTimer };

export default GameMenu;
