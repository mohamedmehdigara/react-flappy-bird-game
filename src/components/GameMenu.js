import React, { useState } from 'react';
import styled from 'styled-components';
import GameLevel from './GameLevel';
import { useSetGameState, useRenderGameComponents } from '../Utils';



export const useOnStartGameTimer = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const onStartGame = () => {
    setIsGameStarted(true);
  };

  const SetGameState = useSetGameState();

  return {
    onStartGame,
    isGameStarted,
  };
};


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

const GameMenu = () => {
  const { onStartGame } = useOnStartGameTimer();
  const gameComponents = useRenderGameComponents();

  if (!onStartGame.isGameStarted) {
    // Return null to prevent the game components from being rendered before the game is started.
    return null;
  }

  return (
    <div>
      <button onClick={onStartGame}>Start Game</button>
      <h1>Flappy Bird</h1>
      {gameComponents}
    </div>
  );
};

export default GameMenu;
