import React, { useState, useEffect } from 'react';
import Bird from './Bird';
import Obstacle from './Obstacle';
import PowerUp from './PowerUp';
import GameOverScreen from './GameOverScreen';

const Game = React.memo(() => {
  const [birdPosition, setBirdPosition] = useState({ top: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

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
    setTimeout(() => {
      setBirdPosition({ top: 0 });
      setIsGameOver(false);
      setObstacles([]);
      setPowerUps([]);
    }, 2000);
  };

  const handleObstacleCollision = (obstacle) => {
    setIsGameOver(true);
    handleGameOver();
  };

  const handlePowerUpCollision = (powerUp) => {
    setPowerUps((prevPowerUps) => prevPowerUps.filter((p) => p !== powerUp));
  };

  const checkCollisions = () => {
    obstacles.forEach((obstacle) => {
      if (isCollision(birdPosition, obstacle)) {
        handleObstacleCollision(obstacle);
      }
    });

    powerUps.forEach((powerUp) => {
      if (isCollision(birdPosition, powerUp)) {
        handlePowerUpCollision(powerUp);
      }
    });
  };

  const generateObstacle = () => {
    return {
      top: 100,
      left: 300,
      width: 50,
      height: 100,
    };
  };

  const generatePowerUp = () => {
    return {
      top: 150,
      left: 200,
      width: 50,
      height: 50,
    };
  };

  const updateGame = () => {
    checkCollisions();

    if (Math.random() < 0.02) {
      setObstacles((prevObstacles) => [...prevObstacles, generateObstacle()]);
    }

    if (Math.random() < 0.01) {
      setPowerUps((prevPowerUps) => [...prevPowerUps, generatePowerUp()]);
    }

    requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    if (!isGameOver) {
      const GAME_AREA_HEIGHT = 400;
      const animationFrameId = requestAnimationFrame(updateGame);

      return () => cancelAnimationFrame(animationFrameId);
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
});

export default Game;

