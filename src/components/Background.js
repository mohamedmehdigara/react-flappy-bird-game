import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components for styling
const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  z-index: ${(props) => props.zIndex}; /* Place it behind other elements */
`;

// Background functional component
const Background = ({ backgroundColor, zIndex }) => {
  return <BackgroundContainer backgroundColor={backgroundColor} zIndex={zIndex} />;
};

// PropTypes for type checking
Background.propTypes = {
  backgroundColor: PropTypes.string,
  zIndex: PropTypes.number,
};

// Default props for better readability
Background.defaultProps = {
  backgroundColor: 'skyblue',
  zIndex: -1,
};

export default Background;
