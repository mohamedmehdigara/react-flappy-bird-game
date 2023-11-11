import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStartGameTimer, useRenderGameComponents } from '../Utils';

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
  const { onStartGame, isGameStarted } = useStartGameTimer();
  const gameComponents = useRenderGameComponents();

  return (
    <GameMenuContainer>
      <h1>Flappy Bird</h1>
      <Link to="/gameLevel">
        <GameMenuButton onClick={onStartGame} disabled={isGameStarted}>
          Start Game
        </GameMenuButton>
      </Link>
      {gameComponents}
    </GameMenuContainer>
  );
};

export default GameMenu;
