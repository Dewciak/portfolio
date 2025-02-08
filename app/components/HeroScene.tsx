import React from "react";
import {Canvas} from "@react-three/fiber";
import dynamic from "next/dynamic";
import Scene from "./Scene";
// const Scene = dynamic(() => import("./Scene"), {ssr: false});

interface Props {
  position: number[];
  rotation: number[];
  cameraLookAt: number[];
}

const HeroScene = ({position, rotation, cameraLookAt}: Props) => {
  return (
    <div className='flex relative w-full h-full'>
      <Canvas camera={{fov: 90, zoom: 3}} className=' pointer-events-none '>
        <Scene position={position} rotation={rotation} cameraPosition={[0, 3, -9]} cameraLookAt={cameraLookAt} />
      </Canvas>
      <div className='absolute inset-0 z-10 ' style={{pointerEvents: "auto"}}></div>
    </div>
  );
};

export default HeroScene;
