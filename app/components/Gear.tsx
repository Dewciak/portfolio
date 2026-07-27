"use client";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {FaLaptopCode} from "react-icons/fa";
import handleModeChange from "./HandleModeChange";
import useObserver from "./hooks/useObserver";

const GearScene = dynamic(() => import("./GearScene"), {ssr: false});
// Dynamic import for 3d scene

const WORK_GEAR = ["macbook", "monitor", "desk"] as const;
const GAME_GEAR = ["pc", "ps5", "tv"] as const;

const Gear = ({gameMode}: {gameMode: boolean}) => {
  const t = useTranslations("gear");
  const [isGearVisible, setIsGearVisible] = useState<boolean>(false);
  // State for tracking visibility of the scene to remove it from the dom when not visible
  const [sceneAllowed, setSceneAllowed] = useState<boolean>(false);
  // Same idle gate as the hero — keeps the WebGL bundle off the critical path
  const [sceneReferenceHeight, setSceneReferenceHeight] = useState<number>(700);
  // On-screen model size scales with zoomFactor × this value, so a smaller
  // reference on phones shrinks the room instead of just cropping it.
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

  useEffect(() => {
    const allow = () => setSceneAllowed(true);

    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(allow, {timeout: 2500});
      return () => window.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(allow, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const syncReferenceHeight = () => setSceneReferenceHeight(window.innerWidth >= 768 ? 700 : 340);

    syncReferenceHeight();
    window.addEventListener("resize", syncReferenceHeight, {passive: true});
    return () => window.removeEventListener("resize", syncReferenceHeight);
  }, []);

  const selectedGear = gameMode ? GAME_GEAR : WORK_GEAR;
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
      className='relative mx-auto flex max-w-[1250px] flex-col overflow-hidden px-6 pt-28 sm:pt-44 lg:overflow-visible'
    >
      <div className='flex justify-between   items-center'>
        <div className='flex lg:justify-between w-full flex-col lg:flex-row justify-center items-center space-y-6'>
          <div className='flex lg:space-x-4 items-center  '>
            <FaLaptopCode size={30} className='hidden lg:block' />
            <h2 className='text-3xl font-bold'>{gameMode ? t("headingGame") : t("headingWork")}</h2>
          </div>

          <div className='z-10 mr-2 flex items-center space-x-6 text-sm sm:space-x-10 sm:text-xl'>
            <Link
              role='button'
              href='?gameMode=Off'
              scroll={false}
              className={`duration-150 z-10 font-bold ${gameMode ? "text-[#636363]" : "text-[var(--theme-accent-end)]"}`}
              tabIndex={0}
            >
              <strong>{t("codeSetup")}</strong>
            </Link>
            <Link
              role='button'
              href='?gameMode=On'
              scroll={false}
              className={`duration-150 font-bold z-10 ${gameMode ? "text-[var(--theme-accent-end)]" : "text-[#636363]"}`}
              tabIndex={1}
            >
              {!gameMode ? <p>{t("gameSetup")}</p> : <span>{t("gameSetup")}</span>}
            </Link>
          </div>
        </div>
      </div>

      <div className='relative flex flex-col-reverse lg:flex-row justify-between items-center mt-8 '>
        <div className=' xl:w-[500px] lg:w-[400px] w-full max-w-[550px] z-20 mt-12 '>
          <div className='flex flex-col  justify-center items-start space-y-6 mt-0'>
            {selectedGear.map((gearId, index) => (
              <GearItem
                key={gearId}
                title={t(`items.${gearId}.name`)}
                description={t(`items.${gearId}.description`)}
                animationDelay={index * 100}
              />
            ))}
          </div>
        </div>
        {/* The canvas box is wider than the room needs and is allowed to bleed past
            the 1250px column, so the model is never cropped by its own edges.
            zoomFactor/referenceViewportHeight keep its on-screen size unchanged. */}
        <div className='Scene pointer-events-none relative z-0 mt-0 flex h-[300px] w-full items-center justify-center overflow-hidden md:h-[700px] md:w-[650px] md:items-start lg:absolute lg:-right-40 lg:h-[780px] lg:w-[1000px] lg:overflow-visible'>
          {isGearVisible && sceneAllowed && (
            <GearScene
              rotation={roomRotation}
              position={roomPosition}
              cameraLookAt={cameraLookAt}
              cameraPosition={cameraPosition}
              aria-label='3d gear scene'
              gameMode={gameRoom}
              referenceViewportHeight={sceneReferenceHeight}
              zoomFactor={7}
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
  animationDelay: number;
}

const GearItem = ({title, description, animationDelay}: GearItemProps) => {
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
