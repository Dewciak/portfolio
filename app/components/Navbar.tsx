"use client";
import {motion} from "framer-motion";
import {Twirl as Hamburger} from "hamburger-react";
import {useEffect, useState} from "react";
import {LuGamepad} from "react-icons/lu";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {FaCode} from "react-icons/fa6";
import {GrContact, GrProjects} from "react-icons/gr";
import {IoIosPodium, IoMdHome} from "react-icons/io";
import {SiReaddotcv} from "react-icons/si";
import {Link as ScrollLink} from "react-scroll";
import OpenForWork from "./OpenForWork";

interface NavbarProps {
  gameMode: boolean;
}

const Navbar = ({gameMode}: NavbarProps) => {
  const [mobileNav, setMobileNav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.setProperty("--Foreground-Color", gameMode ? "#fb4311" : "#00e0e4");
    document.documentElement.style.setProperty("--Background-Color", gameMode ? "#000000" : "#01000e");
  }, [gameMode]);
  // Function to change the color theme based on the game mode

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleGameModeChange(): Promise<void> {
    if (mobileNav) {
      setIsAnimating(true);
      setMobileNav(false);

      router.push(`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`, {scroll: false});
      await delay(300);
      setIsAnimating(false);

      console.log("change");
      setMobileNav(true);
    } else {
      setIsAnimating(true);
      router.push(`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`, {scroll: false});
      await delay(300);
      setIsAnimating(false);
    }
  }
  // Function to handle the game mode change with a delay for the animation

  return (
    <nav className=' w-full fixed z-[100] pointer-events-none '>
      <div className='hidden pointer-events-auto lg:flex bg-BackgroundColor items-center transition-colors duration-500 justify-between w-full mx-auto py-10 px-16'>
        <OpenForWork gameMode={gameMode} />
        <ul className='flex space-x-10  justify-center items-center text-xl mx-auto '>
          <li>
            <ScrollLink to='Home' className='cursor-pointer' smooth={true} duration={200} offset={50} spy={true}>
              Home
            </ScrollLink>
          </li>

          <li>
            <ScrollLink to='Tech' className='cursor-pointer' smooth={true} duration={200} offset={-200} spy={true}>
              {gameMode ? "Goats" : "Tech"}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to='Works' className='cursor-pointer' smooth={true} duration={200} offset={-300} spy={true}>
              {gameMode ? "Rescently played" : "Works"}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to='Resume' className='cursor-pointer' smooth={true} duration={200} offset={-200} spy={true}>
              {gameMode ? "Steam" : "Resume"}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to='Gear' className='cursor-pointer' smooth={true} duration={200} offset={-150} spy={true}>
              Gear
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to='Contact' className='cursor-pointer' smooth={true} duration={200} offset={50} spy={true}>
              Contact
            </ScrollLink>
          </li>
        </ul>

        <Link
          scroll={false}
          href={`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`}
          className='flex space-x-4 text-gray-100 items-center justify-end font-thin w-[260px]  '
        >
          <p className={`${gameMode ? "text-white" : "text-gray-600"} hidden xl:flex `}>GAMING MODE</p>
          <LuGamepad size={30} opacity={gameMode ? 1 : 0.6} className={`${gameMode ? "" : "Gamepad"}`} />
        </Link>
      </div>

      <MobileNav
        gameMode={gameMode}
        setMobileNav={setMobileNav}
        mobileNav={mobileNav}
        isAnimating={isAnimating}
        handleGameModeChange={handleGameModeChange}
      />
    </nav>
  );
};

export default Navbar;

interface MobileNavProps {
  gameMode: boolean;
  setMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  mobileNav: boolean;
  isAnimating: boolean;
  handleGameModeChange: () => void;
}

function MobileNav({gameMode, setMobileNav, mobileNav, isAnimating, handleGameModeChange}: MobileNavProps) {
  return (
    <div className='pointer-events-auto lg:pointer-events-none'>
      <div className='flex lg:hidden justify-between items-center w-full px-4 py-8 '>
        <div className='flex space-x-2 ml-auto'>
          <div
            onClick={() => handleGameModeChange()}
            className={`  rounded-full p-3 flex items-center justify-center duration-300 transition-colors ${
              gameMode ? "bg-[#141414]" : "bg-slate-900"
            }`}
          >
            <motion.div animate={{scale: isAnimating ? 1.2 : 1}} transition={{duration: 0.3, ease: "easeInOut"}}>
              <LuGamepad size={30} />
            </motion.div>
          </div>

          <div
            className={`  rounded-full text-gray-100 px-1 flex items-center justify-center duration-300 transition-colors 
              ${gameMode ? "bg-[#141414]" : "bg-slate-900"}`}
          >
            <Hamburger size={24} onToggle={setMobileNav} toggled={mobileNav} />
          </div>
        </div>
      </div>
      {mobileNav && (
        <div className='absolute top-12 left-0 w-full flex items-center justify-center sm:justify-end z-[-1] '>
          <motion.div
            className=' z-[-1] flex flex-col md:w-[450px] w-[90%] max-w-[450px] mt-32 left-[-1/2] transform translate-x-[50%] sm:mr-6   text-center '
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
            <div
              className={` w-full  text-slate-300  rounded-t-2xl  font-bold flex justify-start items-center ${
                gameMode ? "bg-[#141414]" : "bg-slate-800"
              }`}
            >
              <div className='w-[60px] border-l-2 border-t-2 py-8  border-ForegroundColor rounded-tl-2xl' />
              <h6 className='px-4 relative right-12'>Navigation</h6>
            </div>
            <ul className='flex flex-col'>
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='Home'
                  smooth={true}
                  duration={200}
                  offset={0}
                  spy={true}
                  onClick={() => setMobileNav(false)}
                >
                  Home
                </ScrollLink>
                <IoMdHome size={25} />
              </li>
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='Tech'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  onClick={() => setMobileNav(false)}
                >
                  {gameMode ? "Goats" : "Tech"}
                </ScrollLink>
                {gameMode ? <IoIosPodium size={25} /> : <FaCode size={25} />}
              </li>
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='Works'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  onClick={() => setMobileNav(false)}
                >
                  {gameMode ? "Rescently played" : "Works"}
                </ScrollLink>
                <GrProjects size={25} />
              </li>{" "}
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='Resume'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  onClick={() => setMobileNav(false)}
                >
                  {gameMode ? "Steam" : "Resume"}
                </ScrollLink>
                <SiReaddotcv size={25} />
              </li>
              <div
                className={`w-full  text-slate-300  rounded-b-2xl  font-medium flex justify-between items-center ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                }`}
              >
                <ScrollLink
                  to='Contact'
                  className='px-6'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  onClick={() => setMobileNav(false)}
                >
                  Contact
                </ScrollLink>
                <div className='flex items-center'>
                  <GrContact size={25} className='relative left-8' />
                  <div className='w-[60px] border-r-2 border-b-2 py-8  border-ForegroundColor rounded-br-2xl' />
                </div>
              </div>
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
}
