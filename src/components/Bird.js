import React from 'react';
import styled, { keyframes } from 'styled-components';

const flapAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(20deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
`;

const BirdContainer = styled.div`
  position: absolute;
  bottom: 50%; /* Adjust the positioning as needed */
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${flapAnimation} 0.5s infinite; /* Add a flap animation */
`;

const Body = styled.div`
  width: 40px;
  height: 20px;
  background-color: #ffcc00; /* Yellow color for the bird */
  border-radius: 20px 20px 10px 10px;
`;

const Eye = styled.div`
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 20px;
`;

const Beak = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #ffcc00; /* Use the same color as the body */
  position: absolute;
  top: 8px;
  left: 30px;
  transform: rotate(45deg);
`;

const Bird = () => {
  return (
    <BirdContainer>
      <Body>
        <Eye />
        <Beak />
      </Body>
    </BirdContainer>
  );
};

export default Bird;
