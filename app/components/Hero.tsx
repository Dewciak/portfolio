import React, {Suspense} from "react";

import Spline from "@splinetool/react-spline/next";
import IconsSocials from "./IconsSocials";

const Hero = () => {
  return (
    <section id='Home' className='flex flex-col lg:flex-row max-w-[1300px] mx-auto'>
      <div className='w-full lg:w-[40%] flex flex-col justify-start items-start '>
        <div className='space-y-4'>
          <div className='mt-64 '>
            <h1>
              I&apos;m <span>Wiktor</span>,
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
      {/* <div className='w-[60%] h-[1000px] flex overflow-hidden'>
        <Spline scene='https://prod.spline.design/DHrmA9O3FtjyXCnz/scene.splinecode' />
      </div> */}
    </section>
  );
};

export default Hero;
