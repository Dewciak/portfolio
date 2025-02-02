"use client";
import {OrbitControls} from "@react-three/drei";
import {useFrame, useLoader} from "@react-three/fiber";
import {useRef} from "react";
import {Group} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

interface SceneProps {
  position: number[];
  rotation: number[];
}

const Scene = ({position, rotation}: SceneProps) => {
  const gltf = useLoader(GLTFLoader, "/Models/scene10.gltf");
  const meshRef = useRef<Group>();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
      meshRef.current.position.set(position[0], position[1], position[2]);

      // meshRef.current.position.set(5.5, 0, 4);
      // meshRef.current.rotation.set(0, 4.8, 0);
      // two rooms working position, second room

      // meshRef.current.position.set(0, 0, 0);
      // meshRef.current.rotation.set(0, 0, 0);
      // two rooms working position, first room
    }
  });

  return (
    <>
      <directionalLight position={[0, 10, 0]} intensity={0} />
      <primitive ref={meshRef} object={gltf.scene} />
      <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} />
    </>
  );
};

export default Scene;
