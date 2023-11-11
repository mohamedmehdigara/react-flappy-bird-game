import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GameLoop = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameLogic = () => {
    if (!isGameOver) {
      // Simulate game logic - increase score over time
      setScore((prevScore) => prevScore + 1);
    }
  };

  useEffect(() => {
    const gameLoopInterval = setInterval(() => {
      handleGameLogic();
    }, 1000); // Adjust the interval based on your game logic

    return () => {
      clearInterval(gameLoopInterval);
    };
  }, [isGameOver]);

  const handleGameOver = () => {
    console.log('Game over logic goes here!');
    // Add your logic for handling game over, e.g., showing a game over screen.
    setIsGameOver(true);
  };

  return (
    <div>
      <h1>Flappy Bird</h1>
      <p>Score: {score}</p>
      {!isGameOver && <p>Game is running...</p>}
      {isGameOver && (
        <div>
          <p>Game Over!</p>
          <Link to="/gameMenu">Return to Menu</Link>
        </div>
      )}
    </div>
  );
};

export default GameLoop;
