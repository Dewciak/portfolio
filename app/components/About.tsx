"use client";
import React, {useEffect, useState} from "react";
import websiteData from "@/app/components/textContent/About.json";

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
  gameMode: string;
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
  const currentData = gameMode === "On" ? websiteData.gameModeOn : websiteData.gameModeOff;
  return (
    <section id='About' className='w-full overflow-hidden'>
      <div className='max-w-[1300px] mx-auto mt-64 flex flex-col px-6'>
        <p className='lg:mr-auto max-w-[320px] mt-16 text-MylightGray leading-8 '>{currentData.firstParagraph}</p>
        <div className='flex items-center justify-between max-w-[100%] mx-auto mt-16 w-full'>
          <div className='flex flex-col space-y-10 lg:text-[110px] text-5xl items-center justify-center font-rockSalt tracking-widest font-bold w-full '>
            <div
              style={{
                transform: `translateX(${
                  scrollPosition >= 900 && scrollPosition < 3500 ? `${scrollPosition - 2200}` : "500px"
                }px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <EachLetterSeparator gameMode={gameMode} word={gameMode === "On" ? "Maniac" : "Creative"} />
            </div>
            <EachLetterSeparator gameMode={gameMode} word={gameMode === "On" ? "Passionate" : "Frontend"} />
            <div
              style={{
                transform: `translateX(${
                  scrollPosition >= 900 && scrollPosition < 3500 ? `${-scrollPosition + 2200}` : "500"
                }px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <EachLetterSeparator gameMode={gameMode} word={gameMode === "On" ? "Gamer" : "Developer"} />
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
  gameMode: string;
}
function EachLetterSeparator({word, gameMode}: Props) {
  const [selectedLetter, setSelectedLetter] = useState<number | undefined>(undefined);
  return (
    <div className='flex  duration-150' onMouseLeave={() => setSelectedLetter(undefined)}>
      {word.split("").map((letter, key) => (
        <p
          key={key}
          className={`${gameMode === "On" ? "game-mode-on" : "game-mode-off"} duration-150 ${
            selectedLetter === key && "scale-[1.3]"
          } ${selectedLetter && selectedLetter - 1 === key && "scale-[1.15]"} ${
            selectedLetter && selectedLetter + 1 === key && "scale-[1.15]"
          }`}
          onMouseEnter={() => setSelectedLetter(key)}
        >
          {letter}
        </p>
      ))}
    </div>
  );
}
