import React from 'react';
import styled from 'styled-components';
import Game from "./Game";

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Added a background color to the game container */
  background-color: #fff;
  /* Added a border to the game container */
  border: 1px solid #ccc;
`;

const MyGameContainer = () => {
  return (
    <div>
      <Game />
    </div>
  );
};

export default MyGameContainer;
