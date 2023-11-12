import React from 'react';
import styled from 'styled-components';

const ObstacleContainer = styled.div`
  width: 50px;
  height: 100px;
  position: absolute;
  background-color: green;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const Obstacle = ({ type, position, color }) => {
  // Check if position is defined before accessing its properties
  if (!position || typeof position !== 'object' || isNaN(position.y)) {
    return null;
  }

  // Render the appropriate obstacle based on the type.
  switch (type) {
    case 'pipe':
      return (
        <ObstacleContainer
          key={position.y}
          title="Pipe obstacle"
          role="obstacle"
          style={{
            top: position.y,
            left: position.x,
            backgroundColor: color,
          }}
        />
      );
    case 'platform':
      return (
        <ObstacleContainer
          key={position.y}
          title="Platform obstacle"
          role="obstacle"
          style={{
            top: position.y,
            left: position.x,
            backgroundColor: color,
          }}
        />
      );
    default:
      return null;
  }
};

export default Obstacle;
