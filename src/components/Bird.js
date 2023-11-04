import React from "react";
import styled from "styled-components";

const BirdContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }

  /* Added a CSS class for styling the bird sprite */
  .bird-sprite {
    animation: flap 1s linear infinite;
  }

  /* Added a CSS class for styling the bird when it is invincible */
  .bird-invincible {
    opacity: 0.5;
  }
`;

const Bird = ({ position, isInvincible }) => {
  return (
    <BirdContainer
      style={{ top: position.top, left: position.left }}
      key={position.top}
      alt="Bird sprite"
      title="Bird sprite"
      role="img"
      className={`bird-sprite ${isInvincible ? "bird-invincible" : ""}`}
    />
  );
};

export default Bird;
