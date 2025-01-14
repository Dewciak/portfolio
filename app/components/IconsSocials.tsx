import React from "react";
import {FaGithub, FaRegEnvelope, FaInstagram} from "react-icons/fa";

const IconsSocials = () => {
  return (
    <div className=' flex space-x-4'>
      <div className='social-Icon relative cursor-pointer text-MylightGray hover:text-white'>
        <FaGithub size={30} className='hover:text-white' />
      </div>
      <div className='social-Icon relative cursor-pointer text-MylightGray hover:text-white'>
        <FaRegEnvelope size={30} className='hover:text-white' />
      </div>
      <div className='social-Icon relative cursor-pointer text-MylightGray hover:text-white'>
        <FaInstagram size={30} className='hover:text-white' />
      </div>
    </div>
  );
};

export default IconsSocials;
