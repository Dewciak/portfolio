"use client";
import {CV_URL, STEAM_URL} from "@/app/lib/links";
import {useTranslations} from "next-intl";
import Cv from "@/public/images/cv-2026.webp";
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
  const t = useTranslations("resume");
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
          <strong className='text-4xl font-semibold md:text-5xl'>{t("heading")}</strong>
          <OpenForWork gameMode={gameMode} />
        </div>
        <div className='cv-image-box flex justtify-center mr-10 py-10 mt-20 md:mr-16 md:mt-32'>
          <div
            className={`md:w-[360px]  md:h-[544px] w-[190px] h-[272px] overflow-hidden rounded-[17px] bg-white z-10
              ${isVisible ? "scale-105 rotate-[-12deg]" : "rotate-[-7deg]"} duration-700 transition-all`}
          >
            <Image src={gameMode ? Steam : Cv} alt='' loading='lazy' />
          </div>
          <div
            /* Offsets place the avatar over the photo printed inside the CV render
               (its centre sits at 89.1% / 8.2% of the image, accounting for the
               card's scale-105 rotate-[-12deg]). */
            className={`md:w-[82px] md:h-[82px] w-[44px] h-[44px] rounded-full z-10 relative top-[-24px] md:top-[-69px] right-[64px] md:right-[128px] duration-700 ${
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
            className={`overflow-hidden md:w-[360px] md:h-[544px] w-[190px] h-[272px] rounded-[17px] absolute ml-32 mt-8 md:ml-44 md:mt-12
              ${isVisible ? "scale-105 rotate-[12deg]" : "rotate-[10deg]"} duration-700 transition-all`}
          >
            <Image loading='lazy' src={CodeSs} alt='' className='object-cover h-full w-auto' />
          </div>
        </div>

        <Link
          href={gameMode ? STEAM_URL : CV_URL}
          className={`view-resume mt-32 text-xl rounded-xl   cursor-pointer hover:drop-shadow shadow-radial-gradient(circle_at_center,_#5785dd_0%,_transparent_70%) ${
            isVisible ? "opacity-100" : "opacity-0"
          }  duration-[400ms] transition-all  flex space-x-2 items-center px-6 py-3 bg-gray-200/10 hover:scale-[1.07] hover:bg-gray-200 hover:text-black backdrop-blur`}
          target='_blank'
          rel='noreferrer'
          role='button'
          tabIndex={22}
        >
          <IoDocumentTextOutline size={26} />

          <p>{gameMode ? t("steamProfile") : t("openCv")}</p>
        </Link>
        <div
          className='absolute
               md:h-[800px] md:w-[600px] h-[400px] w-[300px] rounded-full opacity-1 blur-[140px]
               pointer-events-none
              -z-10'
          style={{background: "radial-gradient(circle at center, var(--theme-accent-start) 0%, transparent 70%)"}}
        />
      </div>
    </section>
  );
};

export default Resume;
