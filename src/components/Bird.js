import React, { useState, useEffect, useThree } from 'react';
import * as THREE from "three";

const Bird = () => {
  const scene = useThree();

  const bird = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshBasicMaterial({ color: "black" }));

  useEffect(() => {
    // Add the bird to the scene.
    scene.add(bird);
  }, []);

  return (
    <mesh position={birdPosition}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="black" />
    </mesh>
  );
};

export default Bird;
