import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GameLoop = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const stopGameLoopRef = useRef();

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

  const useGameLoop = (interval, onTick, onGameOver) => {
    const gameLoopRef = useRef();

    useEffect(() => {
      const tick = () => {
        try {
          onTick();
        } catch (error) {
          console.error('Error during game tick:', error);
          // Handle or log the error as needed
        }

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

  // Declare the functions before using them
  const stopGameLoop = useGameLoop(1000, handleGameLogic, isGameOver ? handleGameOver : null);
  const startGameLoop = useGameLoop(1000, handleGameLogic, isGameOver ? handleGameOver : null);

  useEffect(() => {
    // Place your side effects or async operations here
    // Make sure to handle cleanup if necessary
  }, [/* dependencies */]);

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

GameLoop.propTypes = {
  // Add any prop types if needed
};

export default GameLoop;
