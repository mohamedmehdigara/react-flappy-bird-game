import React, { useState, useEffect } from 'react';

const GameContainer = () => {
  const canvasRef = useRef(null);

  // Create a bird component.
  const Bird = () => {
    const [birdPosition, setBirdPosition] = useState({ x: 100, y: 100 });

    useEffect(() => {
      // Update the bird's position every frame.
      const updateBirdPosition = () => {
        setBirdPosition({ ...birdPosition, y: birdPosition.y + 1 });
      };

      requestAnimationFrame(updateBirdPosition);

      return () => cancelAnimationFrame(updateBirdPosition);
    }, [birdPosition]);

    return (
      <mesh position={birdPosition}>
        <boxBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color="black" />
      </mesh>
    );
  };

  return (
    <canvas ref={canvasRef}>
      <Bird />
    </canvas>
  );
};

export default GameContainer;
