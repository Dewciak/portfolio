"use client";
import {OrbitControls} from "@react-three/drei";
import {useFrame, useLoader, useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {Group, Vector3} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

interface SceneProps {
  position: number[];
  rotation: number[];
  cameraPosition: number[];
  cameraLookAt: number[];
}

const Scene = ({position, rotation, cameraPosition, cameraLookAt}: SceneProps) => {
  const gltf = useLoader(GLTFLoader, "/Models/scene10.gltf");
  const meshRef = useRef<Group>();
  const {camera} = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
      meshRef.current.position.set(position[0], position[1], position[2]);
    }

    camera.position.lerp(new Vector3(cameraPosition[0], cameraPosition[1], cameraPosition[2]), 0.1);

    camera.lookAt(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]);
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
