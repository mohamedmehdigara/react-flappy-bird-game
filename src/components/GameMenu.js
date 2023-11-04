import React from 'react';
import styled from 'styled-components';
import GameLevel from './GameLevel';

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

const GameMenu = ({ onStartGame }) => {
  return (
    <GameMenuContainer>
      <h1>Flappy Bird</h1>
      <GameMenuButton onClick={onStartGame}>Start Game</GameMenuButton>
      <GameLevel level={1} />
      <GameLevel level={2} />
    </GameMenuContainer>
  );
};

export default GameMenu;
