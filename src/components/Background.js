import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor || 'skyblue'};
  z-index: ${(props) => props.zIndex || -1}; /* Place it behind other elements */
`;

const Background = ({ backgroundColor = 'skyblue', zIndex = -1 }) => {
  return <BackgroundContainer backgroundColor={backgroundColor} zIndex={zIndex} />;
};

Background.propTypes = {
  backgroundColor: PropTypes.string,
  zIndex: PropTypes.number,
};

export default Background;
