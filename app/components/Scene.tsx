"use client";
import {OrbitControls, useGLTF} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {useEffect, useMemo, useRef} from "react";
import {Group, Vector3} from "three";

interface SceneProps {
  position: number[];
  rotation: number[];
  cameraPosition: number[];
  cameraLookAt: number[];
  onReady?: () => void;
  referenceViewportHeight?: number;
  /**
   * Zoom the model would get at `referenceViewportHeight`. Because the applied
   * zoom is scaled by reference/actual height, growing the canvas reveals more
   * of the scene instead of enlarging the model.
   */
  zoomFactor?: number;
}

const Scene = ({
  position,
  rotation,
  cameraPosition,
  cameraLookAt,
  onReady,
  referenceViewportHeight,
  zoomFactor = 3,
}: SceneProps) => {
  const gltf = useGLTF("/Models/scene10.optimized.glb");
  const meshRef = useRef<Group>();
  const {camera, size} = useThree();
  const cameraTarget = useMemo(
    () => new Vector3(cameraPosition[0], cameraPosition[1], cameraPosition[2]),
    [cameraPosition]
  );

  useEffect(() => {
    onReady?.();
  }, [gltf, onReady]);

  useEffect(() => {
    if (!referenceViewportHeight) return;

    camera.zoom = (zoomFactor * referenceViewportHeight) / size.height;
    camera.updateProjectionMatrix();
  }, [camera, referenceViewportHeight, size.height, zoomFactor]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
      meshRef.current.position.set(position[0], position[1], position[2]);
    }

    camera.position.lerp(cameraTarget, 0.1);

    camera.lookAt(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]);
  });

  return (
    <>
      <directionalLight position={[0, 10, 0]} intensity={0} />
      <primitive ref={meshRef} object={gltf.scene} />
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </>
  );
};

useGLTF.preload("/Models/scene10.optimized.glb");

export default Scene;
