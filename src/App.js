import React, { useState, useEffect, useCallback, useRef } from 'react';
import Bird from './components/Bird';
import Obstacle from './components/Obstacle';
import PowerUp from './components/PowerUp';
import Leaderboard from './components/Leaderboard';
import GameLevel from './components/GameLevel';
import GameMenu, {onStartGame} from './components/GameMenu';

const App = () => {
  const [gameState, setGameState] = useState('menu');
  const [level, setLevel] = useState(1);
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

  const startGame = () => {
    setGameState('playing');
  };

  // Use the useEffect hook to check for collisions every 20 milliseconds and update the bird's position.
  useEffect(() => {
    const interval = setInterval(checkForCollision, 20);

    const updateBirdPosition = () => {
      // Update the bird's position here.
    };

    updateBirdPosition();

    // Return a cleanup function to clear the interval and stop updating the bird's position when the component is unmounted.
    return () => {
      clearInterval(interval);
      updateBirdPosition();
    };
  }, [checkForCollision]);

  // Render all of the components unconditionally.
  return (
    <div>
      <Bird />
      <Obstacle />
      <PowerUp />
      <Leaderboard />
      <GameLevel />
      <GameMenu onStartGame={onStartGame} />
      
    </div>
  );
};
export default App;
