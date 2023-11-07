import React from "react";
import styled from "styled-components";
import Game from "./Game";

// Define the `GameLevelContainer` component using styled-components:

// Define the `GameLevel` component:
const GameLevel = ({ level, loading }) => {
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

  // Add a margin to the container to separate it from the rest of the page.
  margin: 10px;

  // Add a key prop to the component to help React identify and efficiently update the component when its props change.
  key: ${level};
`;

// Define the `GameLevelTitle` component using styled-components:
const GameLevelTitle = styled.h1`
  // Set the font size of the title to 48px.
  font-size: 48px;

  // Set the font weight of the title to bold.
  font-weight: bold;

  // Set the color of the title to black.
  color: black;

  // Add a margin to the bottom of the title to separate it from the game itself.
  margin-bottom: 20px;
`;

// Define the `RestartButton` component using styled-components:
const RestartButton = styled.button`
  // Set the background color of the button to green.
  background-color: green;

  // Set the color of the button text to white.
  color: white;

  // Set the padding of the button to 10px.
  padding: 10px;

  // Set the border radius of the button to 5px.
  border-radius: 5px;

  // Set the cursor of the button to pointer.
  cursor: pointer;
`;

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
    <GameLevelContainer key={level}>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <GameLevelTitle>{gameLevel}</GameLevelTitle>
          <Game gameState="playing" />
          <RestartButton onClick={() => window.location.reload()}>Restart</RestartButton>
        </>
      )}
    </GameLevelContainer>
  );
};

// Export the `GameLevel` component.
export default GameLevel;
