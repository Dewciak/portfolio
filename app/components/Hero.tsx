"use client";
import React, {useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";

import {CV_URL} from "@/app/lib/links";
import {useTranslations} from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import CtaBtn from "./CtaBtn";
import handleModeChange from "./HandleModeChange";
import useObserver from "./hooks/useObserver";

const HeroScene = dynamic(() => import("./HeroScene"), {ssr: false});

interface Props {
  gameMode: boolean;
}

const Hero = ({gameMode}: Props) => {
  const t = useTranslations("hero");
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(false);
  // State for tracking visibility of the scene to remove it from the dom when not visible
  const [sceneAllowed, setSceneAllowed] = useState<boolean>(false);
  // Gate that keeps the WebGL bundle off the critical path until the browser is idle
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

  // Defer the 3D scene until after first paint so it never competes for LCP.
  useEffect(() => {
    const allow = () => setSceneAllowed(true);

    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(allow, {timeout: 2500});
      return () => window.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(allow, 1200);
    return () => window.clearTimeout(timer);
  }, []);

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
      className='relative mx-auto flex w-full flex-col-reverse overflow-visible px-6 md:max-w-[1200px] md:flex-row 2xl:max-w-[1300px]'
    >
      <div className='z-20 flex w-full flex-col items-center justify-center md:h-[700px] md:w-[48%] md:translate-y-5 md:self-start md:items-start 2xl:h-[800px] 2xl:w-[42%]'>
        <h1 className='text-center text-5xl font-[500] md:text-left md:text-7xl'>
          <span className='block'>{t("titleLine1")}</span>
          <span className='block'>{t("titleLine2")}</span>
        </h1>

        <h2 className='mt-4 max-w-[520px] text-balance text-center text-2xl font-normal text-gray-300 md:text-left'>
          {t("subtitle")}
        </h2>
        <h3 className='mt-4 max-w-[500px] text-pretty text-center text-xl font-thin text-MylightGray md:text-left'>
          {t("tagline")}
        </h3>
        <div className='flex space-x-10 mt-6 items-center  justify-center md:justify-start '>
          <CtaBtn text={t("ctaPortfolio")} />
          <Link
            href={CV_URL}
            target='_blank'
            rel='noreferrer'
            className='font-bold cursor-pointer hover flex items-center justify-center group hover:text-white duration-300 text-TextColor'
          >
            {t("openCv")}{" "}
            <div className='ml-2 group-hover:ml-4 duration-300'>
              <FaArrowRight />
            </div>
          </Link>
        </div>
      </div>
      <div className='Scene relative mt-16 flex h-[500px] w-full items-center justify-center overflow-hidden pointer-events-none md:absolute md:bottom-[-24%] md:left-[calc(50%_-_50vw)] md:top-[-6%] md:mt-0 md:h-auto md:w-[130vw] md:overflow-visible'>
        {isHeroVisible && sceneAllowed && (
          <HeroScene rotation={roomRotation} position={roomPosition} cameraLookAt={cameraLookAt} gameMode={gameMode} />
        )}
      </div>
    </section>
  );
};

export default Hero;
