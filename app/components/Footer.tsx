"use client";
import axios from "axios";
import Link from "next/link";
import {useEffect, useState} from "react";
import IconsSocials from "./IconsSocials";
import {FaGithub, FaRegEnvelope, FaLinkedinIn} from "react-icons/fa6";

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
    <footer id='Contact' className='relative w-full flex  lg:mt-[300px] mt-32 border-t-[0px] border-[hsl(0,0%,50%)] '>
      <div className='max-w-[1300px] flex flex-col mx-auto w-full px-6 py-4 pb-20'>
        {/* <div className='flex  lg:items-center max-w-[100%] flex-col lg:flex-row  space-y-6 lg:space-y-0 items-start justify-between '>
          <p className='font-bold text-5xl'>
            Let&apos;s <span>connect</span>.
          </p>
          <div className='flex items-center justify-between w-full lg:w-auto '>
            <FooterSocials />
            <p className='lg:hidden font-medium text-xl text-MylightGray'>wiktorskid@wp.pl</p>
          </div>
        </div> */}
        {/* <a href='mailto:wiktorskid@wp.pl' className='hidden lg:block mr-auto mt-6 font-medium text-xl no-underline '>
          wiktorskid@wp.pl
        </a> */}
        <div className='mx-auto flex flex-col mt-6 lg:mt-0 space-y-2 items-center justify-center'>
          <p className=' font-thin text-center text-[#A8A8A8] text-lg'>
            {data?.city}, {data?.time} (UTC +1) • {data?.temperature}°C
          </p>

          <p>© Copyright {currentYear} Wiktor Dawid </p>
        </div>
      </div>
      <Wave />
    </footer>
  );
};

export const dynamic = "force-dynamic";

export default Footer;

const FooterSocials = () => {
  return (
    <div className='flex space-x-4'>
      <a
        href='https://github.com/Dewciak/portfolio'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaGithub size={30} aria-label='GitHub' />
      </a>

      <a
        href='mailto:wiktorskid@wp.pl'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaRegEnvelope size={30} aria-label='Email' />
      </a>

      <a
        href='https://www.linkedin.com/in/wiktor-dawid-9145a2355'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaLinkedinIn size={30} aria-label='LinkedIn' />
      </a>
    </div>
  );
};

function Wave() {
  return (
    <div className='absolute w-full  -z-10 opacity-100 bottom-[0px]'>
      <svg
        className=' bottom-0 left-0 w-full z-10 h-full scale-y-100'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#8357da'
          fill-opacity='0.3'
          d='M0,32L80,53.3C160,75,320,117,480,117.3C640,117,800,75,960,69.3C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
        ></path>
      </svg>
    </div>
  );
}
