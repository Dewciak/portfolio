"use client";
// usunąć to później
import Image, {StaticImageData} from "next/image";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {BsPersonWorkspace, BsThreeDotsVertical} from "react-icons/bs";
import {FaRegStar, FaUserCircle} from "react-icons/fa";
import {FaArrowLeft, FaArrowRight, FaPlus} from "react-icons/fa6";
import {FiExternalLink} from "react-icons/fi";
import {IoIosClose, IoMdRefresh} from "react-icons/io";
import {LuSettings2} from "react-icons/lu";
import {VscChromeMinimize} from "react-icons/vsc";

import bailiffImage from "@/public/images/BailiffLong.webp";
import carpentryImage from "@/public/images/Carpentry.png";
import photographyImage from "@/public/images/PhotographyWebsiteScreen.png";

import portfolioData from "@/app/components/textContent/Portfolio.json";

import bailiffLogo from "@/public/images/BailiffLogo.webp";

import carpentryLogo from "@/public/images/StolarstwoLogo.png";

import photographyLogo from "@/public/images/FotoLogo.png";
import Link from "next/link";

export interface Portfolio {
  header: string;
  description: string;
  image: StaticImageData;
  tech: string;
}

interface Website {
  title: string;
  logo: StaticImageData;
}
const Portfolio = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(1);

  return (
    <section
      id='Portfolio'
      className='flex flex-col text-center w-[95%] md:w-full max-w-[1200px] mx-auto items-center justify-center md:pb-32 pb-16 mt-32 md:mt-52'
    >
      <div className='flex flex-col space-y-6 justify-center items-center'>
        <span className='text-4xl font-bold'>Portfolio</span>
        <div className='flex space-x-4 items-start  md:items-start text-center'>
          <BsPersonWorkspace size={30} className='gradient-text hidden md:block' />
          <p className='md:max-w-[500px] text-TextColor font-bold text-4xl '>Selected Front-End Projects</p>
        </div>
      </div>
      <Browser setSelectedWebsite={setSelectedWebsite} selectedWebsite={selectedWebsite} />
      <WebsiteDescription selectedWebsite={selectedWebsite} />
    </section>
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
  const imageMap: Record<string, StaticImageData> = {
    bailiffImage: bailiffImage,
    carpentryImage: carpentryImage,
    photographyImage: photographyImage,
  };
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
  const scrollPositions = useRef<Record<number, number>>({});

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const savedScroll = scrollPositions.current[selectedWebsite] ?? 0;
    c.scrollTop = savedScroll;
  }, [selectedWebsite]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const handleScroll = () => {
      scrollPositions.current[selectedWebsite] = c.scrollTop;
    };

    c.addEventListener("scroll", handleScroll, {passive: true});
    return () => c.removeEventListener("scroll", handleScroll);
  }, [selectedWebsite]);

  const portfolioWebsites: Website[] = [
    {
      title: "Komornik Sądowy przy ",
      logo: bailiffLogo,
    },
    {
      title: "Stolarstwo Komendera",
      logo: carpentryLogo,
    },
    {
      title: "Patrycja Dawid Fot",
      logo: photographyLogo,
    },
  ];
  return (
    <>
      <div className='flex flex-col items-start mt-16 y-4 bg-[#1e1e1e] rounded-[25px] md:pt-3 pt-2 '>
        {/* ####################################### */}
        {/* Macos interface */}
        {/* ####################################### */}
        <div className='flex  items-center  bg-[#303134] rounded-[20px]'>
          <div
            className={`flex space-x-2 group bg-[#1e1e1e] md:px-6 px-4 py-[14px] rounded-tl-[20px] ${
              selectedWebsite == 0 && "rounded-br-lg"
            }`}
          >
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

          {portfolioWebsites.map((websiteItem, index) => (
            <button
              onClick={() => setSelectedWebsite(index)}
              className={`chrome-tab relative
                 flex  items-center
                clip-inset-rounded min-w-0 md:max-w-[200px] max-w-[100px] p-2  justify-between z-10 
              ${selectedWebsite == index ? "bg-[#303134] rounded-t-lg top-[-5px]  " : "bg-[#1e1e1e]  "}
              ${selectedWebsite == 0 && index == 1 && "rounded-bl-lg "}
              ${selectedWebsite == 1 && index == 0 && "rounded-br-lg "}
              ${selectedWebsite == 1 && index == 2 && "rounded-bl-lg "}
              ${selectedWebsite == 2 && index == 1 && "rounded-br-lg "}
              
              
              `}
            >
              <Image src={websiteItem.logo} alt='Carpentry Favicon' width={19} height={19} />
              <p className=' whitespace-nowrap overflow-hidden flex-1 text-left ml-2 '>{websiteItem.title}</p>
              <IoIosClose fill='#ffffff' size={24} />
              <div
                className={`absolute right-0 top-0 h-full md:w-8 md:mr-7 bg-gradient-to-l z-10  w-4 mr-7  ${
                  selectedWebsite == index ? "from-[#303134] rounded-t-lg" : "from-[#1e1e1e] rounded-t-[20px]"
                } to-transparent pointer-events-none`}
              />
            </button>
          ))}
          <div
            className={`bg-[#1e1e1e] p-2  items-center justify-center space-x-4 hidden md:flex ${
              selectedWebsite == 2 && "rounded-bl-lg"
            }`}
          >
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
              <p>{portfolioData[selectedWebsite].link}</p>
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
          className=' mt-0  w-full lg:max-w-[1200px] max-w-[800px] h-[400px] lg:w-[800px] lg:h-[600px] xl:w-[1200px] xl:h-[690px]  rounded-b-[20px]  overflow-y-scroll '
        >
          <Image
            src={imageMap[portfolioData[selectedWebsite].image]}
            alt=''
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
      <h2 className='mt-2 text-xl text-[#848484]'>{portfolioData[selectedWebsite].subTitle}</h2>
      <div className='flex mt-6 space-x-4'>
        {portfolioData[selectedWebsite].tech.split(" ").map((techItem, index) => (
          <div className=' text-TextColor py-2 px-4 bg-[#2c2c398f] backdrop-blur-xl rounded-full   hover:bg-[#c4c3c356] duration-200 '>
            <p>{techItem}</p>
          </div>
        ))}
      </div>
      <p className='text-center mt-6 max-w-[500px] px-6 md:px-0'>{portfolioData[selectedWebsite].description}</p>
      <div className='flex space-x-6 mt-10'>
        <Link
          href={portfolioData[selectedWebsite].link}
          className='text-xl rounded-xl   cursor-pointer hover:drop-shadow shadow-radial-gradient(circle_at_center,_#5785dd_0%,_transparent_70%) 
          
          duration-[400ms] transition-all  flex space-x-2 items-center px-6 py-3 bg-gray-200/10 hover:scale-[1.07] hover:bg-gray-200 hover:text-black backdrop-blur'
        >
          Visit Live
          <FiExternalLink className='ml-2' />
        </Link>
        <Link
          href={portfolioData[selectedWebsite].link}
          className='text-xl rounded-xl   cursor-pointer hover:drop-shadow shadow-radial-gradient(circle_at_center,_#5785dd_0%,_transparent_70%) 
          
          duration-[400ms] transition-all  flex space-x-2 items-center px-6 py-3 bg-gray-200/10 hover:scale-[1.07] hover:bg-gray-200 hover:text-black backdrop-blur'
        >
          View Code
          <FaArrowRight className='ml-2' />
        </Link>
      </div>
    </>
  );
}

export default Portfolio;
