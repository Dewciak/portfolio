"use client";
import axios from "axios";
import {useEffect, useState} from "react";

interface Response {
  time: string;
  temperature: number;
  city: string;
}

const Footer = ({gameMode}: {gameMode: boolean}) => {
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setForceUpdate] = useState<number>(0);

  // Fetching time and temperature
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const response = await axios.get<Response>("/api/time");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    intervalId = setInterval(() => {
      fetchData();
      setForceUpdate((prev) => prev + 1); // Force update to refresh the time
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative w-full flex  lg:mt-[450px] mt-[300px] border-t-[0px]  border-[hsl(0,0%,50%)] '>
      <div className='w-full mx-auto flex flex-col mt-6 lg:mt-0 space-y-2 items-center justify-center   bottom-6 lg:bottom-16 absolute left-[50%] translate-x-[-50%]'>
        <p className=' font-thin text-center text-[#A8A8A8] text-lg'>
          {data?.city}, {data?.time} (UTC +1) • {data?.temperature}°C
        </p>

        <p>© Copyright {currentYear} Wiktor Dawid </p>
      </div>

      <Wave gameMode={gameMode} />
    </footer>
  );
};

export const dynamic = "force-dynamic";

export default Footer;

function Wave({gameMode}: {gameMode: boolean}) {
  return (
    <div className='absolute w-full  -z-10 opacity-100 bottom-8 md:bottom-0'>
      <svg
        className=' bottom-0 left-0 w-full z-10 h-full md:scale-y-100 scale-y-[1.7]'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill={gameMode ? "#FB963F" : "#8357da"}
          fill-opacity='0.3'
          d='M0,32L80,53.3C160,75,320,117,480,117.3C640,117,800,75,960,69.3C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
        ></path>
      </svg>
    </div>
  );
}
