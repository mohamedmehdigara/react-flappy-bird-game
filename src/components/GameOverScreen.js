import React from 'react';
import styled from 'styled-components';

const GameOverContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const GameOverMessage = styled.h2`
  font-size: 36px;
  color: white;
  margin-bottom: 20px;
`;

const RestartButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const GameOverScreen = ({ onRestart }) => {
  return (
    <GameOverContainer>
      <GameOverMessage>Game Over!</GameOverMessage>
      <RestartButton onClick={onRestart}>Restart</RestartButton>
    </GameOverContainer>
  );
};

export default GameOverScreen;
