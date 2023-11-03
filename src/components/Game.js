import React from 'react';
import Bird from './Bird';
import GameContainer from './GameContainer';

const Game = () => {
  const [birdPosition, setBirdPosition] = React.useState({
    top: 0,
  });

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

  // Added a function to handle game over.
  const handleGameOver = () => {
    // TODO: Implement game over logic here.
    alert('Game over!');
  };

  // Added a callback to the Bird component to handle game over.
  return (
    <GameContainer>
      <Bird position={birdPosition} onGameOver={handleGameOver} />
    </GameContainer>
  );
};

export default Game;
