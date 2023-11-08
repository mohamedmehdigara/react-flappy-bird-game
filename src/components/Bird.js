import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Bird = () => {
  const [isFlapping, setIsFlapping] = useState(false);

  const handleFlap = () => setIsFlapping(!isFlapping);

  return (
    <BirdContainer className={`bird ${isFlapping ? 'flapping' : ''}`} onMouseDown={handleFlap}>
      {isFlapping ? <AnimatedBird /> : <StaticBird />}
    </BirdContainer>
  );
};

const birdBaseStyles = `
  border-radius: 50%;
  height: 20px;
  width: 20px;
  position: absolute;
`;

const BirdContainer = styled.div`
  ${birdBaseStyles};
  position: absolute;
  top: 100px; /* Adjust the initial position as needed */
  transition: transform 0.3s; /* Smooth transition for bird movement */
`;



const flapAnimation = keyframes`
  0% {
    transform: translateY(-10px) rotate(0deg);
  }
  50% {
    transform: translateY(10px) rotate(45deg);
  }
  100% {
    transform: translateY(-10px) rotate(0deg);
  }
`;


const AnimatedBird = styled.div`
  ${birdBaseStyles}
  transform: translateY(-10px);
  animation: ${flapAnimation} 1s infinite alternate;
`;

const StaticBird = styled.div`
  ${birdBaseStyles}
  transform: translateY(0);
`;

export default Bird;
