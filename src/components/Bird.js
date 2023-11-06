import React, { useState, useEffect, useThree, useMemo } from 'react';
import * as THREE from "three/src/Three.js";

const birdPosition = { x: 100, y: 100 };

const Bird = () => {
  const scene = useThree();

  const bird = useMemo(() => new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshBasicMaterial({ color: "black" })), []);

  useEffect(() => {
    // Add the bird to the scene.
    scene.add(bird);

    // Update the bird's position every frame.
    const updateBirdPosition = () => {
      birdPosition.y += 1;
    };

    requestAnimationFrame(updateBirdPosition);

    return () => cancelAnimationFrame(updateBirdPosition);
  }, []);

  return (
    <mesh position={birdPosition}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="black" />
    </mesh>
  );
};

export default Bird;
