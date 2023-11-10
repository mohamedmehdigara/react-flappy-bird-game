import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

const GameContainer = () => {
  const birdSpeed = 1;
  const canvasRef = useRef(null);

  const Bird = () => {
    const [birdPosition, setBirdPosition] = useState({ x: 100, y: 100, z: 0 });

    useEffect(() => {
      const updateBirdPosition = () => {
        setBirdPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + birdSpeed }));
      };

      const animationFrameId = requestAnimationFrame(updateBirdPosition);

      return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
      <mesh position={birdPosition}>
        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
        <meshBasicMaterial attach="material" color="black" />
      </mesh>
    );
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Bird />
    </Canvas>
  );
};

export default GameContainer;
