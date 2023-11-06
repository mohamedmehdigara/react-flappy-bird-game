import React from "react";
import { useAnimationFrame, useFrame } from "@react-three/fiber";

const Bird = () => {
  const canvas = React.useRef(null);
  const birdPosition = React.useState({ x: 100, y: 100 });

  // Use a different hook from the `@react-three/fiber` package
  useFrame(() => {
    const ctx = canvas.current.getContext('2d');

    // Update the bird's position
    birdPosition.current.y += 1;

    // Draw the bird
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(birdPosition.current.x, birdPosition.current.y);
    ctx.lineTo(birdPosition.current.x + 100, birdPosition.current.y);
    ctx.lineTo(birdPosition.current.x + 50, birdPosition.current.y + 50);
    ctx.closePath();
    ctx.fill();
  });

  return (
    <canvas ref={canvas} />
  );
};

// Export the `Bird` component
export default Bird;
