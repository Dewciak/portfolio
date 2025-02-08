import React from "react";
import {Canvas} from "@react-three/fiber";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("./Scene"), {ssr: false});

interface Props {
  position: number[];
  rotation: number[];
  cameraPosition: number[];
  cameraLookAt: number[];
}

const GearScene = ({position, rotation, cameraLookAt, cameraPosition}: Props) => {
  return (
    <div className='flex relative w-full h-full'>
      <Canvas camera={{fov: 90, zoom: 7}}>
        <Scene position={position} rotation={rotation} cameraPosition={cameraPosition} cameraLookAt={cameraLookAt} />
      </Canvas>
      <div className='absolute inset-0 z-10 ' style={{pointerEvents: "auto"}} />
    </div>
  );
};

export default GearScene;
