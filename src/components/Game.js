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
  
  return (
    <GameContainer>
      <Bird position={birdPosition} />
      
    </GameContainer>
  );
};

export default Game;
