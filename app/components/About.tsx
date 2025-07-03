"use client";
import Me from "@/public/images/Me.webp";
import Image from "next/image";
import CountUp from "react-countup";
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
  const stats = [
    {end: 22, label: ["Years", "Old"]},
    {end: 4, label: ["Studies", "Semester"]},
    {end: 501, label: ["Commits"]},
    {end: 1, label: ["Amstaff"]},
  ];

  return (
    <section
      id='About'
      className='max-w-[1250px]  mx-auto flex flex-col overflow-hidden mt-32 justify-start space-y-16   '
    >
      <div className='flex space-x-4 w-full text-center  items-center justify-center xl:justify-start'>
        <FaRegUserCircle size={30} className='hidden xl:block' />
        <h2 className='font-bold xl:text-3xl text-5xl'>About Me</h2>
      </div>

      <div className='flex xl:space-x-32 items-center justify-center flex-col xl:flex-row px-6 xl:px-0'>
        <Image
          src={Me}
          alt='me'
          className=' md:h-[650px] md:w-[650px] h-[600px]  object-cover rounded-lg xl:rotate-2 xl:p-20 md:hover:scale-105 hover:rotate-0 duration-300'
        />
        <div className=' flex flex-col xl:max-w-[450px] text-justify mt-10 xl:mt-0  max-w-[400px]'>
          <div className='flex flex-wrap justify-center xl:justify-between '>
            {stats.map((stat, index) => (
              <div key={index} className='flex flex-col items-center text-center py-4 w-1/2 xl:w-auto'>
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
            I’ve gained hands-on experience in UI design and front-end development through multiple side projects. With
            a solid understanding of programming principles and strong communication skills, I contribute to clear,
            cohesive project workflows.
          </p>
          <p className='mt-10'>
            I live in Kęty, Małopolska. In my free time, you’ll find me at the gym, out for a run, diving into hardware
            videos, or exploring new video games.
          </p>
          <p className='mt-10'>I also have a wonderful dog, Nero — he never fails to bring a smile to my face.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
