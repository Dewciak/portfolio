"use client";
import React, {useState} from "react";
import {LuGamepad} from "react-icons/lu";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <div className='py-10 flex items-center justify-between w-[90%] mx-auto'>
      <div className='flex items-center space-x-4 font-thin'>
        <div id='ping-dot' />
        <h2>OPEN FOR WORK</h2>
      </div>
      <ul className='flex space-x-10  justify-center items-center text-xl'>
        <li className='text-ForegroundColor'>Home</li>
        <li>
          <a href='#About'>About</a>
        </li>
        <li>
          <a href='#Tech'>Tech</a>
        </li>
        <li>
          <a href='#Works'>Works</a>
        </li>
        <li>
          <a href='#Resume'>Resume</a>
        </li>
        <li>
          <a href='#Contact'>Contact</a>
        </li>
      </ul>
      <div className='flex space-x-2 text-MylightGray items-center font-thin '>
        <h2>GAME MODE</h2>
        <LuGamepad size={30} />
      </div>
    </div>
  );
};

export default Navbar;
