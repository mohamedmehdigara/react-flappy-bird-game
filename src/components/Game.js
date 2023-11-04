import React, { useEffect, useMemo } from 'react';
import Bird from './Bird';
import GameContainer from './GameContainer';

const Game = () => {
  const [birdPosition, setBirdPosition] = React.useState({
    top: 0,
  });

  const memoizedBirdPosition = useMemo(() => birdPosition, [birdPosition]);

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

  // Improved the handleGameOver function to handle the game over logic.
  const handleGameOver = () => {
    // Restart the game.
    setBirdPosition({ top: 0 });

    // TODO: Implement a leaderboard to store the player's high score.
  };

  // Added a callback to the Bird component to handle game over.
  return (
    <GameContainer>
      <Bird
        position={memoizedBirdPosition}
        onGameOver={handleGameOver}
      />
    </GameContainer>
  );
};

export default Game;
