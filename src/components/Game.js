import React from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Bird = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
`;

const Obstacle = styled.div`
  width: 50px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 500px;
  background-color: green;
`;

const Game = () => {
  const [birdPosition, setBirdPosition] = React.useState({
    top: 0,
  });

  const handleBirdMove = (event) => {
    // Update the bird's position based on the keyboard input.
  };

  const handleBirdCollision = () => {
    // Game over!
  };

  return (
    <GameContainer>
      <Bird
        style={{
          top: birdPosition.top,
        }}
      />
            <Bird position={birdPosition} />

      <Obstacle />
    </GameContainer>
  );
};

export default Game;
