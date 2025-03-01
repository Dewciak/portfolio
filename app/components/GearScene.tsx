import {Canvas} from "@react-three/fiber";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import Image from "next/image";
import WorkImage from "@/public/images/GearNoWebGl.png";
import GameImage from "@/public/images/GearNoWebGlGame.png";

const Scene = dynamic(() => import("./Scene"), {ssr: false});

interface Props {
  position: number[];
  rotation: number[];
  cameraPosition: number[];
  cameraLookAt: number[];
  gameMode?: boolean;
}

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
};
// Function to check if WebGL is available

const GearScene = ({position, rotation, cameraLookAt, cameraPosition, gameMode}: Props) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
  }, []);

  if (webGLSupported === false) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Image src={gameMode ? WorkImage : GameImage} alt='3D gear scene' width={800} height={600} priority />
      </div>
    );
  }
  // If WebGL is not supported, display a fallback image
  return (
    <div className='flex relative w-full h-full'>
      <Canvas camera={{fov: 90, zoom: 7}}>
        <Scene position={position} rotation={rotation} cameraPosition={cameraPosition} cameraLookAt={cameraLookAt} />
      </Canvas>
      <div className='absolute inset-0 z-10' style={{pointerEvents: "auto"}} />
    </div>
    // If WebGL is supported, display the 3D scene
  );
};

export default GearScene;
