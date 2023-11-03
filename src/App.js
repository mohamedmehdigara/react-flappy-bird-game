import React from 'react';
import Game from './components/Game';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';
import Leaderboard from './components/Leaderboard';
import Bird from './components/Bird';

const App = () => {
  const [birdPosition, setBirdPosition] = React.useState({
    top: 0,
  });

  const [obstacles, setObstacles] = React.useState([
    {
      type: 'pipe',
      position: {
        x: 500,
        y: 0,
      },
    },
    { type: 'platform', position: { x: 300, y: 100 }, color: 'blue' }
  ]);
  const [powerUps, setPowerUps] = React.useState([
    {
      type: "speedBoost",
      position: {
        x: 300,
        y: 0,
      },
      effect: () => {
        // Increase the bird's speed by 10%.
        setBirdSpeed(birdSpeed * 1.1);
      },
    },
    {
      type: "invincibility",
      position: {
        x: 300,
        y: 100,
      },
      effect: () => {
        // Make the bird invincible for 5 seconds.
        setBirdIsInvincible(true);
        setTimeout(() => {
          setBirdIsInvincible(false);
        }, 5000);
      },
    },
  ]);
  

  const [scores, setScores] = React.useState([]);

  const handleBirdMove = (event) => {
    // Update the bird's position based on the keyboard input.
    switch (event.keyCode) {
      case 38: // Up arrow
        setBirdPosition({
          ...birdPosition,
          top: birdPosition.top - 10,
        });
        break;
      case 40: // Down arrow
        setBirdPosition({
          ...birdPosition,
          top: birdPosition.top + 10,
        });
        break;
      default:
        break;
    }
  };

  const handleBirdCollision = () => {
    // Game over!
    alert('Game over!');
  };

  const handleGravity = () => {
    // Update the bird's position based on gravity.
    setBirdPosition({
      ...birdPosition,
      top: birdPosition.top + 1,
    });
  };

  const checkForCollision = () => {
    const bird = <Bird />;

    // Check if the bird is colliding with any of the obstacles.
    for (const obstacle of obstacles) {
      if (birdPosition.top < obstacle.position.y + obstacle.height &&
          birdPosition.top + bird.height > obstacle.position.y &&
          birdPosition.left < obstacle.position.x + obstacle.width &&
          birdPosition.left + bird.width > obstacle.position.x) {
        handleBirdCollision();
        break;
      }
    }
  };

  // Added a new function to restart the game.
  const restartGame = () => {
    setBirdPosition({
      top: 0,
    });

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

  React.useEffect(() => {
    const interval = setInterval(checkForCollision, 20);

    // Added a new cleanup function to restart the game when the component is unmounted.
    return () => {
      clearInterval(interval);
      restartGame();
    };
  }, [obstacles, birdPosition]);

  return (
    <div>
      <Game>
        <Bird
          style={{
            top: birdPosition.top,
          }}
        />
        {obstacles.map((obstacle, index) => (
          <Obstacle key={index} type={obstacle.type} position={obstacle.position} color={obstacle.color}/>
        ))}
        {powerUps.map((powerUp, index) => (
          <PowerUp key={index} type={powerUp.type} position={powerUp.position} effect={powerUp.effect}/>
        ))}
      </Game>
      <Leaderboard scores={scores} />
    </div>
  );
};

export default App;
