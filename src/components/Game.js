import React, { useState, useEffect } from 'react';
import Bird from "./Bird";
import Obstacle from "./Obstacle";
import PowerUp from "./PowerUp";
import GameOverScreen from "./GameOverScreen"; // Create a GameOverScreen component

const Game = () => {
  const [birdPosition, setBirdPosition] = useState({ top: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

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

  const checkCollisions = () => {
    // Collision logic here
    // ...
  };

  const generateObstacle = () => {
    // Logic to generate a new obstacle
    // ...
  };

  const generatePowerUp = () => {
    // Logic to generate a new power-up
    // ...
  };

  useEffect(() => {
    if (!isGameOver) {
      const GAME_AREA_HEIGHT = 400;

      const updateGame = () => {
        // Game logic here
        // ...

        // Check for collisions
        checkCollisions();

        // Generate new obstacles and power-ups at regular intervals
        if (Math.random() < 0.02) {
          setObstacles((prevObstacles) => [...prevObstacles, generateObstacle()]);
        }

        if (Math.random() < 0.01) {
          setPowerUps((prevPowerUps) => [...prevPowerUps, generatePowerUp()]);
        }

        // Request the next frame for the animation.
        requestAnimationFrame(updateGame);
      };

      // Start the game loop by requesting the first frame.
      requestAnimationFrame(updateGame);

      // Cleanup the animation frame request when the component unmounts.
      return () => {
        cancelAnimationFrame(updateGame);
      };
    }
  }, [birdPosition, obstacles, powerUps, isGameOver]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      {isGameOver ? (
        <GameOverScreen />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Game;
