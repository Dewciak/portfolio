import {Canvas} from "@react-three/fiber";
import Image from "next/image";
import {useEffect, useState} from "react";
import Scene from "./Scene";
import WorkImage from "@/public/images/HeroNoWebGl.png";
import GameImage from "@/public/images/GearNoWebGlGame.png";

interface Props {
  position: number[];
  rotation: number[];
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
  // Function to check if WebGL is available
};

const HeroScene = ({position, rotation, cameraLookAt, gameMode}: Props) => {
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
      <Canvas camera={{fov: 90, zoom: 3}} className='pointer-events-none'>
        <Scene position={position} rotation={rotation} cameraPosition={[0, 3, -9]} cameraLookAt={cameraLookAt} />
      </Canvas>
      <div className='absolute inset-0 z-10' style={{pointerEvents: "auto"}}></div>
    </div>
    // If WebGL is supported, display the 3D scene
  );
};

export default HeroScene;
