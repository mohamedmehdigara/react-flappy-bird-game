// Ground.js
import React from 'react';
import styled from 'styled-components';

const GroundContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: green;
`;

const Ground = () => {
  return <GroundContainer />;
};

export default Ground;
