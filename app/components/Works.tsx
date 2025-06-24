"use client";
import React, {useEffect, useState} from "react";

import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CloudinaryVideo from "./CldVideo";

interface WorksDataJson {
  gameModeOn: Record<string, WorkItem>;
  gameModeOff: Record<string, WorkItem>;
}
// Define the structure of the JSON data

interface WorkItem {
  header: string;
  description: string;
  tech: string;
  image?: string;
  mainLink: string;
  secondLink: string;
}
// Define the structure of the work item

interface Props {
  gameMode: boolean;
}

const Works = ({gameMode}: Props) => {
  const [worksData, setWorksData] = useState<Record<string, WorkItem>>({});
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<string>(currentOptions[0]);
  const [error, setError] = useState<string | null>(null);
  // Define the state for the works data, current options, selected website, and error

  useEffect(() => {
    const fetchWorksData = async () => {
      try {
        const response = await fetch(`/api/works?gameMode=${gameMode}`);
        const data = await response.json();
        setWorksData(data);

        const options = Object.keys(data);
        setCurrentOptions(options);
        setSelectedWebsite(options[0]);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      }
    };

    fetchWorksData();
  }, [gameMode]);
  // Fetch the works data from the API

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWebsite(event.target.value);
  };

  if (!selectedWebsite) {
    return (
      <section id='Works' className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-64 px-6'>
        <div className='flex justify-between w-full items-end flex-col lg:flex-row '>
          <h1 className='lg:leading-[70%] leading-[100%]'>Portfolio</h1>
          <div className='w-full lg:w-[300px] h-[30px] lg:mr-10 mt-10 lg:mt-0'>
            <Skeleton count={1} baseColor='#9e9e9e' highlightColor='#444' className='w-full h-full' />
          </div>
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
              <p className='h-4  rounded w-3/4 '>View code</p>
            </div>
          </div>
          <div className='lg:w-[700px] lg:h-[607px] w-full h-[300px]'>
            <Skeleton
              count={1}
              baseColor='#9e9e9e'
              highlightColor='#444'
              className='lg:w-[700] lg:h-[600px] w-[90%] h-[300px]'
            />
          </div>
        </div>
      </section>
    );
  }
  // Display a skeleton loader while the data is being fetched

  const selectedData = worksData[selectedWebsite];

  return (
    <section
      id='Works'
      className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-32 lg:mt-64 px-6'
    >
      <div className='flex justify-between w-full items-end flex-col md:flex-row '>
        {!gameMode && <h1 className='lg:leading-[70%] leading-[100%]'>Portfolio</h1>}
        {gameMode && (
          <h1 className='lg:leading-[70%] leading-[100%]'>
            Rescently <span>played</span>
          </h1>
        )}
        <select
          className='z-[49] text-2xl lg:mr-6  mt-16 lg:mt-0 relative w-full md:w-[250px] bg-BackgroundColor mb-4 lg:mb- py-2 cursor-pointer 
          '
          onChange={handleWebsiteChange}
          value={selectedWebsite}
          tabIndex={19}
        >
          {currentOptions.map((websiteName, key) => (
            <option key={key} value={websiteName}>
              {websiteName}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col'></div>
      <div className='flex lg:mt-28 mt-8 justify-between flex-col-reverse lg:flex-row'>
        <div className='flex flex-col w-full lg:w-[50%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-0'>
          <h2 className='text-3xl font-bold mt-16 lg:mt-0'>{selectedData.header}</h2>
          <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
            {selectedData.tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
          <p className='text-lg break-words max-w-[90%]'>{selectedData.description}</p>
          <div className='flex space-x-10 '>
            <Link href={selectedData.mainLink} target='blank' tabIndex={20} role='button'>
              <span>{gameMode ? "Check it out!" : "Visit live"}</span>
            </Link>
            {!gameMode && (
              <Link
                href={selectedData.secondLink}
                className='underline underline-offset-4'
                target='blank'
                tabIndex={21}
                role='button'
              >
                View code
              </Link>
            )}
          </div>
        </div>

        {/* <CloudinaryVideo cloudName='dipqyxiqh' videoId={selectedData.image} /> */}
        <div className='w-[700px] h-[400px] bg-red-500' />
      </div>
      <div className='flex lg:mt-28 mt-8 justify-between flex-col-reverse lg:flex-row-reverse'>
        <div className='flex flex-col w-full lg:w-[50%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-0'>
          <h2 className='text-3xl font-bold mt-16 lg:mt-0'>{selectedData.header}</h2>
          <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
            {selectedData.tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
          <p className='text-lg break-words max-w-[90%]'>{selectedData.description}</p>
          <div className='flex space-x-10 '>
            <Link href={selectedData.mainLink} target='blank' tabIndex={20} role='button'>
              <span>{gameMode ? "Check it out!" : "Visit live"}</span>
            </Link>
            {!gameMode && (
              <Link
                href={selectedData.secondLink}
                className='underline underline-offset-4'
                target='blank'
                tabIndex={21}
                role='button'
              >
                View code
              </Link>
            )}
          </div>
        </div>

        {/* <CloudinaryVideo cloudName='dipqyxiqh' videoId={selectedData.image} /> */}
        <div className='w-[700px] h-[400px] bg-red-500' />
      </div>
      <div className='flex lg:mt-28 mt-8 justify-between flex-col-reverse lg:flex-row'>
        <div className='flex flex-col w-full lg:w-[50%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-0'>
          <h2 className='text-3xl font-bold mt-16 lg:mt-0'>{selectedData.header}</h2>
          <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
            {selectedData.tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
          <p className='text-lg break-words max-w-[90%]'>{selectedData.description}</p>
          <div className='flex space-x-10 '>
            <Link href={selectedData.mainLink} target='blank' tabIndex={20} role='button'>
              <span>{gameMode ? "Check it out!" : "Visit live"}</span>
            </Link>
            {!gameMode && (
              <Link
                href={selectedData.secondLink}
                className='underline underline-offset-4'
                target='blank'
                tabIndex={21}
                role='button'
              >
                View code
              </Link>
            )}
          </div>
        </div>

        {/* <CloudinaryVideo cloudName='dipqyxiqh' videoId={selectedData.image} /> */}
        <div className='w-[700px] h-[400px] bg-red-500' />
      </div>
      <div className='flex lg:mt-28 mt-8 justify-between flex-col-reverse lg:flex-row-reverse'>
        <div className='flex flex-col w-full lg:w-[50%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-0'>
          <h2 className='text-3xl font-bold mt-16 lg:mt-0'>{selectedData.header}</h2>
          <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
            {selectedData.tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
          <p className='text-lg break-words max-w-[90%]'>{selectedData.description}</p>
          <div className='flex space-x-10 '>
            <Link href={selectedData.mainLink} target='blank' tabIndex={20} role='button'>
              <span>{gameMode ? "Check it out!" : "Visit live"}</span>
            </Link>
            {!gameMode && (
              <Link
                href={selectedData.secondLink}
                className='underline underline-offset-4'
                target='blank'
                tabIndex={21}
                role='button'
              >
                View code
              </Link>
            )}
          </div>
        </div>

        {/* <CloudinaryVideo cloudName='dipqyxiqh' videoId={selectedData.image} /> */}
        <div className='w-[700px] h-[400px] bg-red-500' />
      </div>
    </section>
  );
};

export default Works;
