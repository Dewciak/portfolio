import React, {Suspense} from "react";
import {FaGithub} from "react-icons/fa";
import {FaRegEnvelope} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import Spline from "@splinetool/react-spline/next";
import IconsSocials from "./IconsSocials";

const Hero = () => {
  return (
    <section id='Home' className='flex flex-col 2xl:flex-row max-w-[1300px] mx-auto'>
      <div className='w-[40%] flex flex-col justify-start items-start '>
        <div className='space-y-4'>
          <div className='mt-64 '>
            <h1>
              I'm <span>Wiktor</span>,
            </h1>
            <h1>
              <span>Frontend</span> dev.
            </h1>
          </div>
          <h1 className='text-xl text-MylightGray font-thin max-w-[400px]'>
            I solve problems and make things happen, all with a few keystrokes.
          </h1>
          <IconsSocials />
        </div>
      </div>
      <div className='w-[60%] h-[1000px] flex'>
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene='https://prod.spline.design/DHrmA9O3FtjyXCnz/scene.splinecode' />
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;
