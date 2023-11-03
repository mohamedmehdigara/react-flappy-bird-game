import React from 'react';
import styled from 'styled-components';

const BirdContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  border-radius: 50%;

  animation: flap 1s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
  }

  @keyframes flap {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const Bird = ({ position }) => {
  return (
    <BirdContainer style={{ top: position.top, left: position.left }}>
      {/* The bird sprite is now rendered using a CSS pseudo-element */}
    </BirdContainer>
  );
};

export default Bird;
