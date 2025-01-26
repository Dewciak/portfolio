"use client";
import React from "react";
import {Canvas, useLoader} from "@react-three/fiber";

import {OrbitControls} from "@react-three/drei";
import {GLTFLoader} from "three/examples/jsm/Addons.js";

const Scene: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/Models/Scene.gltf"); // Ścieżka do modelu GLTF w folderze public

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <primitive object={gltf.scene} /> {/* Renderuje scenę GLTF */}
      <OrbitControls /> {/* Dodaje możliwość obracania kamery */}
    </Canvas>
  );
};

export default Scene;
