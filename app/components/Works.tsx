"use client";
import HebelPlaceHolder from "@/public/images/Hebel.png";
import Image from "next/image";
import React, {useEffect, useState} from "react";

import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface WorksDataJson {
  gameModeOn: Record<string, WorkItem>;
  gameModeOff: Record<string, WorkItem>;
}

interface WorkItem {
  header: string;
  description: string;
  tech: string;
  image?: string;
  mainLink: string;
  secondLink: string;
}

interface Props {
  gameMode: boolean;
}

const Works = ({gameMode}: Props) => {
  const [worksData, setWorksData] = useState<Record<string, WorkItem>>({});
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  const [selectedWebsite, setSelectedWebsite] = useState<string>(currentOptions[0]);

  useEffect(() => {
    const fetchWorksData = async () => {
      const response = await fetch(`/api/works?gameMode=${gameMode}`);
      const data = await response.json();
      setWorksData(data);

      const options = Object.keys(data);
      setCurrentOptions(options);
      setSelectedWebsite(options[0]);
    };

    fetchWorksData();
  }, [gameMode]);

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWebsite(event.target.value);
  };

  if (!selectedWebsite) {
    return (
      <section id='Works' className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-64 px-6'>
        <div className='flex justify-between w-full items-end flex-col lg:flex-row '>
          <h1 className='lg:leading-[70%] leading-[100%]'>
            My recent <span>works</span>
          </h1>
          <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' width={300} height={30} className='mr-10' />
        </div>
        <div className='flex lg:mt-28 mt-16 justify-between flex-col-reverse lg:flex-row'>
          <div className=' flex flex-col w-full lg:w-[40%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-16'>
            <h2 className='text-3xl font-bold '>
              <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' width={200} height={30} />
            </h2>
            <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
              <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' width={60} height={30} />
              <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' width={60} height={30} />
              <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' width={60} height={30} />
              <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' width={60} height={30} />
            </div>
            <p className='text-lg break-words max-w-[90%]'>
              <Skeleton count={5} baseColor='#9e9e9e' highlightColor='#444' width={400} height={30} />
            </p>
            <div className='flex space-x-10 '>
              <span>Visit&nbsp;live</span>
              <p className='h-4  rounded w-3/4 '>View video</p>
            </div>
          </div>
          <div className='w-[60%] h-[607px] '>
            <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' width={700} height={600} />
          </div>
        </div>
      </section>
    );
  }

  const selectedData = worksData[selectedWebsite];

  return (
    <section className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-64 px-6'>
      <div className='flex justify-between w-full items-end flex-col lg:flex-row '>
        <h1 className='lg:leading-[70%] leading-[100%]'>
          My recent <span>works</span>
        </h1>
        <select
          className='bg-transparent text-2xl lg:mr-6 px-1 mt-16 lg:mt-0'
          onChange={handleWebsiteChange}
          value={selectedWebsite}
        >
          {currentOptions.map((websiteName, key) => (
            <option key={key} value={websiteName}>
              {websiteName}
            </option>
          ))}
        </select>
      </div>
      <div className='flex lg:mt-28 mt-16 justify-between flex-col-reverse lg:flex-row'>
        <div className='flex flex-col w-full lg:w-[35%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-0'>
          <h2 className='text-3xl font-bold '>{selectedData.header}</h2>
          <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
            {selectedData.tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
          <p className='text-lg break-words max-w-[90%]'>{selectedData.description}</p>
          <div className='flex space-x-10 '>
            <Link href={selectedData.mainLink} target='blank'>
              <span>{gameMode ? "Check it out!" : "Visit live"}</span>
            </Link>
            {!gameMode && (
              <Link href={selectedData.secondLink} className='underline underline-offset-4' target='blank'>
                View code
              </Link>
            )}
          </div>
        </div>
        {!gameMode && <Image src={HebelPlaceHolder} alt='image' className='lg:w-[60%] w-full' />}
        {gameMode && (
          <iframe
            width='750'
            height='600'
            src={selectedData.image}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          ></iframe>
        )}
      </div>
    </section>
  );
};

export default Works;
