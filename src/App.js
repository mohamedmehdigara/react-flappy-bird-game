import React, { useState, useEffect, useCallback, useRef } from 'react';
import Bird from './components/Bird';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';
import Leaderboard from './components/Leaderboard';

const App = () => {
  // Define the state variables.
  const [bird, setBird] = useState({ top: 0 });
  const [birdIsInvincible, setBirdIsInvincible] = useState(false);
  const [obstacles, setObstacles] = useState([
    {
      type: 'pipe',
      position: {
        x: 500,
        y: 0,
      },
    },
  ]);
  const [powerUps, setPowerUps] = useState([
    {
      type: 'speedBoost',
      position: {
        x: 300,
        y: 0,
      },
    },
  ]);
  const [scores, setScores] = useState([]);
  const birdRef = useRef(null);

  // Define the functions.
  const handleBirdCollision = () => {
    // Game over!
    alert('Game over!');

    // Restart the game.
    restartGame();
  };

  const checkForCollision = useCallback(() => {
    const bird = birdRef.current;
  
    if (bird) {
      for (const obstacle of obstacles) {
        if (bird.position.top < obstacle.position.y + obstacle.height &&
            bird.position.top + bird.height > obstacle.position.y &&
            bird.position.left < obstacle.position.x + obstacle.width &&
            bird.position.left + bird.width > obstacle.position.x) {
          handleBirdCollision();
          break;
        }
      }
  
      for (const powerUp of powerUps) {
        if (bird.position.top < powerUp.position.y + powerUp.height &&
            bird.position.top + bird.height > powerUp.position.y &&
            bird.position.left < powerUp.position.x + powerUp.width &&
            bird.position.left + bird.width > powerUp.position.x) {
          powerUp.effect();
          break;
        }
      }
    }
  }, [birdRef, obstacles, powerUps]);
  
  const restartGame = () => {
    setBird({ top: 0 });

    setObstacles([
      {
        type: 'pipe',
        position: {
          x: 500,
          y: 0,
        },
      },
    ]);

    setPowerUps([
      {
        type: 'speedBoost',
        position: {
          x: 300,
          y: 0,
        },
      },
    ]);
  };

  // Use the useEffect hook to check for collisions every 20 milliseconds.
  useEffect(() => {
    const interval = setInterval(checkForCollision, 20);

    // Return a cleanup function to clear the interval when the component is unmounted.
    return () => {
      clearInterval(interval);
    };
  }, [checkForCollision]);

  // Render the game.
  return (
    <div>
      <Bird position={bird} ref={birdRef} />
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} type={obstacle.type} position={obstacle.position} />
      ))}
      {powerUps.map((powerUp, index) => (
        <PowerUp key={index} type={powerUp.type} position={powerUp.position} />
      ))}
      <Leaderboard scores={scores} />
    </div>
  );
};

export default App;
