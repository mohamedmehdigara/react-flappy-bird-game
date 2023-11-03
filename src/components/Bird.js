import React from 'react';
import styled from 'styled-components';

const BirdContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;

  animation: flap 1s linear infinite;

  @keyframes flap {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const Bird = ({ position }) => {
  // Check the bird's position against the positions of the obstacles.
  // If the bird collides with an obstacle, end the game or reset the bird's position.

  // Update the bird's position based on gravity.
  position.y += 0.1;

  // Check if the bird has hit the ground.
  if (position.y >= window.innerHeight) {
    // The bird has hit the ground!
    // Handle the collision here.
  }

  // Render the bird's sprite.
  return (
    <BirdContainer style={{ top: position.top }}>
      {/* Render the bird sprite here */}
    </BirdContainer>
  );
};

export default Bird;
