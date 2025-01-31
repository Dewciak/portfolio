"use client";
import React, {Suspense, useState, useEffect} from "react";

import Spline from "@splinetool/react-spline/next";
import IconsSocials from "./IconsSocials";
import OpenForWork from "./OpenForWork";
import {Canvas} from "@react-three/fiber";
// import Scene from "./Scene";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {ssr: false});

interface Props {
  gameMode: boolean;
}

const Hero = ({gameMode}: Props) => {
  const [roomPosition, setRoomPosition] = useState<number[]>([0, 0, 0]);
  const [roomRotation, setRoomRotation] = useState<number[]>([0, 0, 0]);
  const [gameRoom, setGameRoom] = useState<boolean>(false);

  function animateNumbers(
    target: number[],
    current: number[],
    duration: number = 1000,
    callback: (values: number[]) => void
  ): void {
    const steps: number = 60;
    const increments: number[] = target.map((value, i) => (value - current[i]) / steps);

    let count: number = 0;

    const step = (): void => {
      if (count >= steps) {
        callback(target); // Zakończenie animacji
        return;
      }
      current = current.map((val, i) => val + increments[i]);
      callback([...current]);
      count++;
      requestAnimationFrame(step);
    };

    step();
  }

  const handleModeChange = () => {
    if (gameMode) {
      animateNumbers([5.5, 0, 4], roomPosition, 1000, setRoomPosition);
      animateNumbers([0, 4.8, 0], roomRotation, 1000, setRoomRotation);
      setGameRoom(true);
    } else {
      animateNumbers([0, 0, 0], roomPosition, 1000, setRoomPosition);
      animateNumbers([0, 0, 0], roomRotation, 1000, setRoomRotation);
      setGameRoom(false);
    }
  };

  useEffect(() => {
    handleModeChange();
  }, [gameMode]);

  return (
    <section id='Home' className='flex flex-col-reverse lg:flex-row max-w-[1300px] mx-auto px-6'>
      <div className='absolute top-12 left-6 lg:hidden'>
        <OpenForWork gameMode={gameMode} />
      </div>

      <div className='w-full lg:w-[40%] flex flex-col justify-center items-start '>
        <div className='space-y-4 '>
          <div className='  '>
            <h1 className='text-5xl lg:text-6xl font-bold'>
              I&apos;m <span>Wiktor</span>,
            </h1>
            <h1 className='text-5xl lg:text-6xl font-bold'>
              <span>{gameMode ? "Driven" : "Frontend"}</span> {gameMode ? "gamer." : "dev."}
            </h1>
          </div>
          <h1 className='text-xl text-MylightGray font-thin max-w-[400px]'>
            I solve problems and make things happen, all with a few keystrokes.
          </h1>
          <IconsSocials />
        </div>
      </div>
      <div className='w-full lg:w-[60%] lg:h-[1000px]  h-[500px]   overflow-hidden mt-16 lg:mt-0  flex items-center justify-center'>
        <Canvas camera={{position: [-1, 3, -9], fov: 90, zoom: 3}}>
          <Scene position={roomPosition} rotation={roomRotation} />
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
