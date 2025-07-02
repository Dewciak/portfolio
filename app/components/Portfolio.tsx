"use client";
// usunąć to później
import Image, {StaticImageData} from "next/image";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaRegStar, FaUserCircle} from "react-icons/fa";
import {FaArrowLeft, FaArrowRight, FaPlus} from "react-icons/fa6";
import {IoIosClose, IoMdRefresh} from "react-icons/io";
import {LuSettings2} from "react-icons/lu";
import {VscChromeMinimize} from "react-icons/vsc";
import {useRef, useEffect, useState, Dispatch, SetStateAction} from "react";
import {BsPersonWorkspace} from "react-icons/bs";
import bailiffImage from "@/public/images/BailiffLong.webp";

import portfolioData from "@/app/components/textContent/Portfolio.json";

import bailiffLogo from "@/public/images/BailiffLogo.webp";

import carpentryLogo from "@/public/images/StolarstwoLogo.png";

import photographyLogo from "@/public/images/FotoLogo.png";

export interface Portfolio {
  header: string;
  description: string;
  image: string;
  tech: string;
}

interface Website {
  title: string;
  logo: StaticImageData;
}
const Portfolio = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(1);

  return (
    <div id='Portfolio' className='flex flex-col text-center  max-w-[1200px] mx-auto items-center justify-center pb-32'>
      <div className='flex flex-col space-y-6 justify-center items-center'>
        <span className='text-4xl font-bold'>Portfolio</span>
        <div className='flex space-x-4 items-center'>
          <BsPersonWorkspace size={30} className='gradient-text' />
          <p className='max-w-[500px] text-TextColor font-bold text-4xl'>Selected Front-End Projects</p>
        </div>
      </div>
      <Browser setSelectedWebsite={setSelectedWebsite} selectedWebsite={selectedWebsite} />
      <WebsiteDescription selectedWebsite={selectedWebsite} />
    </div>
  );
};

function Browser({
  setSelectedWebsite,
  selectedWebsite,
}: {
  setSelectedWebsite: Dispatch<SetStateAction<number>>;
  selectedWebsite: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const STEP = 0.5; // może być mniejsze niż 1
    const RESUME_DELAY = 6000;

    let direction = 1;
    let paused = false;
    let rafId: number;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;
    let remainder = 0; // acumulator of the pixels

    const step = () => {
      if (!paused) {
        remainder += direction * STEP;

        if (Math.abs(remainder) >= 1) {
          const delta = Math.trunc(remainder); // whole number
          c.scrollTop += delta;
          remainder -= delta;
        }

        if (c.scrollTop + c.clientHeight >= c.scrollHeight - 1) direction = -1;
        else if (c.scrollTop <= 0) direction = 1;
      }
      rafId = requestAnimationFrame(step);
    };

    const pause = () => {
      paused = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => (paused = false), RESUME_DELAY);
    };

    // Stopping animation when user scrolls or clicks the container
    c.addEventListener("wheel", pause, {passive: true});
    c.addEventListener("touchmove", pause, {passive: true});
    c.addEventListener("click", pause, {passive: true});

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      c.removeEventListener("wheel", pause);
      c.removeEventListener("touchmove", pause);
    };
  }, []);

  const portfolioWebsites: Website[] = [
    {
      title: "Bailif",
      logo: bailiffLogo,
    },
    {
      title: "Carpentry",
      logo: carpentryLogo,
    },
    {
      title: "Photography",
      logo: photographyLogo,
    },
  ];
  return (
    <>
      <div className='flex flex-col items-start mt-12 y-4 bg-[#1e1e1e] rounded-[25px]'>
        {/* ####################################### */}
        {/* Macos interface */}
        {/* ####################################### */}
        <div className='flex  items-center  bg-[#303134]'>
          <div className='flex space-x-2 group bg-[#1e1e1e] px-6 py-[14px]  '>
            <div className='w-3 h-3 bg-red-500 rounded-full flex items-center justify-center'>
              <IoIosClose className='hidden group group-hover:block duration-100 text-red-900 w-4 h-4 absolute' />
            </div>
            <div className='w-3 h-3 bg-[#f4bf4f] rounded-full items-center justify-center'>
              <VscChromeMinimize className='hidden group group-hover:block duration-100 text-yellow-900 w-3 h-3 absolute' />
            </div>
            <div className='w-3 h-3 bg-green-500 rounded-full flex justify-center items-center'>
              <FaPlus className='hidden group group-hover:block duration-100 text-green-900 w-2 h-2 absolute' />
            </div>
          </div>

          {/* <button
            onClick={() => setSelectedWebsite(1)}
            className='chrome-tab  bg-[#1e1e1e] flex justify-between items-center clip-inset-rounded w-[200px] p-2 rounded-br-lg'
          >
            <Image src={StolarstwoLogo} alt='Bailiff Favicon' width={19} height={19} />
            <p>stolarstwokomen</p>
            <IoIosClose fill='#ffffff' size={24} />
          </button>
          <div className='chrome-tab bg-[#303134]  ml-4 flex justify-between items-center clip-inset-rounded w-[200px] p-2 rounded-t-lg -rounded-b-lg'>
            <Image src={BailiffLogo} alt='Carpentry Favicon' width={19} height={19} />
            <p>komornikddbielsko</p>
            <IoIosClose fill='#ffffff' size={24} />
          </div>
          <div className='chrome-tab bg-[#1e1e1e] ml-6 flex justify-between items-center clip-inset-rounded w-[200px] p-2 rounded-bl-lg'>
            <Image src={FotoLogo} alt='Fotography Favicon' width={19} height={19} />
            <p>patrycjadawid</p>
            <IoIosClose fill='#ffffff' size={24} />
          </div> */}
          {portfolioWebsites.map((websiteItem, index) => (
            <button
              onClick={() => setSelectedWebsite(index)}
              className={`chrome-tab 
                ml-4 flex justify-between items-center
                clip-inset-rounded w-[200px] p-2 rounded-t-lg -rounded-b-lg
              ${selectedWebsite == index ? "bg-[#303134]" : "bg-[#1e1e1e]"}`}
            >
              <Image src={websiteItem.logo} alt='Carpentry Favicon' width={19} height={19} />
              <p>{websiteItem.title}</p>
              <IoIosClose fill='#ffffff' size={24} />
            </button>
          ))}
          <div className='bg-[#1e1e1e] p-2 flex items-center justify-center space-x-4'>
            <div className='opacity-50'>|</div>
            <FaPlus size={16} />
          </div>
        </div>
        {/* ####################################### */}
        {/* Main Browser Line with link */}
        {/* ####################################### */}
        <div className='flex bg-[#303134] py-2 w-full px-4 pb-4 rounded-t-md justify-between items-center'>
          <div className='flex space-x-2'>
            <FaArrowLeft />
            <FaArrowRight />
            <IoMdRefresh />
          </div>
          <div className='bg-[#1d1d1d] rounded-full px-1 flex justify-between w-[85%] py-1 items-center'>
            <div className='flex space-x-2 text-TextColor'>
              <div className='bg-[#303134] rounded-full w-[22px] h-[22px] flex items-center justify-center'>
                <LuSettings2 />
              </div>
              <p>https://komornikddbielsko.pl/</p>
            </div>
            <FaRegStar className='mr-2' />
          </div>
          <div className='flex space-x-2'>
            <FaUserCircle />
            <BsThreeDotsVertical />
          </div>
        </div>
        <div
          ref={containerRef}
          className='w-[800px] mt-0 h-[460px]  rounded-b-[20px] xl:w-[1200px] xl:h-[690px] overflow-y-scroll scroll-smooth '
        >
          <Image
            src={bailiffImage}
            alt='Bailiff image'
            className='w-full'
            // className='w-[800px] mt-0 h-[460px]  rounded-b-[20px] xl:w-[1200px] xl:h-[690px] '
            //   className='w-[800px] mt-0 h-[460px] rounded-b-[20px] 2xl:w-[200%] '
          />
        </div>
      </div>
    </>
  );
}

function WebsiteDescription({selectedWebsite}: {selectedWebsite: number}) {
  return (
    <>
      <h1 className='mt-10 text-4xl'>{portfolioData[selectedWebsite].title}</h1>
      <h2 className='mt-2 text-xl text-gray-400'>{portfolioData[selectedWebsite].subTitle}</h2>
      <div className='flex mt-6 space-x-4'>
        {portfolioData[selectedWebsite].tech.split(" ").map((techItem, index) => (
          <div className='border text-TextColor py-2 px-4 bg-[#c4c3c32b] border-[#ffffff44] rounded-full  backdrop-blur-xl hover:bg-[#c4c3c356] duration-200 '>
            <p>{techItem}</p>
          </div>
        ))}
      </div>
      <p className='text-center mt-6 max-w-[500px]'>{portfolioData[selectedWebsite].description}</p>
    </>
  );
}

export default Portfolio;
