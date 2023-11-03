// PowerUpComponent.js
import React from 'react';
import styled from 'styled-components';

const PowerUpContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 500px;
  background-color: blue;
`;

const PowerUp = ({ type, position, effect }) => {
  // Render the appropriate power-up based on the type.
  switch (type) {
    case 'speedBoost':
      return (
        <PowerUpContainer
          style={{
            top: position.y,
            left: position.x,
          }}
        />
      );
    case 'invincibility':
      return (
        <PowerUpContainer
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
