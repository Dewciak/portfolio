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
      className='max-w-[1250px]  mx-auto flex flex-col overflow-hidden mt-32 justify-start space-y-16'
    >
      <div className='flex space-x-4'>
        {" "}
        <FaRegUserCircle size={30} />
        <h2 className='font-bold text-3xl'>About Me</h2>
      </div>

      <div className='flex space-x-32 items-center justify-center'>
        <Image
          src={Me}
          alt='me'
          className=' h-[650px] w-[650px] object-cover rounded-lg rotate-2 p-20 hover:scale-105 hover:rotate-0 duration-300'
        ></Image>
        <div className=' flex flex-col max-w-[450px] text-justify '>
          <div className='flex space-x-12 font-black px-0'>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-4xl text-[#8357da]'>
                {/* @ts-ignore */}
                <CountUp start={0} end={22} duration={3} enableScrollSpy={true} scrollSpyDelay={5} />
              </strong>
              <p>
                Years <br />
                Old
              </p>
            </div>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-4xl text-[#8357da]'>
                {" "}
                <CountUp start={0} end={4} duration={3} enableScrollSpy={true} scrollSpyDelay={5} />
              </strong>
              <p>
                Studies <br /> Semester
              </p>
            </div>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-4xl text-[#8357da]'>
                {" "}
                <CountUp start={0} end={501} duration={3} enableScrollSpy={true} scrollSpyDelay={5} />
              </strong>
              <p>Commits</p>
            </div>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-4xl text-[#8357da]'>
                {" "}
                <CountUp start={0} end={1} duration={3} enableScrollSpy={true} scrollSpyDelay={5} />
              </strong>
              <p>Amstaff</p>
            </div>
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
