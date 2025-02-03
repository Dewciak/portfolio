"use client";
import React, {useEffect, useState} from "react";

import {Canvas} from "@react-three/fiber";
import IconsSocials from "./IconsSocials";
import OpenForWork from "./OpenForWork";

import dynamic from "next/dynamic";
import handleModeChange from "./HandleModeChange";
import useObserver from "./hooks/useObserver";

const Scene = dynamic(() => import("./Scene"), {ssr: false});

interface Props {
  gameMode: boolean;
}

const Hero = ({gameMode}: Props) => {
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(false);
  const [roomPosition, setRoomPosition] = useState<number[]>([0, 0, 0]);
  const [roomRotation, setRoomRotation] = useState<number[]>([0, 0, 0]);
  const [cameraLookAt, setCameraLookAt] = useState<number[]>([0, 0, 0]);
  const [gameRoom, setGameRoom] = useState<boolean>(false);
  const heroRef = React.useRef<HTMLDivElement>(null);

  const Observer = useObserver({
    visibilityRef: heroRef,
    setIsVisible: setIsHeroVisible,
    isVisible: isHeroVisible,
  });

  const toggleGameMode = () => {
    handleModeChange({
      setGameRoom: setGameRoom,
      gameMode: gameMode,
      roomPosition: roomPosition,
      roomRotation: roomRotation,
      setRoomPosition: setRoomPosition,
      setRoomRotation: setRoomRotation,
    });
  };

  useEffect(() => {
    toggleGameMode();
  }, [gameMode]);

  return (
    <section ref={heroRef} id='Home' className='flex flex-col-reverse lg:flex-row max-w-[1300px] mx-auto px-6'>
      <div className='absolute top-12 left-6 lg:hidden'>
        <OpenForWork gameMode={gameMode} />
      </div>

      <div className='w-full lg:w-[40%] flex flex-col justify-center items-start z-20'>
        <div className='space-y-4 '>
          <div className='  '>
            <h1 className='text-5xl lg:text-6xl font-bold'>
              I&apos;m <span>Wiktor</span>,
            </h1>
            <h1 className='text-5xl lg:text-6xl font-bold'>
              <span>{gameMode ? "Driven" : "Frontend"}</span> {gameMode ? "gamer." : "dev."}
            </h1>
          </div>
          <h1 className='text-xl text-MylightGray font-thin max-w-[400px] '>
            I solve problems and make things happen, all with a few keystrokes.
          </h1>
          <IconsSocials />
        </div>
      </div>
      <div className='w-full lg:w-[60%] lg:h-[1000px]  h-[500px] pointer-events-none  overflow-hidden mt-16 lg:mt-0  flex items-center justify-center'>
        {isHeroVisible && (
          <>
            <Canvas camera={{fov: 90, zoom: 3}} className=' pointer-events-none '>
              <Scene
                position={roomPosition}
                rotation={roomRotation}
                cameraPosition={[0, 3, -9]}
                cameraLookAt={cameraLookAt}
              />
            </Canvas>
            <div className='absolute inset-0 z-10 ' style={{pointerEvents: "auto"}}></div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
