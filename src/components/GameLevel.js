import React from 'react';
import styled from 'styled-components';

const GameLevelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const GameLevel = ({ level }) => {
  // Render the game level based on the level number.
  switch (level) {
    case 1:
      return (
        <GameLevelContainer>
          <h1>Level 1</h1>
        </GameLevelContainer>
      );
    case 2:
      return (
        <GameLevelContainer>
          <h1>Level 2</h1>
        </GameLevelContainer>
      );
    default:
      return null;
  }
};

export default GameLevel;
