import React from "react";
import {FaGithub, FaRegEnvelope, FaLinkedinIn} from "react-icons/fa";

const IconsSocials = () => {
  return (
    <div className=' flex space-y-4 z-20 flex-col bg-white p-4'>
      <a
        href='https://github.com/Dewciak/portfolio'
        target='blank'
        className='social-Icon relative cursor-pointer text-black hover:text-white '
      >
        <FaGithub size={30} className='hover:text-white' aria-label='GitHub' />
      </a>
      <a
        href='mailto:wiktorskid@wp.pl'
        target='blank'
        className='social-Icon relative cursor-pointer text-black hover:text-white'
      >
        <FaRegEnvelope size={30} className='hover:text-white' aria-label='Email' />
      </a>
      <a
        href='https://www.linkedin.com/in/wiktor-dawid-9145a2355?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
        target='blank'
        className='social-Icon relative cursor-pointer text-black hover:text-white'
      >
        <FaLinkedinIn size={30} className='hover:text-white' aria-label='Instagram' />
      </a>
    </div>
  );
};

export default IconsSocials;
