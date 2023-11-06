import React, { useState, useEffect } from 'react';
import Bird from "./Bird";

const Game = (gameState) => {
  const [birdPosition, setBirdPosition] = useState({ top: 0 });

  const handleGameOver = () => {
    // Restart the game.
    setBirdPosition({ top: 0 });

    // TODO: Implement a leaderboard to store the player's high score.
  };

  useEffect(() => {
    // Update the bird's position every frame.
    const updateBirdPosition = () => {
      // TODO: Add collision detection here.
      setBirdPosition({ top: birdPosition.top + 1 });
    };

    // Request that the browser call updateBirdPosition on the next frame.
    requestAnimationFrame(updateBirdPosition);

    return () => {
      // Cancel the requestAnimationFrame callback.
      cancelAnimationFrame(updateBirdPosition);
    };
  }, [birdPosition]);

  // Render the bird component.
  return (
    <div style={{ position: 'absolute', top: birdPosition.top }}>
      <Bird />
    </div>
  );
};

export default Game;
