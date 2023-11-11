import React, { useState, useEffect } from 'react';
import Bird from "./Bird";
import Obstacle from "./Obstacle";
import PowerUp from "./PowerUp";

const Game = () => {
  const [birdPosition, setBirdPosition] = useState({ top: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Placeholder for handleGameOver function
  const handleGameOver = () => {
    // Restart the game after a short delay.
    setTimeout(() => {
      setBirdPosition({ top: 0 });
      setIsGameOver(false);
      setObstacles([]);
      setPowerUps([]);
    }, 2000); // Adjust the delay time as needed.

    // TODO: Implement a leaderboard to store the player's high score.
  };

  // Placeholder for collision detection logic
  const checkCollisions = () => {
    // Check for collisions with obstacles
    for (const obstacle of obstacles) {
      if (
        birdPosition.top < obstacle.top + obstacle.height &&
        birdPosition.top + 20 > obstacle.top &&
        obstacle.left < 30 // Assuming bird width is 20px
      ) {
        setIsGameOver(true);
        handleGameOver();
        break;
      }
    }

    // Check for collisions with power-ups
    for (const powerUp of powerUps) {
      if (
        birdPosition.top < powerUp.top + powerUp.height &&
        birdPosition.top + 20 > powerUp.top &&
        powerUp.left < 30 // Assuming bird width is 20px
      ) {
        // TODO: Implement logic for power-up effect
        // For example, increase the score or provide a temporary boost.
        // Remove the power-up from the array after collision.
        setPowerUps((prevPowerUps) => prevPowerUps.filter((p) => p !== powerUp));
      }
    }
  };

  useEffect(() => {
    if (!isGameOver) {
      const GAME_AREA_HEIGHT = 400; // Adjust the game area height as needed.

      const updateBirdPosition = () => {
        // Calculate the new bird position based on the current top.
        const newTop = birdPosition.top + 1;

        // Update the bird's position only if the game is still running.
        if (newTop < GAME_AREA_HEIGHT) {
          setBirdPosition({ top: newTop });
          checkCollisions();
        } else {
          // Handle game over when the bird goes out of bounds.
          setIsGameOver(true);
          handleGameOver();
        }

        // Request the next frame for the animation.
        requestAnimationFrame(updateBirdPosition);
      };

      // Start the game loop by requesting the first frame.
      requestAnimationFrame(updateBirdPosition);

      // Cleanup the animation frame request when the component unmounts.
      return () => {
        cancelAnimationFrame(updateBirdPosition);
      };
    }
  }, [birdPosition, obstacles, powerUps, isGameOver]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: birdPosition.top }}>
        <Bird />
      </div>

      {obstacles.map((obstacle, index) => (
        <div key={index} style={{ position: 'absolute', ...obstacle }}>
          <Obstacle type="pipe" position={obstacle} color="red" />
        </div>
      ))}

      {powerUps.map((powerUp, index) => (
        <div key={index} style={{ position: 'absolute', ...powerUp }}>
          <PowerUp type="speedBoost" position={powerUp} />
        </div>
      ))}
    </div>
  );
};

export default Game;
