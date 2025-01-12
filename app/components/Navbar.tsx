"use client";
import React, {useState} from "react";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <div className='py-10 flex items-center justify-between w-[90%] mx-auto'>
      <div className='flex items-center space-x-4 font-thin'>
        <div id='ping-dot' />
        <h1>OPEN FOR WORK</h1>
      </div>
      <ul className='flex space-x-10  justify-center items-center text-xl'>
        <li className='text-ForegroundColor'>Home</li>
        <li>About</li>
        <li>Tech</li>
        <li>Projects</li>
        <li>Contact</li>
      </ul>
      <div className='flex space-x-4 text-MylightGray'>
        <h1>GAME MODE</h1>
      </div>
    </div>
  );
};

export default Navbar;
