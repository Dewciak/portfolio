"use client";
import Samurai from "@/public/images/Samurai.png";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {getIcon} from "./getIcon";
import handleModeChange from "./HandleModeChange";
import useObserver from "./hooks/useObserver";
import GearDataJson from "./textContent/Gear.json";

const GearScene = dynamic(() => import("./GearScene"), {ssr: true});
// Dynamic import for 3d scene

const Gear = ({gameMode}: {gameMode: boolean}) => {
  const [isGearVisible, setIsGearVisible] = useState<boolean>(false);
  // State for tracking visibility of the scene to remove it from the dom when not visible
  const [roomPosition, setRoomPosition] = useState<number[]>([0, 0, 0]);
  const [roomRotation, setRoomRotation] = useState<number[]>([0, 0, 0]);
  const [cameraLookAt, setCameraLookAt] = useState<number[]>([0, 0, 0]);
  const [cameraPosition, setCameraPosition] = useState<number[]>([0, 1, -15]);
  // 3d scene position and camera position for proper view
  const [gameRoom, setGameRoom] = useState<boolean>(false);
  // State for tracking the room mode

  const GearRef = useRef<HTMLDivElement>(null);
  const Observer = useObserver({visibilityRef: GearRef, setIsVisible: setIsGearVisible, isVisible: isGearVisible});
  // Custom hook for tracking the visibility of the scene

  const selectedGear = gameMode ? GearDataJson.gameModeOn : GearDataJson.gameModeOff;
  // Selecting the gear data based on the game mode

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
  // Function to toggle the game room based on the game mode

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
  // Setting the camera position based on the game mode

  return (
    <section
      ref={GearRef}
      id='Gear'
      className='max-w-[1300px] mx-auto flex pt-40 lg:mt-0  flex-col px-6 overflow-hidden '
    >
      <div className='flex justify-between relative '>
        <div className='flex flex-col w-full'>
          <span className='font-bold text-3xl'>Gear</span>
          <h1>
            {gameMode ? "My sweet" : "My code"} {gameMode ? "kingdom" : "environment"}
          </h1>
        </div>

        <Image
          src={Samurai}
          alt=''
          loading='lazy'
          className={`Samurai absolute lg:size-[300px] object-cover  lg:top-[-150px] top-[-150px] size-[250px]    rotate-12 transition-opacity duration-150 right-[-150px] md:right-[0px]  ${
            gameMode ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Samurai picture visible only on game mode */}
      </div>

      <div className='flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-[50%] mt-8 z-10'>
          <div className='flex space-x-10  text-2xl lg:text-3xl z-10 mt-6'>
            <Link
              role='button'
              href='?gameMode=Off'
              scroll={false}
              className={`duration-150 z-10 font-bold py-16 ${gameMode ? "text-[#636363]" : ""}`}
              tabIndex={0}
            >
              <span>Code setup</span>
            </Link>
            <Link
              role='button'
              href='?gameMode=On'
              scroll={false}
              className={`duration-150 font-bold z-10 py-16  ${gameMode ? "" : "text-[#636363]"}`}
              tabIndex={1}
            >
              {!gameMode ? <p>Game setup</p> : <span>Game setup</span>}
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
              aria-label='3d gear scene'
              gameMode={gameRoom}
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
        <Image src={icon} alt='' className='opacity-[0.6] object-cover ' loading='lazy' />
      </div>
      <div className='flex flex-col max-w-[70%]'>
        <p>{title}</p>
        <p className='text-[#848484]'>{description}</p>
      </div>
    </motion.div>
  );
};
