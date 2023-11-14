import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from 'react-spring';
import { Ground } from './Ground'; // Import Ground component if you have one
import { Obstacle } from './Obstacle'; // Import Obstacle component if you have one
import { PowerUp } from './PowerUp'; // Import PowerUp component if you have one
import Bird from './Bird';
import Background from './Background';

const GameContainer = () => {
  // Adjust bird speed as needed
  const birdSpeed = 1;

  // Use react-spring for bird animation
  const birdAnimation = useSpring({
    from: { position: [0, 0, 0] },
    to: async (next) => {
      while (true) {
        await next({ position: [0, 10, 0] });
        await next({ position: [0, 0, 0] });
      }
    },
    reset: true,
  });

  return (
    <Canvas>
      {/* Background or ground */}
      <Background />

      {/* Bird component with animation */}
      <animated.mesh position={birdAnimation.position}>
        <boxBufferGeometry args={[10, 10, 10]} />
        <meshBasicMaterial color="black" />
        
      </animated.mesh>
      <Bird/>

      {/* Other components like obstacles, power-ups, etc. */}
      <Obstacle position={[10, 5, 0]} /> {/* Example Obstacle component with position prop */}

      <PowerUp position={[-10, 5, 0]} /> {/* Example PowerUp component with position prop */}

      {/* Light sources (ambient and point lights) */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
};

export default GameContainer;
