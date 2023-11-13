import React from 'react';
import { useSpring, animated } from 'react-spring';

const Bird = ({ speed }) => {
  const [birdPosition, setBirdPosition] = useSpring(() => ({
    position: [100, 100, 0],
    config: { mass: 1, tension: 80, friction: 20 },
  }));

  React.useEffect(() => {
    const updateBirdPosition = () => {
      setBirdPosition({ position: [100, birdPosition.y + speed, 0] });
    };

    const animationFrameId = requestAnimationFrame(updateBirdPosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, birdPosition.y, setBirdPosition]);
  return (
    <mesh>
      <boxBufferGeometry args={[10, 10, 10]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
};

export default Bird;
