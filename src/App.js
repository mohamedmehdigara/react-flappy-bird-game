import React, { useState } from 'react';

const App = () => {
  const [bird, setBird] = useState({ top: 0 });
  const [obstacles, setObstacles] = useState([
    { type: 'pipe', position: { x: 500, y: 0 } },
    { type: 'platform', position: { x: 300, y: 100 }, color: 'blue' },
  ]);
  const [powerUps, setPowerUps] = useState([
    {
      type: 'speedBoost',
      position: { x: 300, y: 0 },
      effect: () => {
        setBirdSpeed(birdSpeed * 1.1);
      },
    },
    {
      type: 'invincibility',
      position: { x: 300, y: 100 },
      effect: () => {
        setBirdIsInvincible(true);
        setTimeout(() => {
          setBirdIsInvincible(false);
        }, 5000);
      },
    },
  ]);
  const [scores, setScores] = useState([]);

  // Added a new state variable to track the bird's speed.
  const [birdSpeed, setBirdSpeed] = useState(100);

  // Added a new state variable to track whether the bird is invincible.
  const [birdIsInvincible, setBirdIsInvincible] = useState(false);

  // Added a new function to handle bird movement.
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

  // Added a new function to handle bird collision.
  const handleBirdCollision = () => {
    // Game over!
    alert('Game over!');

    // Added a new line to restart the game.
    restartGame();
  };

  // Added a new function to handle gravity.
  const handleGravity = () => {
    // Added a conditional statement to check if the bird is invincible.
    if (!birdIsInvincible) {
      setBird({ ...bird, top: bird.top + 1 });
    }
  };

  // Added a new function to check for collision.
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
  }// Added a new function to restart the game.
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
  
  React.useEffect(() => {
    const interval = setInterval(checkForCollision, 20);
  
    // Return a cleanup function to clear the interval when the component is unmounted.
    return () => {
      clearInterval(interval);
    };
  }, [obstacles, birdPosition]);
  

  return (
    <div>
      <Bird position={birdPosition} />
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} type={obstacle.type} position={obstacle.position} color={obstacle.color} />
      ))}
      {powerUps.map((powerUp, index) => (
        <PowerUp key={index} type={powerUp.type} position={powerUp.position} effect={powerUp.effect} />
      ))}
      <Leaderboard scores={scores} />
      <GameContainer />
    </div>
  );
};

export default App;