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
    <section className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-64'>
      <div className='flex justify-between w-full items-end '>
        <h1 className='leading-[70%]'>
          My rescent <span>works</span>
        </h1>
        <select className='bg-transparent text-2xl mr-6 px-1' onChange={handleWebsiteChange} value={selectedWebsite}>
          <option value={"HebelMebel"}>Carpentry website</option>
          <option value={"DariuszDawid_KomornikSądowy"}>Bailiff's website</option>
          <option value={"PatrycjaDawid_Fotografia"}>Animal Photography website</option>
        </select>
      </div>
      <div className='flex mt-28 justify-between'>
        <div className='flex flex-col w-[35%] space-y-10 px-6 items-start justify-center'>
          <h2 className='text-3xl font-bold '>{websiteData[selectedWebsite].header}</h2>
          <p className='text-lg'>{websiteData[selectedWebsite].description}</p>
          <div className='flex space-x-10 '>
            <span>Visit live</span>
            <p className='underline underline-offset-4'>View vode</p>
          </div>
          <div className='flex flex-wrap gap-x-6 gap-y-6 text-[#7B7B7B]'>
            {websiteData[selectedWebsite].tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
        </div>
        <Image src={HebelPlaceHolder} alt='image' className='w-[60%] '></Image>
      </div>
    </section>
  );
};

export default Works;
