import React from 'react';
import styled from 'styled-components';

const ObstacleContainer = styled.div`
  width: 50px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 500px;
  background-color: green;
`;

const Obstacle = ({ type, position, color }) => {
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
