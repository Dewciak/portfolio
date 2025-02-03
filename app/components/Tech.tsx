"use client";
import {getIcon} from "@/app/components/getIcon";
import {motion} from "framer-motion";

import Image, {StaticImageData} from "next/image";

import techData from "@/app/components/textContent/Tech.json";

interface Props {
  gameMode: boolean;
}
export interface Technology {
  header: string;
  description: string;
  icon: string;
}
const Tech = ({gameMode}: Props) => {
  const gameModeTechData = gameMode ? techData.gameModeOn : techData.gameModeOff;

  return (
    <section
      id='Tech'
      className='max-w-[1300px] flex flex-col mx-auto justify-start items-start space-y-10 mt-32 lg:mt-0 px-6 '
    >
      <h1 className='text-6xl font-bold'>
        {gameMode && "My personal "}
        <span className={gameMode ? "game-mode-on" : "game-mode-off"}>{gameMode ? "Goats" : "Tech "}</span>
        {!gameMode && "I work with"}
      </h1>
      <p className='max-w-[600px] text-MylightGray'>
        Discover my personal Goats – the games that have left a lasting impact on me. These are the titles that have
        shaped my gaming journey, offering unforgettable experiences, incredible mechanics, and stories that continue to
        inspire
      </p>
      <div className='overflow-hidden w-full flex hover:cursor-grab active:cursor-grabbing '>
        <motion.div
          className='flex space-x-4 '
          drag='x'
          dragConstraints={{left: gameModeTechData.length * -250, right: 0}}
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
}

const Card = ({header, description, icon, gameMode, animationDelay}: cardProps) => {
  return (
    <div
      className='tech-item w-[320px] h-[440px] bg-[#2C2C39] rounded-[20px] flex flex-col '
      style={{animationDelay: `${animationDelay}ms`}}
    >
      <div className='h-[60%] flex items-center justify-center rounded-t-[20px] overflow-hidden'>
        <Image src={icon} alt='icon' className={gameMode ? "h-full object-cover rounded-t-[20px]" : "size-[130px]"} />
      </div>
      <div className='w-full h-[40%] bg-[#1C1C21] rounded-b-[20px] flex flex-col space-y-4 px-6 py-4'>
        <h2 className='text-xl'>{header}</h2>
        <p className='text-MylightGray'>{description}</p>
      </div>
    </div>
  );
};
