"use client";
import websiteData from "@/app/components/textContent/About.json";
import {useEffect, useState} from "react";
import {FaRegUserCircle} from "react-icons/fa";
import Me from "@/public/images/Me.webp";
import Image from "next/image";
import CountUp from "react-countup";

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
  const stats = [
    {end: 22, label: ["Years", "Old"]},
    {end: 4, label: ["Studies", "Semester"]},
    {end: 501, label: ["Commits"]},
    {end: 1, label: ["Amstaff"]},
  ];
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  // Scroll event listener
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
    <section
      id='About'
      className='max-w-[1250px]  mx-auto flex flex-col overflow-hidden mt-32 justify-start space-y-16   '
    >
      <div className='flex space-x-4 w-full text-center  items-center justify-center md:justify-start'>
        <FaRegUserCircle size={30} className='hidden md:block' />
        <h2 className='font-bold md:text-3xl text-5xl'>About Me</h2>
      </div>

      <div className='flex md:space-x-32 items-center justify-center flex-col md:flex-row px-6 md:px-0'>
        <Image
          src={Me}
          alt='me'
          className=' md:h-[650px] md:w-[650px] h-[600px]  object-cover rounded-lg md:rotate-2 md:p-20 hover:scale-105 hover:rotate-0 duration-300'
        />
        <div className=' flex flex-col md:max-w-[450px] text-justify mt-10 md:mt-0'>
          <div className='flex flex-wrap justify-center md:justify-between '>
            {stats.map((stat, index) => (
              <div key={index} className='flex flex-col items-center text-center py-4 w-1/2 md:w-auto'>
                <strong className='text-4xl text-[#8357da]'>
                  <CountUp start={0} end={stat.end} duration={3} enableScrollSpy={true} scrollSpyDelay={5} />
                </strong>
                <div className='mt-1'>
                  {stat.label.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className='mt-10'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet a, distinctio voluptate eius sequi nesciunt
            nam earum neque nulla. Ipsam eligendi excepturi alias neque labore delectus praesentium ut quibusdam
            recusandae.
          </p>
          <p className='mt-10'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet a, distinctio voluptate eius sequi nesciunt
            nam earum neque nulla. Ipsam eligendi excepturi alias neque labore delectus praesentium ut quibusdam
            recusandae.
          </p>
          <p className='mt-10'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet a, distinctio voluptate eius sequi nesciunt
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
