"use client";
import Cv from "@/public/images/cv.png";
import CodeSs from "@/public/images/ResumeCode.png";
import BlueLight from "@/public/images/ResumeLight.png";
import RedLight from "@/public/images/ResumeLightRed.png";
import Steam from "@/public/images/steam.webp";
import Image from "next/image";
import Link from "next/link";
import {useRef, useState} from "react";
import useObserver from "./hooks/useObserver";
import ImageWork from "@/public/images/ResumeWork.png";
import ImageGame from "@/public/images/ResumeGame.png";
import OpenForWork from "./OpenForWork";
import {IoDocumentTextOutline} from "react-icons/io5";

const Resume = ({gameMode}: {gameMode: boolean}) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const Observer = useObserver({visibilityRef: resumeRef, setIsVisible: setVisible, isVisible: isVisible});

  return (
    <section
      ref={resumeRef}
      id='Resume'
      className='flex pt-[160px] lg:pt-[0px] lg:mb-[100px] justify-center w-full overflow-hidden '
    >
      {/* <div className='pb-6 mx-auto text-center'>
        <OpenForWork gameMode={gameMode} />
      </div> */}
      <div className='flex justify-center items-center flex-col p-4 overflow-hidden w-full py-10 relative pb-32 '>
        <div className='flex flex-col text-center'>
          <h2 className='text-3xl font-bold '>
            {/* {gameMode && "My personal "} */}
            <span className={gameMode ? "game-mode-on" : "game-mode-off"}>{gameMode ? "Goats" : "Resume"}</span>
            {/* {!gameMode && "I work with"} */}
          </h2>
          <h1 className='text-5xl max-w-[900px] mt-6'>
            A summary of my education, experience, and technical skills in&nbsp;web&nbsp;development.
          </h1>
        </div>
        <div className='cv-image-box flex justtify-center mr-16 py-10 mt-32 '>
          <div
            className={`lg:w-[360px]  lg:h-[544px] w-[260px] h-[370px] overflow-hidden rounded-[17px] bg-white z-10 
              ${isVisible ? "scale-105 rotate-[-12deg]" : "rotate-[-7deg]"} duration-700 transition-all`}
          >
            <Image src={gameMode ? Steam : Cv} alt='' loading='lazy' />
          </div>
          <div
            className={`lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] rounded-full  z-10 relative bottom-[10px] lg:top-[10px] top-[20px]  lg:right-[90px] right-[60px]  duration-700 ${
              isVisible && "scale-125"
            }`}
          >
            <Image
              src={gameMode ? ImageGame : ImageWork}
              alt='Me'
              loading='lazy'
              className='rounded-full h-full object-cover'
            />
          </div>
          <div
            className={`overflow-hidden lg:w-[360px] lg:h-[544px] w-[260px] h-[370px] rounded-[17px] absolute ml-44 mt-12 
              ${isVisible ? "scale-105 rotate-[12deg]" : "rotate-[10deg]"} duration-700 transition-all`}
          >
            <Image loading='lazy' src={CodeSs} alt='' className='object-cover h-full w-auto' />
          </div>
        </div>

        <Link
          href={"https://docs.google.com/document/d/1EYLU0Js3A6Ty38V0ynXZbpGybL-jv2vckIot6LakuVQ/edit?usp=sharing"}
          className={`view-resume mt-32 text-xl rounded-xl   cursor-pointer ${
            isVisible ? "opacity-100" : "opacity-0"
          }  duration-[400ms] transition-all  flex space-x-2 items-center px-6 py-3 bg-gray-200/10 hover:scale-[1.07] hover:bg-gray-200 hover:text-black backdrop-blur`}
          target='blank'
          role='button'
          tabIndex={22}
        >
          <IoDocumentTextOutline size={26} />

          <p>{gameMode ? "My steam profile" : "Download CV"}</p>
        </Link>
        {gameMode ? (
          <Image src={RedLight} alt='light' width={1000} className='absolute overflow-visible  z-[-2]' />
        ) : (
          <Image src={BlueLight} alt='light' width={1000} className='absolute overflow-visible  z-[-2]' />
        )}
      </div>
    </section>
  );
};

export default Resume;
