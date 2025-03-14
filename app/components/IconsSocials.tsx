import React from "react";
import {FaGithub, FaRegEnvelope, FaInstagram} from "react-icons/fa";

const IconsSocials = () => {
  return (
    <div className=' flex space-x-4 z-20'>
      <a
        href='https://github.com/Dewciak/portfolio'
        target='blank'
        className='social-Icon relative cursor-pointer text-MylightGray hover:text-white '
      >
        <FaGithub size={30} className='hover:text-white' aria-label='GitHub' />
      </a>
      <a
        href='mailto:wiktorskid@wp.pl'
        target='blank'
        className='social-Icon relative cursor-pointer text-MylightGray hover:text-white'
      >
        <FaRegEnvelope size={30} className='hover:text-white' aria-label='Email' />
      </a>
      <a
        href='https://www.instagram.com/wdawido/'
        target='blank'
        className='social-Icon relative cursor-pointer text-MylightGray hover:text-white'
      >
        <FaInstagram size={30} className='hover:text-white' aria-label='Instagram' />
      </a>
    </div>
  );
};

export default IconsSocials;
