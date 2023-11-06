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
  const levels = [
    <h1>Level 1</h1>,
    <h1>Level 2</h1>,
    <h1>Level 3</h1>,
  ];

  return (
    <GameLevelContainer>
      {levels[level]}
    </GameLevelContainer>
  );
};

export default GameLevel;
