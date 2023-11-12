import React, { useState, useEffect } from 'react';
import Bird from './Bird';
import Obstacle from './Obstacle';
import PowerUp from './PowerUp';
import GameOverScreen from './GameOverScreen';

const Game = () => {
  const [birdPosition, setBirdPosition] = useState({ top: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Helper function to check for collisions between two entities
  const isCollision = (entity1, entity2) => {
    const rect1 = entity1;
    const rect2 = entity2;

    return (
      rect1.top < rect2.top + rect2.height &&
      rect1.top + 20 > rect2.top &&
      rect1.left < rect2.left + rect2.width &&
      rect1.left + 20 > rect2.left
    );
  };

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

  // Handler function for obstacle collisions
  const handleObstacleCollision = (obstacle) => {
    setIsGameOver(true);
    handleGameOver();
  };

  // Handler function for power-up collisions
  const handlePowerUpCollision = (powerUp) => {
    // TODO: Implement logic for power-up effect
    // For example, increase the score or provide a temporary boost.
    // Remove the power-up from the array after collision.
    setPowerUps((prevPowerUps) => prevPowerUps.filter((p) => p !== powerUp));
  };

  const checkCollisions = () => {
    // Check for collisions with obstacles
    obstacles.forEach((obstacle) => {
      if (isCollision(birdPosition, obstacle)) {
        handleObstacleCollision(obstacle);
      }
    });

    // Check for collisions with power-ups
    powerUps.forEach((powerUp) => {
      if (isCollision(birdPosition, powerUp)) {
        handlePowerUpCollision(powerUp);
      }
    });
  };

  const generateObstacle = () => {
    // Placeholder, replace with your obstacle generation logic
    return {
      top: 100, // Adjust the initial position
      left: 300, // Adjust the initial position
      width: 50, // Adjust the obstacle width
      height: 100, // Adjust the obstacle height
    };
  };

  const generatePowerUp = () => {
    // Placeholder, replace with your power-up generation logic
    return {
      top: 150, // Adjust the initial position
      left: 200, // Adjust the initial position
      width: 50, // Adjust the power-up width
      height: 50, // Adjust the power-up height
    };
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
  }, [isGameOver, birdPosition, obstacles, powerUps, generateObstacle, generatePowerUp, checkCollisions]);
  
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
            <div key={index} style={{ position: 'absolute', top: obstacle.top, left: obstacle.left }}>
              <Obstacle type="pipe" position={obstacle} color="red" />
            </div>
          ))}

          {powerUps.map((powerUp, index) => (
            <div key={index} style={{ position: 'absolute', top: powerUp.top, left: powerUp.left }}>
              <PowerUp type="speedBoost" position={powerUp} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
