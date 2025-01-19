"use client";
import React, {useState} from "react";
import HebelPlaceHolder from "@/public/images/Hebel.png";
import Image from "next/image";

import websiteData from "@/app/components/textContent/Works.json";

interface WebsiteData {
  HebelMebel: {
    header: string;
    description: string;
    tech: string;
    image?: string;
    live: string;
    code: string;
  };
  DariuszDawid_KomornikSądowy: {
    header: string;
    description: string;
    tech: string;
    image?: string;
    live: string;
    code: string;
  };
  PatrycjaDawid_Fotografia: {
    header: string;
    description: string;
    tech: string;
    image?: string;
    live: string;
    code: string;
  };
}

const Works = () => {
  const [selectedWebsite, setSelectedWebsite] = useState<keyof WebsiteData>("HebelMebel");

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWebsite(event.target.value as keyof WebsiteData);
  };

  const techStack = ["React", "Next.js", "Tailwind", "React", "Typescript", "MySql", "Firebase"];
  return (
    <section className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-64 px-6'>
      <div className='flex justify-between w-full items-end flex-col lg:flex-row '>
        <h1 className='lg:leading-[70%] leading-[100%]'>
          My rescent <span>works</span>
        </h1>
        <select
          className='bg-transparent text-2xl mr-6 px-1 mt-16 lg:mt-0'
          onChange={handleWebsiteChange}
          value={selectedWebsite}
        >
          <option value={"HebelMebel"}>Carpentry website</option>
          <option value={"DariuszDawid_KomornikSądowy"}>Bailiff's website</option>
          <option value={"PatrycjaDawid_Fotografia"}>Animal Photography website</option>
        </select>
      </div>
      <div className='flex lg:mt-28 mt-16 justify-between flex-col-reverse lg:flex-row'>
        <div className='flex flex-col w-full lg:w-[35%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-16'>
          <h2 className='text-3xl font-bold '>{websiteData[selectedWebsite].header}</h2>
          <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
            {websiteData[selectedWebsite].tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
          <p className='text-lg break-words max-w-[90%]'>{websiteData[selectedWebsite].description}</p>
          <div className='flex space-x-10 '>
            <span>Visit live</span>
            <p className='underline underline-offset-4'>View vode</p>
          </div>
        </div>
        <Image src={HebelPlaceHolder} alt='image' className='lg:w-[60%] w-full'></Image>
      </div>
    </section>
  );
};

export default Works;
