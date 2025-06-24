import React, {useEffect, useState} from "react";
import {FaGithub, FaRegEnvelope, FaLinkedinIn} from "react-icons/fa";

const IconsSocials = () => {
  const [docked, setDocked] = useState(false); // true = schowany
  const [hover, setHover] = useState(false); // true = kursor nad paskiem

  /* --- 1. Reagujemy na scroll --- */
  useEffect(() => {
    const handleScroll = () => setDocked(window.scrollY >= 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --- 2. Wyliczamy przesunięcie --- */
  const shift =
    docked && !hover // schowany + brak hovera
      ? "translateX(calc(100% - 20px))" // zostaw 40 px widoczne
      : "translateX(0)"; // pełna widoczność

  return (
    <div
      /* obsługa hovera */
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      /* przesunięcie + płynne przejście */
      style={{transform: shift}}
      className='fixed top-[45%] right-0 z-20 flex flex-col space-y-4
                 px-4 border-l-4 border-white transition-transform
                 duration-300 ease-in-out pointer-events-auto'
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
