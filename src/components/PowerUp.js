import React from 'react';
import styled from 'styled-components';

const PowerUpContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: blue;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const PowerUp = ({ type, position, effect }) => {
  // Check if position is defined before accessing its properties
  if (!position || typeof position !== 'object' || isNaN(position.y)) {
    return null;
  }

  // Render the appropriate power-up based on the type.
  switch (type) {
    case 'speedBoost':
      return (
        <PowerUpContainer
          key={position.y}
          title="Speed boost power-up"
          role="powerup"
          style={{
            top: position.y,
            left: position.x,
          }}
        />
      );
    case 'invincibility':
      return (
        <PowerUpContainer
          key={position.y}
          title="Invincibility power-up"
          role="powerup"
          style={{
            top: position.y,
            left: position.x,
          }}
        />
      );
    default:
      return null;
  }
};

export default PowerUp;
