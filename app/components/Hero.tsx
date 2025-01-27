"use client";
import React, {Suspense} from "react";

import Spline from "@splinetool/react-spline/next";
import IconsSocials from "./IconsSocials";
import OpenForWork from "./OpenForWork";
import {Canvas} from "@react-three/fiber";
import Scene from "./Scene";

interface Props {
  gameMode: boolean;
}

const Hero = ({gameMode}: Props) => {
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
      <div className='w-full lg:w-[60%] lg:h-[1000px] h-[500px]  overflow-hidden mt-16 lg:mt-0  flex items-center justify-center'>
        {/* <Scene /> */}
      </div>
    </section>
  );
};

export default Hero;
