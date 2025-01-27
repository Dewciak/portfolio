"use client";
import React, {useEffect, useState} from "react";
import {LuGamepad} from "react-icons/lu";
import {Twirl as Hamburger} from "hamburger-react";
import {motion} from "framer-motion";

import {IoMdHome} from "react-icons/io";
import {FaCode} from "react-icons/fa6";
import {GrProjects} from "react-icons/gr";
import {SiReaddotcv} from "react-icons/si";
import {GrContact} from "react-icons/gr";
import OpenForWork from "./OpenForWork";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface NavbarProps {
  gameMode: boolean;
}

const Navbar = ({gameMode}: NavbarProps) => {
  useEffect(() => {
    document.documentElement.style.setProperty("--Foreground-Color", gameMode ? "#fb4311" : "#00e0e4");
    document.documentElement.style.setProperty("--Background-Color", gameMode ? "#000000" : "#01000e");
  }, [gameMode]);

  const [mobileNav, setMobileNav] = useState(false);
  const router = useRouter();
  return (
    <div className=' w-full fixed z-40 '>
      <div className='hidden lg:flex bg-BackgroundColor items-center justify-between w-full mx-auto py-10 px-16'>
        <OpenForWork gameMode={gameMode} />
        <ul className='flex space-x-10  justify-center items-center text-xl'>
          <li>Home</li>

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
        <Link
          scroll={false}
          href={`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`}
          className='flex space-x-4 text-gray-100 items-center justify-center font-thin '
        >
          <p className={`${gameMode ? "text-GameModeColor" : ""} hidden xl:flex`}>GAME MODE</p>
          <LuGamepad size={30} />
        </Link>
      </div>
      <div className='flex lg:hidden justify-between items-center w-full px-4 py-8'>
        <div className='flex space-x-2 ml-auto'>
          <Link
            scroll={false}
            href={`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`}
            className=' bg-slate-900 rounded-full p-3 flex items-center justify-center'
          >
            <LuGamepad size={30} />
          </Link>

          <div className=' bg-slate-900 rounded-full text-gray-100 px-1 flex items-center justify-center '>
            <Hamburger size={24} onToggle={setMobileNav} />
          </div>
        </div>
      </div>
      <div className='absolute top-64 left-0 inset-0 flex items-center justify-center z-[-1]'>
        <motion.div
          className=' z-[-1] flex flex-col md:w-[450px] w-[90%] max-w-[450px] mt-32 left-[-1/2] transform translate-x-[50%]  text-center '
          initial={{opacity: 0, x: 50}}
          animate={{
            opacity: mobileNav ? 1 : 0,
            x: mobileNav ? 0 : 50,
          }}
          exit={{opacity: 0, x: 50}}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className=' w-full bg-slate-800 text-slate-300  rounded-t-2xl  font-bold flex justify-start items-center'>
            <div className='w-[60px] border-l-2 border-t-2 py-8  border-ForegroundColor rounded-tl-2xl' />
            <h6 className='px-4 relative right-12'>Navigation</h6>
          </div>
          <ul className='flex flex-col'>
            <li className='w-full bg-slate-900 text-slate-300 py-4 border-b-[1px] border-gray-800 px-6 font-medium flex justify-between items-center'>
              <p>Home</p>
              <IoMdHome size={25} />
            </li>
            <li className='w-full bg-slate-900 text-slate-300 py-4 border-b-[1px] border-gray-800 px-6 font-medium flex justify-between items-center'>
              Tech
              <FaCode size={25} />
            </li>
            <li className='w-full bg-slate-900 text-slate-300 py-4 border-b-[1px] border-gray-800 px-6 font-medium flex justify-between items-center'>
              Works
              <GrProjects size={25} />
            </li>{" "}
            <li className='w-full bg-slate-900 text-slate-300 py-4 border-b-[1px] border-gray-800 px-6 font-medium flex justify-between items-center'>
              Resume
              <SiReaddotcv size={25} />
            </li>
            <div className=' w-full bg-slate-900 text-slate-300  rounded-b-2xl  font-medium flex justify-between items-center'>
              <h6 className='px-6'>Contact</h6>
              <div className='flex items-center'>
                <GrContact size={25} className='relative left-8' />
                <div className='w-[60px] border-r-2 border-b-2 py-8  border-ForegroundColor rounded-br-2xl' />
              </div>
            </div>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
