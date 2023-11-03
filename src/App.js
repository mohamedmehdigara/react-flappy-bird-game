import React, { useState, useEffect } from 'react';
import Bird from './components/Bird';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';
import Leaderboard from './components/Leaderboard';

const App = () => {
  // Define the state variables.
  const [bird, setBird] = useState({ top: 0 });
  const [birdSpeed, setBirdSpeed] = useState(100);
  const [birdIsInvincible, setBirdIsInvincible] = useState(false);
  const [obstacles, setObstacles] = useState([
    {
      type: "pipe",
      position: {
        x: 500,
        y: 0,
      },
    },
  ]);
  const [powerUps, setPowerUps] = useState([
    {
      type: "speedBoost",
      position: {
        x: 300,
        y: 0,
      },
    },
  ]);
  const [scores, setScores] = useState([]);
  const [birdPosition, setBirdPosition] = useState({ top: 0 });


  // Define the functions.
  const handleBirdMovement = (event) => {
    switch (event.keyCode) {
      case 38: // Up arrow
        setBird({ ...bird, top: bird.top - 10 });
        break;
      case 40: // Down arrow
        setBird({ ...bird, top: bird.top + 10 });
        break;
      default:
        break;
    }
  };

  const handleBirdCollision = () => {
    // Game over!
    alert('Game over!');

    // Restart the game.
    restartGame();
  };

  const handleGravity = () => {
    if (!birdIsInvincible) {
      setBird({ ...bird, top: bird.top + 1 });
    }
  };

  const checkForCollision = () => {
    const bird = <Bird />;

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
  };

  const restartGame = () => {
    setBird({ top: 0 });

    setObstacles([
      {
        type: "pipe",
        position: {
          x: 500,
          y: 0,
        },
      },
    ]);

    setPowerUps([
      {
        type: "speedBoost",
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
  }, [obstacles, birdPosition]);

  // Render the game.
  return (
    <div>
      <Bird position={bird} />
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
