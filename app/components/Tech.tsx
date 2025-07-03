"use client";
import {getIcon} from "@/app/components/getIcon";
import {motion} from "framer-motion";
import Image, {StaticImageData} from "next/image";
import {FaCubesStacked} from "react-icons/fa6";

import techData from "@/app/components/textContent/Tech.json";

export interface Technology {
  header: string;
  description: string;
  icon: string;
  alt: string;
}
const Tech = ({gameMode}: {gameMode: boolean}) => {
  const gameModeTechData = techData.gameModeOff;

  return (
    <section id='Tech' className='max-w-[1250px] flex flex-col mx-auto justify-start items-center  pt-32 lg:pt-6 px-6 '>
      <div className='flex  text-left w-full space-x-4'>
        <FaCubesStacked size={30} />
        <h2 className='text-3xl font-bold '>
          {/* <span spanclassName={gameMode ? "game-mode-on" : "game-mode-off"}>{gameMode ? "Goats" : "Tech Stack"}</span> */}
          Tech Stack
        </h2>
      </div>

      <div className='overflow-hidden w-full flex flex-wrap gap-6 mt-14  justify-center'>
        {gameModeTechData.map((tech: Technology, index: number) => (
          <Card
            key={index}
            header={tech.header}
            description={tech.description}
            icon={getIcon(tech.icon)!}
            gameMode={gameMode}
            animationDelay={index * 100}
            index={index + 3}
            alt={tech.alt}
          />
        ))}
      </div>
    </section>
  );
};

export default Tech;

interface cardProps {
  header: string;
  description: string;
  icon: StaticImageData | string;
  gameMode: boolean;
  animationDelay: number;
  index: number;
  alt: string;
}

const Card = ({header, description, icon, gameMode, animationDelay, index, alt}: cardProps) => {
  return (
    <motion.div
      className='md:w-[150px] md:h-[150px] hover:bg-[#2c2c399f] duration-300 w-[100px] h-[100px] 
      transform cursor-default   bg-[#2c2c394c] backdrop-blur-xl   rounded-[20px]  
      flex items-center justify-center '
      style={{animationDelay: `${animationDelay}ms`}}
      initial={{opacity: 0, y: 100}}
      whileInView={{opacity: 1, y: 0}}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        delay: animationDelay / 1000,
      }}
      viewport={{once: true}}
      tabIndex={index}
    >
      <div className=' flex flex-col items-center justify-center space-y-4 '>
        <Image
          loading='lazy'
          width={70}
          height={70}
          src={icon}
          alt={alt}
          className='w-[50px] h-[50px]'
          // className={gameMode ? "h-full object-cover rounded-t-[10px]" : "size-[100px]"}
        />
        <strong className='text-TextColor'>{header}</strong>
      </div>
    </motion.div>
  );
};
