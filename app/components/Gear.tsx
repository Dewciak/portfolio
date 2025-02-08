"use client";
import dynamic from "next/dynamic";
import Image, {StaticImageData} from "next/image";
import React, {useEffect, useState} from "react";

const GearScene = dynamic(() => import("./GearScene"), {ssr: true});

import Samurai from "@/public/images/Samurai.png";
import {Canvas} from "@react-three/fiber";
import Link from "next/link";
import {getIcon} from "./getIcon";
import handleModeChange from "./HandleModeChange";
import useObserver from "./hooks/useObserver";
import GearDataJson from "./textContent/Gear.json";
import {motion} from "framer-motion";

const Gear = ({gameMode}: {gameMode: boolean}) => {
  const [isGearVisible, setIsGearVisible] = useState<boolean>(false);
  const [roomPosition, setRoomPosition] = useState<number[]>([0, 0, 0]);
  const [roomRotation, setRoomRotation] = useState<number[]>([0, 0, 0]);
  const [cameraLookAt, setCameraLookAt] = useState<number[]>([0, 0, 0]);
  const [cameraPosition, setCameraPosition] = useState<number[]>([0, 1, -15]);
  const [gameRoom, setGameRoom] = useState<boolean>(false);
  const GearRef = React.useRef<HTMLDivElement>(null);
  const selectedGear = gameMode ? GearDataJson.gameModeOn : GearDataJson.gameModeOff;

  const Observer = useObserver({visibilityRef: GearRef, setIsVisible: setIsGearVisible, isVisible: isGearVisible});

  const toggleGameMode = () => {
    handleModeChange({
      setGameRoom: setGameRoom,
      gameMode: gameMode,
      roomPosition: roomPosition,
      roomRotation: roomRotation,
      setRoomPosition: setRoomPosition,
      setRoomRotation: setRoomRotation,
      gear: true,
    });
  };
  useEffect(() => {
    toggleGameMode();
    if (gameMode) {
      setCameraPosition([-13, 2, -10]);
      setCameraLookAt([0, -3, 0]);
    } else {
      setCameraPosition([0, 1, -12]);
      setCameraLookAt([0, 0, 0]);
    }
  }, [gameMode]);

  return (
    <section
      ref={GearRef}
      id='Gear'
      className='max-w-[1300px] mx-auto flex pt-40 lg:mt-48 flex-col px-6 overflow-hidden '
    >
      <div className='flex justify-between relative '>
        <h1>
          {gameMode ? "My sweet" : "My code"} <span>{gameMode ? "kingdom" : "environment"}</span>
        </h1>

        <Image
          src={Samurai}
          alt='Samurai picture'
          loading='lazy'
          className={`Samurai absolute lg:size-[370px] object-cover  lg:top-[-200px] top-[-160px] size-[300px]    rotate-12 transition-opacity duration-150 right-[-180px]  ${
            gameMode ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className='flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-[50%] mt-8'>
          <div className='flex space-x-10 py-16 text-2xl lg:text-3xl'>
            <Link
              href='?gameMode=Off'
              scroll={false}
              className={`duration-150 font-bold ${gameMode ? "text-[#636363]" : ""}`}
            >
              Code setup
            </Link>
            <Link
              href='?gameMode=On'
              scroll={false}
              className={`duration-150 font-bold ${gameMode ? "" : "text-[#636363]"}`}
            >
              Game setup
            </Link>
          </div>
          <div className='flex flex-col  justify-center items-start space-y-12'>
            {selectedGear.map((gear, key) => (
              <GearItem
                key={key}
                title={gear.name}
                description={gear.description}
                icon={getIcon(gear.icon)!}
                animationDelay={key * 100}
              />
            ))}
          </div>
        </div>
        <div className='lg:w-[50%] w-[95%] mx-auto  h-[400px] lg:h-auto flex items-center  mt-0  justify-center'>
          {isGearVisible && (
            <GearScene
              rotation={roomRotation}
              position={roomPosition}
              cameraLookAt={cameraLookAt}
              cameraPosition={cameraPosition}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Gear;

interface GearItemProps {
  title: string;
  description: string;
  icon: StaticImageData;
  animationDelay: number;
  isVisible?: boolean;
}

const GearItem = ({title, description, icon, animationDelay, isVisible}: GearItemProps) => {
  return (
    <motion.div
      className=' flex space-x-6'
      style={{animationDelay: `${animationDelay}ms`}}
      initial={{opacity: 0, x: -200}}
      whileInView={{opacity: 1, x: 0}}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: animationDelay / 1000,
      }}
      viewport={{once: true}}
    >
      <div className='rounded-full bg-[#191919] size-[64px] p-1'>
        <Image src={icon} alt='laptop' className='opacity-[0.6] object-cover ' loading='lazy' />
      </div>
      <div className='flex flex-col max-w-[70%]'>
        <p>{title}</p>
        <p className='text-[#848484]'>{description}</p>
      </div>
    </motion.div>
  );
};
