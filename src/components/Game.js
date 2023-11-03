import React from 'react';
import Bird from './Bird';
import GameContainer from './GameContainer';

const Game = () => {
  const [birdPosition, setBirdPosition] = React.useState({
    top: 0,
  });

  const handleBirdMove = (event) => {
    // Update the bird's position based on the keyboard input.
  };

  return (
    <GameContainer>
      <Bird position={birdPosition} />
    </GameContainer>
  );
};

export default Game;
