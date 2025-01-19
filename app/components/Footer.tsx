import React from "react";
import IconsSocials from "./IconsSocials";
import axios from "axios";

const Footer = () => {
  return (
    <footer id='Contact' className=' w-full flex border-t-[1px] border-[#A8A8A8] lg:mt-44 mt-32'>
      <div className='max-w-[1300px] flex flex-col mx-auto lg:py-24 py-16 w-full px-6'>
        <div className='flex  lg:items-center max-w-[100%] flex-col lg:flex-row  space-y-6 lg:space-y-0 items-start justify-between '>
          <p className='font-bold text-5xl'>
            <span>Let&apos;s</span> connect.
          </p>
          <div className='flex items-center justify-between w-full lg:w-auto '>
            <IconsSocials />
            <p className='lg:hidden font-medium text-xl '>wiktorskid@wp.pl</p>
          </div>
        </div>
        <a href='mailto:wiktorskid@wp.pl' className='hidden lg:block mr-auto mt-6 font-medium text-xl no-underline '>
          wiktorskid@wp.pl
        </a>
        <div className='mx-auto flex flex-col mt-6 lg:mt-0'>
          <span className='font-rockSalt text-center text-4xl font-bold py-10 '>Wiktor</span>
          <div className='font-thin text-center text-[#A8A8A8]'>
            <p className='text-white'>Seattle, WA 1:36 AM PST  • 44.8°F</p>
            <p>Powered by Vercel, Next.js and Github.</p>
            <p>© 2025-2025 | W. Dawid</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
