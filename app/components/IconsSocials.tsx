import React from "react";
import {FaGithub, FaRegEnvelope, FaInstagram} from "react-icons/fa";

const IconsSocials = () => {
  return (
    <div className=' flex space-x-4 z-20'>
      <a
        href='https://github.com/Dewciak'
        target='blank'
        className='social-Icon relative cursor-pointer text-MylightGray hover:text-white '
      >
        <FaGithub size={30} className='hover:text-white' />
      </a>
      <a
        href='mailto:wiktorskid@wp.pl'
        target='blank'
        className='social-Icon relative cursor-pointer text-MylightGray hover:text-white'
      >
        <FaRegEnvelope size={30} className='hover:text-white' />
      </a>
      <a
        href='https://www.instagram.com/wdawido/'
        target='blank'
        className='social-Icon relative cursor-pointer text-MylightGray hover:text-white'
      >
        <FaInstagram size={30} className='hover:text-white' />
      </a>
    </div>
  );
};

export default IconsSocials;
