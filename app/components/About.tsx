"use client";
import websiteData from "@/app/components/textContent/About.json";
import {useEffect, useState} from "react";

interface WebsiteData {
  gameModeOff: {
    firstParagraph: string;
    secondParagraph: string;
  };
  gameModeOn: {
    firstParagraph: string;
    secondParagraph: string;
  };
}
interface AboutProps {
  gameMode: boolean;
}

const About = ({gameMode}: AboutProps) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const currentData = gameMode ? websiteData.gameModeOn : websiteData.gameModeOff;
  return (
    <section id='About' className='w-full overflow-hidden'>
      <div className='max-w-[1300px] mx-auto mt-32 lg:mt-64 flex flex-col px-6'>
        <p className='lg:mr-auto max-w-[400px] mt-16 text-MylightGray leading-8 '>{currentData.firstParagraph}</p>
        <div className='flex items-center justify-between max-w-[100%] mx-auto mt-16 w-full'>
          <div className='flex flex-col space-y-10 my-10 lg:my-2 lg:text-[110px] text-5xl items-center justify-center font-rockSalt tracking-widest font-bold w-full '>
            <div
              style={{
                transform: `translateX(${
                  scrollPosition >= 900 && scrollPosition < 3500 ? `${scrollPosition - 1900}` : "500px"
                }px)`,
                willChange: "transform",
              }}
            >
              <EachLetterSeparator word={gameMode ? "Maniac" : "Creative"} />
            </div>
            <EachLetterSeparator word={gameMode ? "Passionate" : "Frontend"} />
            <div
              style={{
                transform: `translateX(${
                  scrollPosition >= 900 && scrollPosition < 3500 ? `${-scrollPosition + 1900}` : "500"
                }px)`,
                willChange: "transform",
              }}
            >
              <EachLetterSeparator word={gameMode ? "Gamer" : "Developer"} />
            </div>
          </div>
        </div>
        <p className='lg:ml-auto max-w-[320px] mt-16 text-MylightGray leading-8 relative duration-100'>
          {currentData.secondParagraph}
        </p>
      </div>
    </section>
  );
};

export default About;

interface Props {
  word: string;
}
function EachLetterSeparator({word}: Props) {
  return (
    <div className='flex   will-change-transform pointer-events-auto'>
      {word.split("").map((letter, key) => (
        <span key={key} className={` transition-all duration-300 `}>
          {letter}
        </span>
      ))}
    </div>
  );
}
