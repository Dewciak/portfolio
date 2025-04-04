"use client";
import axios from "axios";
import Link from "next/link";
import {useEffect, useState} from "react";
import IconsSocials from "./IconsSocials";

interface Response {
  time: string;
  temperature: number;
  city: string;
}

const Footer = () => {
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
    <footer id='Contact' className=' w-full flex border-t-[1px] border-[#A8A8A8] lg:mt-44 mt-32'>
      <div className='max-w-[1300px] flex flex-col mx-auto lg:py-24 py-16 w-full px-6'>
        <div className='flex  lg:items-center max-w-[100%] flex-col lg:flex-row  space-y-6 lg:space-y-0 items-start justify-between '>
          <p className='font-bold text-5xl'>
            <span>Let&apos;s</span> connect.
          </p>
          <div className='flex items-center justify-between w-full lg:w-auto '>
            <IconsSocials />
            <p className='lg:hidden font-medium text-xl text-MylightGray'>wiktorskid@wp.pl</p>
          </div>
        </div>
        <a href='mailto:wiktorskid@wp.pl' className='hidden lg:block mr-auto mt-6 font-medium text-xl no-underline '>
          wiktorskid@wp.pl
        </a>
        <div className='mx-auto flex flex-col mt-6 lg:mt-0'>
          <span className='font-rockSalt text-center text-4xl font-bold py-10 '>Wiktor</span>
          <div className='font-thin text-center text-[#A8A8A8]'>
            <p className='text-white'>
              {data?.city}, {data?.time} (UTC +1) • {data?.temperature}°C
            </p>
            <p>
              Powered by Vercel, Next.js and{" "}
              <Link className='hover:underline' href='https://github.com/Dewciak/portfolio'>
                Github.
              </Link>
            </p>
            <p>
              Inspired by{" "}
              <a href='https://yasingenc.net/' className='hover:text-ForegroundColor' target='blank'>
                Yasin Genc portfolio
              </a>
            </p>
            <p>© 2025-{currentYear} | W. Dawid</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const dynamic = "force-dynamic";

export default Footer;
