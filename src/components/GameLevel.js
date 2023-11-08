import React, { useState } from "react";
import styled from "styled-components";
import Game from "./Game";

// Define the `GameLevelContainer` component using styled-components:

// Define the `GameLevel` component:
const GameLevel = ({ level, loading, score, enemiesRemaining, progress }) => {

  const ProgressBar = styled.div`
  background-color: #ccc;
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ProgressIndicator = styled.div`
  background-color: #007bff;
  width: ${progress}%;
  height: 100%;
  position: absolute;
  left: 0;
`;
  const PauseButton = styled.button`
  // Set the background color of the button to gray.
  background-color: gray;

  // Set the color of the button text to black.
  color: black;

  // Set the padding of the button to 10px.
  padding: 10px;

  // Set the border radius of the button to 5px.
  border-radius: 5px;

  // Set the cursor of the button to pointer.
  cursor: pointer;
`;


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

  // Disable the button while the game level is loading.
  pointer-events: ${loading ? "none" : "auto"};
`;

// Define the `ScoreComponent` component:
const ScoreComponent = styled.div`
  // Position the score component in the top left corner of the game level container.
  position: absolute;
  top: 10px;
  left: 10px;

  // Set the font size of the score text to 24px.
  font-size: 24px;

  // Set the color of the score text to black.
  color: black;
`;

// Define the `EnemiesRemainingComponent` component:
const EnemiesRemainingComponent = styled.div`
  // Position the enemies remaining component in the top right corner of the game level container.
  position: absolute;
  top: 10px;
  right: 10px;

  // Set the font size of the enemies remaining text to 24px.
  font-size: 24px;

  // Set the color of the enemies remaining text to black.
  color: black;
`;

  const [isGamePaused, setIsGamePaused] = useState(false);

  // Log the rendering of the component to the console.
  console.log(`Rendering GameLevel component for level ${level}`);

  // Define the levels array.
  const levels = [
    "Level 1",
    "Level 2",
    "Level 3",
  ];

  // Get the corresponding game level based on the `level` prop.
  const gameLevel = levels[level]

  return (
    <GameLevelContainer key={level}>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <ScoreComponent>Score: {score}</ScoreComponent>
          <EnemiesRemainingComponent>Enemies Remaining: {enemiesRemaining}</EnemiesRemainingComponent>
          <GameLevelTitle>{gameLevel}</GameLevelTitle>
          <Game
            gameState={isGamePaused ? "paused" : "playing"}
            onLevelComplete={() => {
              // Handle level completion here
              console.log("Level completed!");
            }}
          />

          <PauseButton onClick={() => setIsGamePaused(!isGamePaused)}>
            {isGamePaused ? "Resume" : "Pause"}
          </PauseButton>

          <RestartButton onClick={() => window.location.reload()}>
            Restart
          </RestartButton>
          <ProgressBar>
  <ProgressIndicator />
</ProgressBar>
        </>
      )}
    </GameLevelContainer>
  );
};

// Export the `GameLevel` component.
export default GameLevel;
