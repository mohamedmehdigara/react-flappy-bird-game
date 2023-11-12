import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const Bird = ({ speed }) => {
  const [birdPosition, setBirdPosition] = useState({ x: 100, y: 100, z: 0 });

  useEffect(() => {
    const updateBirdPosition = () => {
      setBirdPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + speed }));
    };

    const animationFrameId = requestAnimationFrame(updateBirdPosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return (
    <mesh position={birdPosition}>
      <boxBufferGeometry args={[10, 10, 10]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
};

const GameContainer = () => {
  const birdSpeed = 1;

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {/* Add ground/floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
        <planeBufferGeometry args={[1000, 1000]} />
        <meshBasicMaterial color="#d3d3d3" />
      </mesh>

      <Bird speed={birdSpeed} />
    </Canvas>
  );
};

export default GameContainer;
