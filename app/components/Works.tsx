"use client";
import React, {useEffect, useMemo, useState} from "react";
import HebelPlaceHolder from "@/public/images/Hebel.png";
import Image from "next/image";

import WorksDataJson from "@/app/components/textContent/Works.json";

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
  gameMode: string;
}

const Works = ({gameMode}: Props) => {
  const WorksData = gameMode === "On" ? WorksDataJson.gameModeOn : WorksDataJson.gameModeOff;

  const gameModeOffOptions = ["PatrycjaDawid_Fotografia", "HebelMebel", "DariuszDawid_KomornikSądowy"];
  const gameModeOnOptions = ["POE2", "HebelMebel", "DariuszDawid_KomornikSądowy"];

  const currentOptions = useMemo(() => {
    return gameMode === "On" ? gameModeOnOptions : gameModeOffOptions;
  }, [gameMode]);

  const [selectedWebsite, setSelectedWebsite] = useState<string>(currentOptions[0]);

  useEffect(() => {
    // Validate and update selectedWebsite when currentOptions change
    const isValidOption = currentOptions.includes(selectedWebsite);
    if (!isValidOption) {
      setSelectedWebsite(currentOptions[0]);
    }
  }, [currentOptions, selectedWebsite]);

  useEffect(() => {
    // Reset selectedWebsite when gameMode changes
    setSelectedWebsite(currentOptions[0]);
  }, [gameMode, currentOptions]);

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWebsite(event.target.value);
  };

  return (
    <section className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-64 px-6'>
      <div className='flex justify-between w-full items-end flex-col lg:flex-row '>
        <h1 className='lg:leading-[70%] leading-[100%]'>
          My recent <span className={gameMode === "On" ? "game-mode-on" : "game-mode-off"}>works</span>
        </h1>
        <select
          className='bg-transparent text-2xl mr-6 px-1 mt-16 lg:mt-0'
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
        <div className='flex flex-col w-full lg:w-[35%] lg:space-y-10 space-y-6 lg:px-6 items-start justify-center mt-16'>
          <h2 className='text-3xl font-bold '>
            {" "}
            {WorksData[selectedWebsite as keyof typeof WorksData].header || "no project"}
          </h2>
          <div className='flex flex-wrap gap-x-4 gap-y-6 text-[#7B7B7B]'>
            {WorksData[selectedWebsite as keyof typeof WorksData]?.tech.split(" ").map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
          <p className='text-lg break-words max-w-[90%]'>
            {WorksData[selectedWebsite as keyof typeof WorksData].description}
          </p>
          <div className='flex space-x-10 '>
            <span className={gameMode === "On" ? "game-mode-on" : "game-mode-off"}>Visit live</span>
            <p className='underline underline-offset-4'>View video</p>
          </div>
        </div>
        <Image src={HebelPlaceHolder} alt='image' className='lg:w-[60%] w-full' />
      </div>
    </section>
  );
};

export default Works;
