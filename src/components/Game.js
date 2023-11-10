import React, { useState, useEffect } from 'react';
import Bird from "./Bird";

const Game = () => {
  const [birdPosition, setBirdPosition] = useState({ top: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameOver = () => {
    // Restart the game after a short delay.
    setTimeout(() => {
      setBirdPosition({ top: 0 });
      setIsGameOver(false);
    }, 2000); // Adjust the delay time as needed.

    // TODO: Implement a leaderboard to store the player's high score.
  };

  useEffect(() => {
    if (!isGameOver) {
      const updateBirdPosition = () => {
        // Calculate the new bird position based on the current top.
        const newTop = birdPosition.top + 1;

        // TODO: Add collision detection here.
        // For example, check if the bird has collided with obstacles or reached the top or bottom of the game area.

        // Update the bird's position only if the game is still running.
        if (newTop < GAME_AREA_HEIGHT) {
          setBirdPosition({ top: newTop });
        } else {
          // Handle game over when the bird goes out of bounds.
          setIsGameOver(true);
          handleGameOver();
        }

        // Request the next frame for the animation.
        requestAnimationFrame(updateBirdPosition);
      };

      const GAME_AREA_HEIGHT = 400; // Adjust the game area height as needed.

      // Start the game loop by requesting the first frame.
      requestAnimationFrame(updateBirdPosition);

      // Cleanup the animation frame request when the component unmounts.
      return () => {
        cancelAnimationFrame(updateBirdPosition);
      };
    }
  }, [birdPosition, isGameOver]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: birdPosition.top }}>
        <Bird />
      </div>
    </div>
  );
};

export default Game;
