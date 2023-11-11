import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPowerUp = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: ${(props) => props.backgroundColor || 'blue'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const PowerUp = ({ type, position, effect }) => {
  // Define the background color based on the effect (add more if needed)
  const backgroundColor = effect === 'speedBoost' ? 'yellow' : 'blue';

  // Render the appropriate power-up based on the type.
  switch (type) {
    case 'speedBoost':
    case 'invincibility':
      return (
        <StyledPowerUp
          key={position.y}
          title={`${effect} power-up`}
          role="powerup"
          style={{
            top: position.y,
            left: position.x,
          }}
          backgroundColor={backgroundColor}
        />
      );
    default:
      return null;
  }
};

PowerUp.propTypes = {
  type: PropTypes.oneOf(['speedBoost', 'invincibility']).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  effect: PropTypes.string.isRequired,
};

export default PowerUp;
