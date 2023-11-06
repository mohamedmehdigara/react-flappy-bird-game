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

const GameLevelTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: black;
`;

const GameLevel = ({ level }) => {
  // Add this code to the beginning of the component:
  console.log('Rendering GameLevel component');

  const levels = [
    'Level 1',
    'Level 2',
    'Level 3',
  ];

  return (
    <GameLevelContainer>
      <GameLevelTitle>{levels}</GameLevelTitle>
    </GameLevelContainer>
  );
};

export default GameLevel;
