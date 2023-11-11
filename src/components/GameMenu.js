import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GameMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const StartGameButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const GameMenu = () => {
  const handleStartGame = () => {
    console.log('Game starting logic goes here!');
    // Add your logic for starting the game, e.g., initializing game state.
  };

  return (
    <GameMenuContainer>
      <h1>Flappy Bird</h1>
      <p>Welcome to Flappy Bird! Click the button below to start the game.</p>
      <Link to="/gameLevel">
        <StartGameButton onClick={handleStartGame}>Start Game</StartGameButton>
      </Link>
    </GameMenuContainer>
  );
};

export default GameMenu;
