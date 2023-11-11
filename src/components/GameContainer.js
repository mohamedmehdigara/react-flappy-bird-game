import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const GameContainer = () => {
  const birdSpeed = 1;

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
        <boxBufferGeometry args={[10, 10, 10]} />
        <meshBasicMaterial color="black" />
      </mesh>
    );
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {/* Add ground/floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
        <planeBufferGeometry args={[1000, 1000]} />
        <meshBasicMaterial color="#d3d3d3" />
      </mesh>

      <Bird />
    </Canvas>
  );
};

export default GameContainer;

