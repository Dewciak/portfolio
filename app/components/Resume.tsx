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

const Resume = ({gameMode}: {gameMode: boolean}) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const Observer = useObserver({visibilityRef: resumeRef, setIsVisible: setVisible, isVisible: isVisible});

  return (
    <section
      ref={resumeRef}
      id='Resume'
      className='flex mt-[160px] lg:mt-[340px] lg:mb-[100px] justify-center w-full overflow-hidden '
    >
      <div className='flex justify-center items-center flex-col p-4 overflow-hidden w-full py-10 relative pb-32 '>
        <div className='cv-image-box flex justtify-center mr-16 '>
          <div
            className={`lg:w-[360px] lg:h-[544px] w-[260px] h-[370px] overflow-hidden rounded-[17px] bg-white z-10 
              ${isVisible ? "scale-105 rotate-[-12deg]" : "rotate-[-7deg]"} duration-700 transition-all`}
          >
            <Image src={gameMode ? Steam : Cv} alt='' loading='lazy' />
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
          className={`view-resume mt-32 text-2xl cursor-pointer ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300 hover:text-MylightGray `}
          target='blank'
          role='button'
          tabIndex={22}
        >
          {gameMode ? "My steam profile" : "View Resume"}
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
