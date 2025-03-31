import {Canvas} from "@react-three/fiber";
import dynamic from "next/dynamic";
import {useEffect, useState, useRef, Suspense} from "react";
import Image from "next/image";
import WorkImage from "@/public/images/GearNoWebGl.png";
import GameImage from "@/public/images/GearNoWebGlGame.png";
import {ErrorBoundary} from "react-error-boundary";
import ClipLoader from "react-spinners/ClipLoader";

const Scene = dynamic(() => import("./Scene"), {ssr: false});

interface Props {
  position: number[];
  rotation: number[];
  cameraPosition: number[];
  cameraLookAt: number[];
  gameMode?: boolean;
}

const GearScene = ({position, rotation, cameraLookAt, cameraPosition, gameMode}: Props) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [renderError, setRenderError] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        // Try to get a WebGL context
        const gl = (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

        if (gl) {
          // Clean up when possible
          const loseContext = gl.getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }

          return true;
        }
        return false;
      } catch (e) {
        console.error("WebGL detection error:", e);
        return false;
      }
    };

    setWebGLSupported(checkWebGL());
  }, []);

  // Fallback image to display when WebGL isn't supported or when there's an error
  const FallbackImage = () => (
    <div className='w-full h-full flex items-center justify-center'>
      <Image src={gameMode ? GameImage : WorkImage} alt='3D gear scene' width={800} height={600} priority />
    </div>
  );

  // Error handler for the ErrorBoundary
  const handleRenderError = () => {
    setRenderError(true);
    console.error("Three.js rendering error detected");
  };

  // Show fallback if WebGL is not supported or there was a rendering error
  if (webGLSupported === false || renderError) {
    return <FallbackImage />;
  }

  // Loading state while checking WebGL support
  if (webGLSupported === null) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className='flex relative w-full h-full' ref={canvasRef}>
      <ErrorBoundary FallbackComponent={FallbackImage} onError={handleRenderError}>
        <Suspense
          fallback={
            <div className='w-full h-full flex items-center justify-center'>
              <ClipLoader color='#ffffff' />
            </div>
          }
        >
          <Canvas camera={{fov: 90, zoom: 7}} className='pointer-events-none'>
            <Scene
              position={position}
              rotation={rotation}
              cameraPosition={cameraPosition}
              cameraLookAt={cameraLookAt}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
      <div className='absolute inset-0 z-10' style={{pointerEvents: "auto"}}></div>
    </div>
  );
};

export default GearScene;
