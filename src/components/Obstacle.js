import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledObstacle = styled.div`
  width: 50px;
  height: 100px;
  position: absolute;
  background-color: ${(props) => props.color || 'green'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const Obstacle = ({ type, position, color }) => {
  // Render the appropriate obstacle based on the type.
  switch (type) {
    case 'pipe':
    case 'platform':
      return (
        <StyledObstacle
          key={position.y}
          title={`${type} obstacle`}
          role="obstacle"
          style={{
            top: position.y,
            left: position.x,
          }}
          color={color}
        />
      );
    default:
      return null;
  }
};

Obstacle.propTypes = {
  type: PropTypes.oneOf(['pipe', 'platform']).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  color: PropTypes.string, // Add this if 'color' is an optional prop
};

export default Obstacle;
