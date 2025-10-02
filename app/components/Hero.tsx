"use client";
import React, {useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";

import dynamic from "next/dynamic";
import Link from "next/link";
import CtaBtn from "./CtaBtn";
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
    <section
      ref={heroRef}
      id='Home'
      className=' relative overflow-hidden flex flex-col-reverse md:flex-row md:max-w-[1200px] 2xl:max-w-[1300px] mx-auto px-6 '
    >
      <div className='w-full md:w-[50%] 2xl:w-[40%] flex flex-col justify-center items-center md:items-start z-20 '>
        <h1 className='text-6xl md:text-7xl font-[500] text-center md:text-left'>Frontend</h1>
        <h1 className='text-6xl md:text-7xl font-[500] text-center md:text-left'>
          {/* <span>{gameMode ? "Driven" : "Frontend"}</span> {gameMode ? "gamer." : "dev."} */}
          <span>Developer</span>
        </h1>

        <h2 className='text-2xl text-gray-300 font-normal max-w-[500px] mt-4 text-center md:text-left'>
          Hi, I’m Wiktor - specializing in React&nbsp;/&nbsp;Next.js
        </h2>
        <h3 className='text-xl text-MylightGray font-thin max-w-[500px] mt-4 text-center md:text-left'>
          Crafting modern, responsive interfaces with a focus on performance and user experience.
        </h3>
        <div className='flex space-x-10 mt-6 items-center  justify-center md:justify-start '>
          <CtaBtn text='Portfolio' />
          {/* <CtaBtn text='Contact' /> */}
          <Link
            href={"https://docs.google.com/document/d/1EYLU0Js3A6Ty38V0ynXZbpGybL-jv2vckIot6LakuVQ/edit?usp=sharing"}
            target='blank'
            className='font-bold cursor-pointer hover flex items-center justify-center group hover:text-white duration-300 text-TextColor'
          >
            Open CV{" "}
            <div className='ml-2 group-hover:ml-4 duration-300'>
              <FaArrowRight />
            </div>
          </Link>
        </div>
      </div>
      <div className='Scene w-full md:w-[50%] md:h-[700px] 2xl:h-[800px] 2xl:w-[60%] hover:scale-105 duration-300   h-[500px] pointer-events-none  overflow-hidden mt-16 md:mt-0  flex items-center justify-center'>
        {isHeroVisible && (
          <HeroScene rotation={roomRotation} position={roomPosition} cameraLookAt={cameraLookAt} gameMode={gameMode} />
        )}
      </div>
    </section>
  );
};

export default Hero;
