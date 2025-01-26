"use client";
import React from "react";
import {Canvas, useLoader} from "@react-three/fiber";

import {OrbitControls} from "@react-three/drei";
import {GLTFLoader} from "three/examples/jsm/Addons.js";

const Scene: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/Models/Scene.gltf");

  return (
    <Canvas camera={{position: [-1, 3, -9], fov: 90, zoom: 3}}>
      <directionalLight position={[0, 10, 0]} intensity={0} />
      <primitive object={gltf.scene} />
      <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} />
    </Canvas>
  );
};

export default Scene;
