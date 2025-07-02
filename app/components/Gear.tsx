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
import {FaLaptopCode} from "react-icons/fa";

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
      setCameraPosition([0, 3, -17]);
      setCameraLookAt([0, 0, -1]);
    }
  }, [gameMode]);
  // Setting the camera position based on the game mode

  return (
    <section
      ref={GearRef}
      id='Gear'
      className='max-w-[1250px] mx-auto flex pt-10 lg:pt-44  flex-col px-6 overflow-hidden '
    >
      <div className='flex justify-between   items-center'>
        <div className='flex justify-between w-full'>
          <div className='flex space-x-4 items-center  '>
            <FaLaptopCode size={30} />
            <h2 className='text-3xl font-bold'>
              {gameMode ? "My sweet" : "My code"} {gameMode ? "kingdom" : "environment"}
            </h2>
          </div>

          <div className='flex space-x-10  text-2xl lg:text-xl z-10  items-center mr-2'>
            <Link
              role='button'
              href='?gameMode=Off'
              scroll={false}
              className={`duration-150 z-10 font-bold   ${gameMode ? "text-[#636363]" : "text-[#ae29d6]"}`}
              tabIndex={0}
            >
              <strong>Code setup</strong>
            </Link>
            <Link
              role='button'
              href='?gameMode=On'
              scroll={false}
              className={`duration-150 font-bold z-10    ${gameMode ? "text-[#ae29d6]" : "text-[#636363]"}`}
              tabIndex={1}
            >
              {!gameMode ? <p>Game setup</p> : <span>Game setup</span>}
            </Link>
          </div>
        </div>

        {/* <Image
          src={Samurai}
          alt=''
          loading='lazy'
          className={`Samurai absolute lg:size-[300px] object-cover  lg:top-[-150px] top-[-150px]  size-[250px]    rotate-12 transition-opacity duration-150 right-[-150px] md:right-[0px]  ${
            gameMode ? "opacity-100" : "opacity-0"
          }`}
        /> */}
        {/* Samurai picture visible only on game mode */}
      </div>

      <div className='relative flex flex-col-reverse lg:flex-row justify-between items-center mt-8 '>
        <div className='w-full lg:w-[500px] z-10 mt-12 '>
          <div className='flex flex-col  justify-center items-start space-y-6 mt-0'>
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
        <div className=' w-[95%] absolute lg:w-[650px]   h-[400px] lg:h-[700px] -right-24  flex  items-start  mt-0   justify-center '>
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
      className=' flex space-x-6 bg-[#2c2c394c] backdrop-blur-xl rounded-[20px] items-start w-full'
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
      <div className='flex flex-col  px-6 pb-6 space-y-0'>
        <div className='flex justify-between items-center '>
          <p>{title}</p>
          <div className=' size-[55px] p-1  '>
            {/* <Image src={icon} alt='' className='opacity-[0.6] object-cover ' loading='lazy' /> */}
          </div>
        </div>

        <p className='text-[#848484]'>{description}</p>
      </div>
    </motion.div>
  );
};
