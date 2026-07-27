"use client";
import {getIcon} from "@/app/components/getIcon";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import Image, {StaticImageData} from "next/image";
import type {IconType} from "react-icons";
import {FaCubesStacked} from "react-icons/fa6";

import techData from "@/app/components/textContent/Tech.json";
import {techGroups} from "@/app/components/data/techStack";

const Tech = ({gameMode}: {gameMode: boolean}) => {
  const t = useTranslations("tech");

  return (
    <section id='Tech' className='max-w-[1250px] flex flex-col mx-auto justify-start items-center  pt-8 lg:pt-6 px-6 '>
      <div className='flex  text-left w-full space-x-4'>
        <FaCubesStacked size={30} />
        <h2 className='text-3xl font-bold '>{gameMode ? t("gameHeading") : t("heading")}</h2>
      </div>

      {gameMode ? (
        <div className='overflow-hidden w-full flex flex-wrap gap-6 mt-14  justify-center'>
          {techData.gameModeOn.map((game, index) => (
            <Card
              key={game.header}
              name={game.header}
              image={getIcon(game.icon)!}
              alt={game.alt}
              animationDelay={index * 60}
            />
          ))}
        </div>
      ) : (
        <div className='mt-14 flex w-full flex-col gap-12'>
          {techGroups.map((group, groupIndex) => (
            <div key={group.id} className='w-full'>
              <h3 className='tech-group-label'>{t(`groups.${group.id}`)}</h3>
              <div className='mt-6 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-start'>
                {group.items.map((tech, index) => (
                  <Card
                    key={tech.name}
                    name={tech.name}
                    Icon={tech.Icon}
                    image={tech.image}
                    color={tech.color}
                    wide={tech.wide}
                    alt={`${tech.name} logo`}
                    animationDelay={groupIndex * 40 + index * 40}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Tech;

interface CardProps {
  name: string;
  Icon?: IconType;
  image?: StaticImageData;
  color?: string;
  wide?: boolean;
  alt: string;
  animationDelay: number;
}

const Card = ({name, Icon, image, color, wide, alt, animationDelay}: CardProps) => {
  // A wordmark gets a wider box; preserveAspectRatio keeps it undistorted.
  const iconSize = wide ? "h-10 w-[4.5rem] md:h-12 md:w-[5.5rem]" : "h-9 w-9 md:h-11 md:w-11";
  return (
    <motion.div
      className='tech-card group'
      initial={{opacity: 0, y: 40}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.25, ease: "easeOut", delay: Math.min(animationDelay, 400) / 1000}}
      viewport={{once: true, margin: "-40px"}}
    >
      <div className='flex flex-col items-center justify-center gap-3'>
        {Icon ? (
          <Icon aria-hidden='true' className={`${iconSize} shrink-0`} style={{color}} />
        ) : image ? (
          <Image loading='lazy' width={44} height={44} src={image} alt={alt} className={iconSize} />
        ) : null}
        <strong className='text-center text-xs md:text-sm font-medium text-TextColor'>{name}</strong>
      </div>
    </motion.div>
  );
};
