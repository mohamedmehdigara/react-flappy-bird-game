import React from 'react';
import styled from 'styled-components';
import Game from './Game';

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const MyGameContainer = () => {
  const canvasRef = useRef(null);

  return (
    <GameContainer>
      <canvas ref={canvasRef} />
      <Game canvas={canvasRef.current} />
    </GameContainer>
  );
};

export default MyGameContainer;
