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
  const bird = document.querySelector('.bird');

  const [velocity, setVelocity] = React.useState({
    x: 0,
    y: 0,
  });
  // Check the bird's position against the positions of the obstacles.
  // If the bird collides with an obstacle, end the game or reset the bird's position.
  const isCollidingWithObstacle = (obstacles) => {
    // Iterate over all of the obstacles and check if the bird is colliding with any of them.
    for (const obstacle of obstacles) {
      // Get the bounding rectangles of the bird and the obstacle.
      const birdRect = bird.getBoundingClientRect();
      const obstacleRect = obstacle.getBoundingClientRect();
  
      // Check if the bird's bounding rectangle intersects with the obstacle's bounding rectangle.
      if (birdRect.intersects(obstacleRect)) {
        // The bird is colliding with an obstacle!
        return true;
      }
    }
  
    // The bird is not colliding with any obstacles.
    return false;
  };
  

  const handleCollision = () => {
    // You can end the game by calling the `gameOver()` function.
    // You can reset the bird's position by setting the `position` prop to its initial value.
  };

  // Update the bird's position based on gravity.
  const updatePositionBasedOnGravity = () => {
    // Add the force of gravity to the bird's vertical velocity.
    position.y += velocity.y;

    // Limit the bird's vertical velocity to a maximum value.
    velocity.y = Math.min(velocity.y, 10);
  };

  // Check if the bird has hit the ground.
  const hasHitGround = () => {
    // Check if the bird's y-position is greater than or equal to the height of the window.
    return position.y >= window.innerHeight;
  };

  // Handle the collision with the ground.
  const handleGroundCollision = () => {
    // You can end the game by calling the `gameOver()` function.
    // You can reset the bird's position by setting the `position` prop to its initial value.
  };

  // Render the bird's sprite.
  return (
    <BirdContainer style={{ top: position.top }}>
      {/* Render the bird sprite here */}
    </BirdContainer>
  );
};

export default Bird;
