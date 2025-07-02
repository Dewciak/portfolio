"use client";
import websiteData from "@/app/components/textContent/About.json";
import {useEffect, useState} from "react";
import {FaRegUserCircle} from "react-icons/fa";
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
        <div className='w-[700px] h-[500px] bg-red-500'></div>
        <div className=' flex flex-col max-w-[450px] text-justify '>
          <div className='flex space-x-12 font-black px-0'>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-3xl text-[#8357da]  '>22</strong>
              <p>
                Years <br />
                Old
              </p>
            </div>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-3xl text-[#8357da]'>4</strong>
              <p>
                Studies <br /> Semester
              </p>
            </div>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-3xl text-[#8357da]'>501</strong>
              <p>Commits</p>
            </div>
            <div className='flex flex-col space-y-2 w-[100px]'>
              <strong className='text-3xl text-[#8357da]'>1</strong>
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
        </div>
      </div>
    </section>
  );
};

export default About;
