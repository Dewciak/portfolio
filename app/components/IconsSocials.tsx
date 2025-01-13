import React from "react";
import {FaGithub, FaRegEnvelope, FaInstagram} from "react-icons/fa";

const IconsSocials = () => {
  return (
    <div className='flex space-x-4'>
      <FaGithub size={30} color='#b0adac' />
      <FaRegEnvelope size={30} color='#b0adac' />
      <FaInstagram size={30} color='#b0adac' />
    </div>
  );
};

export default IconsSocials;
