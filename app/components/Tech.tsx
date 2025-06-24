"use client";
import {getIcon} from "@/app/components/getIcon";
import {motion} from "framer-motion";

import Image, {StaticImageData} from "next/image";

import techData from "@/app/components/textContent/Tech.json";

export interface Technology {
  header: string;
  description: string;
  icon: string;
  alt: string;
}
const Tech = ({gameMode}: {gameMode: boolean}) => {
  const gameModeTechData = gameMode ? techData.gameModeOn : techData.gameModeOff;

  return (
    <section
      id='Tech'
      className='max-w-[1300px] flex flex-col mx-auto justify-start items-center space-y-10 pt-32 lg:pt-0 px-6 '
    >
      <div className='flex flex-col text-center'>
        <h2 className='text-3xl font-bold '>
          {/* {gameMode && "My personal "} */}
          <span className={gameMode ? "game-mode-on" : "game-mode-off"}>{gameMode ? "Goats" : "Stack"}</span>
          {/* {!gameMode && "I work with"} */}
        </h2>
        <h1 className='text-5xl max-w-[900px] mt-6'>
          A curated stack of tools,&nbsp;frameworks, and&nbsp;libraries&nbsp;powering&nbsp;my&nbsp;projects.
        </h1>
      </div>

      <div className='overflow-hidden w-full flex hover:cursor-grab active:cursor-grabbing '>
        <motion.div
          className='flex space-x-6 mt-6'
          drag='x'
          dragConstraints={{left: gameModeTechData.length * -300, right: 0}}
          initial={{x: 0}}
          animate={{x: 0}}
          transition={{type: "spring", stiffness: 300, damping: 30}}
          style={{touchAction: "none"}}
        >
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
        </motion.div>
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
      className=' w-[320px] h-[440px] bg-[#2C2C39]  rounded-[20px] border-t-[1px] border-t-[hsl(0,0%,60%)] flex flex-col border border-[hsl(0,0%,30%)]'
      style={{animationDelay: `${animationDelay}ms`}}
      initial={{opacity: 0, y: 200}}
      whileInView={{opacity: 1, y: 0}}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        delay: animationDelay / 1000,
      }}
      viewport={{once: true}}
      tabIndex={index}
    >
      <div className='h-[60%] flex items-center justify-center rounded-t-[20px] overflow-hidden'>
        <Image
          loading='lazy'
          src={icon}
          alt={alt}
          className={gameMode ? "h-full object-cover rounded-t-[20px]" : "size-[130px]"}
        />
      </div>
      <div className='w-full h-[40%] bg-[#1b1b25] rounded-b-[20px] flex flex-col space-y-4 px-6 py-4'>
        <h1 className='text-xl font-bold'>{header}</h1>
        <p className='text-MylightGray'>{description}</p>
      </div>
    </motion.div>
  );
};
