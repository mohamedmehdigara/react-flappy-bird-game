import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const useGameLoop = (interval, onTick, onGameOver) => {
  const gameLoopRef = useRef();

  useEffect(() => {
    const tick = () => {
      onTick();
      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [onTick, onGameOver]);

  const stopGameLoop = () => {
    cancelAnimationFrame(gameLoopRef.current);
  };

  return stopGameLoop;
};

const GameLoop = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameLogic = () => {
    if (!isGameOver) {
      // Simulate game logic - increase score over time
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleGameOver = () => {
    console.log('Game over logic goes here!');
    // Add your logic for handling game over, e.g., showing a game over screen.
    setIsGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    stopGameLoop(); // Stop the previous game loop
    startGameLoop(); // Start a new game loop
  };

  const stopGameLoop = useGameLoop(1000, handleGameLogic, isGameOver ? handleGameOver : null);
  const startGameLoop = useGameLoop(1000, handleGameLogic, isGameOver ? handleGameOver : null);

  return (
    <div>
      <h1>Flappy Bird</h1>
      <p>Score: {score}</p>
      {!isGameOver && <p>Game is running...</p>}
      {isGameOver && (
        <div>
          <p>Game Over!</p>
          <button onClick={restartGame}>Restart Game</button>
          <Link to="/gameMenu">Return to Menu</Link>
        </div>
      )}
    </div>
  );
};

export default GameLoop;
