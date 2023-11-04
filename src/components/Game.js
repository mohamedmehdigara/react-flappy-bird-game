import React, { useState, useEffect } from 'react';

const Game = () => {
  const [birdPosition, setBirdPosition] = useState({
    top: 0,
  });

  const handleGameOver = () => {
    // Restart the game.
    setBirdPosition({ top: 0 });

    // TODO: Implement a leaderboard to store the player's high score.
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
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

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [birdPosition]);

  // This component does not render anything.
  return null;
};

export default Game;
