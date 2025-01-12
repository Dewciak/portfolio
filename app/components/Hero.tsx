import React, {Suspense} from "react";
import {FaGithub} from "react-icons/fa";
import {FaRegEnvelope} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import Spline from "@splinetool/react-spline/next";

const Hero = () => {
  return (
    <div className='flex flex-col 2xl:flex-row'>
      <div className='w-[40%] flex flex-col justify-start items-center'>
        <div className='space-y-4'>
          <div className='mt-64 text-6xl font-bold'>
            <h1>
              I'm <span>Wiktor</span>,
            </h1>
            <h1>
              <span>Frontend</span> dev.
            </h1>
          </div>
          <h1 className='text-xl text-MylightGray'>
            I solve problems and make things happen, all with a few <br />
            keystrokes.
          </h1>
          <div className='flex space-x-4'>
            <FaGithub size={30} color='#b0adac' />
            <FaRegEnvelope size={30} color='#b0adac' />
            <FaInstagram size={30} color='#b0adac' />
          </div>
        </div>
      </div>
      <div className='w-[60%] h-[1000px] flex'>
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene='https://prod.spline.design/DHrmA9O3FtjyXCnz/scene.splinecode' />
        </Suspense>
      </div>
    </div>
  );
};

export default Hero;
