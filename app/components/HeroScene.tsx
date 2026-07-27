import GameImage from "@/public/images/GearNoWebGlGame.png";
import WorkImage from "@/public/images/HeroNoWebGl.png";
import {Canvas} from "@react-three/fiber";
import Image from "next/image";
import {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {ErrorBoundary} from "react-error-boundary";
import Scene from "./Scene";

interface Props {
  position: number[];
  rotation: number[];
  cameraLookAt: number[];
  gameMode?: boolean;
}

const HeroScene = ({position, rotation, cameraLookAt, gameMode}: Props) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [renderError, setRenderError] = useState<boolean>(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [referenceViewportHeight, setReferenceViewportHeight] = useState(700);
  const canvasRef = useRef<HTMLDivElement>(null);

  const notifyReady = useCallback(() => {
    setSceneReady(true);
    window.dispatchEvent(new Event("portfolio:hero-ready"));
  }, []);

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

  useEffect(() => {
    if (webGLSupported === false || renderError) notifyReady();
  }, [notifyReady, renderError, webGLSupported]);

  useEffect(() => {
    const syncReferenceHeight = () => {
      if (window.innerWidth >= 1536) setReferenceViewportHeight(800);
      else if (window.innerWidth >= 768) setReferenceViewportHeight(700);
      else setReferenceViewportHeight(500);
    };

    syncReferenceHeight();
    window.addEventListener("resize", syncReferenceHeight, {passive: true});
    return () => window.removeEventListener("resize", syncReferenceHeight);
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
    return <div className='h-full w-full' aria-hidden='true' />;
  }

  return (
    <div
      className={`relative flex h-full w-full transition-opacity duration-500 ${sceneReady ? "opacity-100" : "opacity-0"}`}
      ref={canvasRef}
    >
      <ErrorBoundary FallbackComponent={FallbackImage} onError={handleRenderError}>
        <Suspense fallback={null}>
          <Canvas camera={{fov: 90, zoom: 3}} className='pointer-events-none'>
            <Scene
              position={position}
              rotation={rotation}
              cameraPosition={[0, 3, -9]}
              cameraLookAt={cameraLookAt}
              onReady={notifyReady}
              referenceViewportHeight={referenceViewportHeight}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
      <div className='absolute inset-0 z-10' style={{pointerEvents: "auto"}}></div>
    </div>
  );
};

export default HeroScene;
