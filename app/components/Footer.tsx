import React from "react";
import IconsSocials from "./IconsSocials";
import axios from "axios";

const Footer = () => {
  return (
    <footer id='Contact' className=' w-full flex border-t-[1px] border-[#A8A8A8] mt-44'>
      <div className='max-w-[1300px] flex flex-col mx-auto py-24 w-full'>
        <div className='flex flex-row justify-between items-center max-w-[100%] '>
          <p className='font-bold text-6xl'>
            <span>Let&apos;s</span> connect.
          </p>
          <IconsSocials />
        </div>
        <p className='mr-auto mt-6 font-medium text-xl'>wiktorskid@wp.pl</p>
        <div className='mx-auto flex flex-col'>
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
