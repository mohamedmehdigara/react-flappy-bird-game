import React from 'react';
import styled from 'styled-components';

const BirdContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
`;

const Bird = ({ position }) => {
  return (
    <BirdContainer style={{ top: position.top }}>
      {/* Render the bird sprite here */}
    </BirdContainer>
  );
};

export default Bird;
