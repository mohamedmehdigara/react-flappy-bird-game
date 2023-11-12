// Background.js
import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: skyblue;
  z-index: -1; /* Place it behind other elements */
`;

const Background = () => {
  return <BackgroundContainer />;
};

export default Background;
