import React from "react";
import styled from "styled-components";
import Game from "./Game";

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
  // Add this code to the beginning of the component to log the rendering of the component:
  console.log("Rendering GameLevel component");

  // Define the levels:
  const levels = [
    "Level 1",
    "Level 2",
    "Level 3",
  ];

  // Render the corresponding game level based on the `level` prop:
  return (
    <GameLevelContainer>
      <GameLevelTitle>{levels[level]}</GameLevelTitle>
      <Game gameState="playing" />
    </GameLevelContainer>
  );
};

export default GameLevel;
