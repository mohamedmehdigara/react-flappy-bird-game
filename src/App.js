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
  ]);

  const [powerUps, setPowerUps] = React.useState([
    {
      type: 'speedBoost',
      position: {
        x: 300,
        y: 0,
      },
    },
  ]);

  const [scores, setScores] = React.useState([]);

  const handleBirdMove = (event) => {
    // Update the bird's position based on the keyboard input.
  };

  const handleBirdCollision = () => {
    // Game over!
  };

  const handleGravity = () => {
    // Update the bird's position based on gravity.
  };

  React.useEffect(() => {
    const interval = setInterval(handleGravity, 20);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Game>
        <Bird
          style={{
            top: birdPosition.top,
          }}
        />
        {obstacles.map((obstacle, index) => (
          <Obstacle key={index} type={obstacle.type} position={obstacle.position} />
        ))}
        {powerUps.map((powerUp, index) => (
          <PowerUp key={index} type={powerUp.type} position={powerUp.position} />
        ))}
      </Game>
      <Leaderboard scores={scores} />
    </div>
  );
};

export default App;
