"use client";
import React from "react";

const CtaBtn = ({text}: {text: string}) => {
  return (
    <div className='flex flex-col'>
      <button
        className='relative px-6 py-3 bg-white text-black hover:before:top-0 hover:before:left-0 
        duration-300  border transition-all before:transition-all before:-z-10 hover:top-2 hover:left-2
         before:duration-300 font-semibold overflow-visible
         before:content-[""] before:absolute before:w-full before:h-full
        before:top-2 before:left-2 before:bg-[linear-gradient(90deg,_#5785dd_33%,_#8357da_66%,_#ae29d6_100%)] left-0 top-0 cursor-pointer'
      >
        <span className='relative z-10'>{text}</span>

        {/* Warstwa z gradientem */}
        <span
          aria-hidden='true'
          className='
          absolute inset-0 -z-10 rounded-md
          bg-gradient-to-r from-[#5785dd] via-[#8357da] to-[#ae29d6]
          transition-transform duration-300 ease-out
          translate-x-1 translate-y-1
          group-hover:translate-x-0 group-hover:translate-y-0
        '
        />
      </button>
    </div>
  );
};

export default CtaBtn;
