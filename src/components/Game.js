// Game.js
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import Ground from './Ground';
import Bird from './Bird';
import GameOverScreen from './GameOverScreen';

const useGameLoop = (interval, onTick, onGameOver) => {
  const gameLoopRef = useRef();

  useEffect(() => {
    const tick = () => {
      try {
        onTick();
      } catch (error) {
        console.error('Error during game tick:', error);
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

const Game = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameLogic = () => {
    if (!isGameOver) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    stopGameLoop();
    startGameLoop();
  };

  const stopGameLoop = useGameLoop(1000, handleGameLogic, isGameOver ? handleGameOver : null);
  const startGameLoop = useGameLoop(1000, handleGameLogic, isGameOver ? handleGameOver : null);

  return (
    <div>
      <Background />
      <Ground />
      <Bird />
      <h1>Flappy Bird</h1>
      <p>Score: {score}</p>
      {isGameOver ? (
        <GameOverScreen restartGame={restartGame} />
      ) : (
        <p>Game is running...</p>
      )}
    </div>
  );
};

Game.propTypes = {};

export default Game;

