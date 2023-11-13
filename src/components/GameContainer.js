import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from 'react-spring';

import Bird from './Bird';

const GameContainer = () => {
  const birdSpeed = 1;

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
      {/* Your existing components */}
      <animated.mesh position={birdAnimation.position}>
        <boxBufferGeometry args={[10, 10, 10]} />
        <meshBasicMaterial color="black" />
      </animated.mesh>

      {/* Rest of your components */}
    </Canvas>
  );
};

export default GameContainer;
