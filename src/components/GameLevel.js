import React from "react";
import styled from "styled-components";
import Game from "./Game";

// Define the `GameLevelContainer` component using styled-components:
const GameLevelContainer = styled.div`
  // Set the width and height of the container to 100%.
  width: 100%;
  height: 100%;

  // Position the container relative to its parent.
  position: relative;

  // Display the container as a flexbox.
  display: flex;

  // Justify the contents of the container horizontally and vertically.
  justify-content: center;
  align-items: center;

  // Set the background color of the container to white.
  background-color: white;

  // Add a border to the container.
  border: 1px solid black;
`;

// Define the `GameLevelTitle` component using styled-components:
const GameLevelTitle = styled.h1`
  // Set the font size of the title to 48px.
  font-size: 48px;

  // Set the font weight of the title to bold.
  font-weight: bold;

  // Set the color of the title to black.
  color: black;
`;

// Define the `GameLevel` component:
const GameLevel = ({ level }) => {
  // Log the rendering of the component to the console.
  console.log(`Rendering GameLevel component for level ${level}`);

  // Define the levels array.
  const levels = [
    "Level 1",
    "Level 2",
    "Level 3",
  ];

  // Get the corresponding game level based on the `level` prop.
  const gameLevel = levels[level];

  // Render the corresponding game level.
  return (
    // Wrap the game level in a `GameLevelContainer` component.
    <GameLevelContainer>
      <GameLevelTitle>{gameLevel}</GameLevelTitle>
      <Game gameState="playing" />
    </GameLevelContainer>
  );
};

// Export the `GameLevel` component.
export default GameLevel;

