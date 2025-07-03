"use client";
import Cv from "@/public/images/cv.png";
import CodeSs from "@/public/images/ResumeCode.png";
import ImageGame from "@/public/images/ResumeGame.png";
import ImageWork from "@/public/images/ResumeWork.png";
import Steam from "@/public/images/steam.webp";
import Image from "next/image";
import Link from "next/link";
import {useRef, useState} from "react";
import {IoDocumentTextOutline} from "react-icons/io5";
import useObserver from "./hooks/useObserver";
import OpenForWork from "./OpenForWork";

const Resume = ({gameMode}: {gameMode: boolean}) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const Observer = useObserver({visibilityRef: resumeRef, setIsVisible: setVisible, isVisible: isVisible});

  return (
    <section
      ref={resumeRef}
      id='Resume'
      className='flex md:pt-[0px] pt-[0px] md:mb-[0px] justify-center w-full overflow-hidden max-w-[1300px] mx-auto '
    >
      {/* <div className='pb-6 mx-auto text-center'>
        <OpenForWork gameMode={gameMode} />
      </div> */}

      <div className='flex justify-center items-center flex-col p-4 overflow-hidden w-full py-10 relative pb-20 '>
        <div className='flex space-x-4 text-center w-full items-center mt-6 justify-center flex-col space-y-6 '>
          <strong className='text-5xl font-semibold '>Resume</strong>
          <OpenForWork gameMode={gameMode} />
        </div>
        <div className='cv-image-box flex justtify-center mr-16 py-10 mt-32 '>
          <div
            className={`md:w-[360px]  md:h-[544px] w-[260px] h-[370px] overflow-hidden rounded-[17px] bg-white z-10 
              ${isVisible ? "scale-105 rotate-[-12deg]" : "rotate-[-7deg]"} duration-700 transition-all`}
          >
            <Image src={gameMode ? Steam : Cv} alt='' loading='lazy' />
          </div>
          <div
            className={`md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-full  z-10 relative bottom-[10px] md:top-[10px] top-[20px]  md:right-[90px] right-[60px]  duration-700 ${
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
            className={`overflow-hidden md:w-[360px] md:h-[544px] w-[260px] h-[370px] rounded-[17px] absolute ml-44 mt-12 
              ${isVisible ? "scale-105 rotate-[12deg]" : "rotate-[10deg]"} duration-700 transition-all`}
          >
            <Image loading='lazy' src={CodeSs} alt='' className='object-cover h-full w-auto' />
          </div>
        </div>

        <Link
          href={"https://docs.google.com/document/d/1EYLU0Js3A6Ty38V0ynXZbpGybL-jv2vckIot6LakuVQ/edit?usp=sharing"}
          className={`view-resume mt-32 text-xl rounded-xl   cursor-pointer hover:drop-shadow shadow-radial-gradient(circle_at_center,_#5785dd_0%,_transparent_70%) ${
            isVisible ? "opacity-100" : "opacity-0"
          }  duration-[400ms] transition-all  flex space-x-2 items-center px-6 py-3 bg-gray-200/10 hover:scale-[1.07] hover:bg-gray-200 hover:text-black backdrop-blur`}
          target='blank'
          role='button'
          tabIndex={22}
        >
          <IoDocumentTextOutline size={26} />

          <p>{gameMode ? "My steam profile" : "Download CV"}</p>
        </Link>
        <div
          className={`absolute 
               md:h-[800px] md:w-[600px] h-[400px] w-[300px] rounded-full opacity-1 blur-[140px]
              
               pointer-events-none
              -z-10 ${gameMode ? "bg-[radial-gradient(circle_at_center,_#fad461_0%,_transparent_40%)]" : "bg-[radial-gradient(circle_at_center,_#5785dd_0%,_transparent_70%)]"}`}
        />
      </div>
    </section>
  );
};

export default Resume;
