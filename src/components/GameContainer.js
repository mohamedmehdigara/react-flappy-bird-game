import React from 'react';
import styled from 'styled-components';
import Game from './Game';

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Improved the background color of the game container */
  background-color: #f5f5f5;
  /* Improved the border of the game container */
  border: 1px solid #ccc;
  /* Added a box shadow to the game container */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const MyGameContainer = () => {
  return (
    <GameContainer>
      <Game />
    </GameContainer>
  );
};

export default MyGameContainer;
