"use client";
import React, {useEffect, useState} from "react";
import {FaGithub, FaRegEnvelope, FaLinkedinIn} from "react-icons/fa";

const IconsSocials = () => {
  const [docked, setDocked] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => setDocked(window.scrollY >= 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shift = docked && !hover ? "translateX(calc(100% - 20px))" : "translateX(0)";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{transform: shift}}
      className='fixed top-[45%] right-0 z-20  flex-col space-y-4
                 px-4 border-l-4 border-white transition-transform
                 duration-300 ease-in-out pointer-events-auto hidden lg:flex'
    >
      <a
        href='https://github.com/Dewciak/portfolio'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaGithub size={30} aria-label='GitHub' />
      </a>

      <a
        href='mailto:wiktorskid@wp.pl'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaRegEnvelope size={30} aria-label='Email' />
      </a>

      <a
        href='https://www.linkedin.com/in/wiktor-dawid-9145a2355'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaLinkedinIn size={30} aria-label='LinkedIn' />
      </a>
    </div>
  );
};

export default IconsSocials;
