"use client";
import React, {useEffect, useState} from "react";

import IconsSocials from "./IconsSocials";
import OpenForWork from "./OpenForWork";

import dynamic from "next/dynamic";
import handleModeChange from "./HandleModeChange";
import useObserver from "./hooks/useObserver";

const HeroScene = dynamic(() => import("./HeroScene"), {ssr: true});

interface Props {
  gameMode: boolean;
}

const Hero = ({gameMode}: Props) => {
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(false);
  // State for tracking visibility of the scene to remove it from the dom when not visible
  const [roomPosition, setRoomPosition] = useState<number[]>([0, 0, 0]);
  const [roomRotation, setRoomRotation] = useState<number[]>([0, 0, 0]);
  const [cameraLookAt, setCameraLookAt] = useState<number[]>([0, 0, 0]);
  // 3d scene position and camera position for proper view
  const [gameRoom, setGameRoom] = useState<boolean>(false);
  // State for tracking the room mode
  const heroRef = React.useRef<HTMLDivElement>(null);
  // Ref for the hero section

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
  // Function to toggle the game room based on the game mode

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
          <h2 className='text-xl text-MylightGray font-thin max-w-[400px] '>
            {gameMode
              ? "I overcome missions and secure victories, all with a few clicks of the gamepad "
              : "I solve problems and make things happen, all with a few keystrokes."}
          </h2>
          <IconsSocials />
        </div>
      </div>
      <div className='w-full lg:w-[60%] lg:h-[1000px]  h-[500px] pointer-events-none  overflow-hidden mt-16 lg:mt-0  flex items-center justify-center'>
        {isHeroVisible && (
          <HeroScene rotation={roomRotation} position={roomPosition} cameraLookAt={cameraLookAt} gameMode={gameMode} />
        )}
      </div>
    </section>
  );
};

export default Hero;
