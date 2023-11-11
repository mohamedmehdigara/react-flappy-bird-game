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

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: #333; /* Choose a color that contrasts well with the background */
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
  transition: background-color 0.3s ease; /* Add a smooth transition effect */
  
  &:hover {
    background-color: #45a049; /* Darken the color on hover */
  }
`;

const GameMenu = () => {
  const handleStartGame = () => {
    console.log('Game starting logic goes here!');
    // Add your logic for starting the game, e.g., initializing game state.
  };

  return (
    <GameMenuContainer>
      <Title>Flappy Bird</Title>
      <p>Welcome to Flappy Bird! Click the button below to start the game.</p>
      <Link to="/gameLevel">
        <StartGameButton onClick={handleStartGame}>Start Game</StartGameButton>
      </Link>
    </GameMenuContainer>
  );
};

export default GameMenu;
