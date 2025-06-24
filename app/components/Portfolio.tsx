import React from "react";
import bailiffImage from "@/public/images/Bailiff.png";
import Image from "next/image";
import {IoIosClose} from "react-icons/io";
import {FaPlus} from "react-icons/fa6";
import {FaArrowLeft} from "react-icons/fa6";
import {FaArrowRight} from "react-icons/fa6";
import {IoMdRefresh} from "react-icons/io";
import {LuSettings2} from "react-icons/lu";
import {FaRegStar} from "react-icons/fa";
import {FaUserCircle} from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import BailiffLogo from "@/public/images/BailiffLogo.webp";
import {VscChromeMinimize} from "react-icons/vsc";
import Maximize from "@/public/images/Maximize.png";
import StolarstwoLogo from "@/public/images/StolarstwoLogo.png";
import FotoLogo from "@/public/images/FotoLogo.png";

const Portfolio = () => {
  return (
    <div className='flex flex-col text-center py-32 max-w-[1200px] mx-auto items-center justify-center'>
      <div className='flex flex-col space-y-6 justify-center items-center'>
        <span className='text-3xl font-bold'>Portfolio</span>
        <p className='max-w-[500px] text-TextColor font-bold text-4xl'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className='flex flex-col items-start mt-12 y-4 bg-[#1e1e1e] rounded-[25px]'>
        <div className='flex space-x-2 items-center px-4'>
          <div className='flex space-x-2 group'>
            <div className='w-3 h-3 bg-red-500 rounded-full flex items-center justify-center'>
              <IoIosClose className='hidden group group-hover:block duration-100 text-red-900 w-4 h-4 absolute' />
            </div>
            <div className='w-3 h-3 bg-[#f4bf4f] rounded-full items-center justify-center'>
              <VscChromeMinimize className='hidden group group-hover:block duration-100 text-yellow-900 w-3 h-3 absolute' />
            </div>
            <div className='w-3 h-3 bg-green-500 rounded-full flex justify-center items-center'>
              <FaPlus className='hidden group group-hover:block duration-100 text-green-900 w-2 h-2 absolute' />
            </div>
          </div>
          <div className='chrome-tab bg-[#1e1e1e] ml-6 flex justify-between items-center clip-inset-rounded w-[200px] p-2 rounded-t-lg -rounded-b-lg'>
            <Image src={StolarstwoLogo} alt='Bailiff Favicon' width={19} height={19} />

            <p>stolarstwokomen</p>
            <IoIosClose fill='#ffffff' size={24} />
          </div>
          <div className='chrome-tab bg-[#303134]  ml-4 flex justify-between items-center clip-inset-rounded w-[200px] p-2 rounded-t-lg -rounded-b-lg'>
            <Image src={BailiffLogo} alt='Carpentry Favicon' width={19} height={19} />
            <p>komornikddbielsko</p>
            <IoIosClose fill='#ffffff' size={24} />
          </div>
          <div className='chrome-tab bg-[#1e1e1e] ml-6 flex justify-between items-center clip-inset-rounded w-[200px] p-2 rounded-t-lg -rounded-b-lg'>
            <Image src={FotoLogo} alt='Fotography Favicon' width={19} height={19} />

            <p>patrycjadawid</p>
            <IoIosClose fill='#ffffff' size={24} />
          </div>
          <div className='opacity-50'>|</div>
          <FaPlus size={16} />
        </div>
        <div className='flex bg-[#303134] py-2 w-full px-4 pb-4 rounded-t-md justify-between items-center'>
          <div className='flex space-x-2'>
            <FaArrowLeft />
            <FaArrowRight />
            <IoMdRefresh />
          </div>
          <div className='bg-[#1d1d1d] rounded-full px-1 flex justify-between w-[85%] py-1 items-center'>
            <div className='flex space-x-2 text-TextColor'>
              <div className='bg-[#303134] rounded-full w-[22px] h-[22px] flex items-center justify-center'>
                <LuSettings2 />
              </div>
              <p>https://komornikddbielsko.pl/</p>
            </div>

            <FaRegStar className='mr-2' />
          </div>
          <div className='flex space-x-2'>
            <FaUserCircle />

            <BsThreeDotsVertical />
          </div>
        </div>
        <Image src={bailiffImage} alt='Bailiff image' className='w-[800px] mt-0 h-[460px] rounded-b-[20px] ' />
      </div>
      <h1 className='mt-10 text-4xl'>Bailiff Website</h1>
      <h2 className='mt-2 text-xl text-gray-400'>Lorem ipsum</h2>
      <div className='flex mt-6 space-x-4'>
        <div className='border text-gray-400 py-2 px-4 bg-[#c4c3c32b] border-[#ffffff44] rounded-full  backdrop-blur-xl hover:bg-[#c4c3c356] duration-200 '>
          <p>Typescript</p>
        </div>
        <div className='border text-gray-400 py-2 px-4 bg-[#c4c3c32b] border-[#ffffff44] rounded-full  backdrop-blur-xl hover:bg-[#c4c3c356] duration-200 '>
          <p>React</p>
        </div>{" "}
        <div className='border text-gray-400 py-2 px-4 bg-[#c4c3c32b] border-[#ffffff44] rounded-full  backdrop-blur-xl hover:bg-[#c4c3c356] duration-200 '>
          <p>Nextjs</p>
        </div>
      </div>
      <p className='text-center mt-6 max-w-[500px]'>
        This is the most advanced website I’ve created so far. From the design, which had to be purely informative due
        to legal constraints, to the technical aspects, it involved building an API that connects to a database, fetches
      </p>
    </div>
  );
};

export default Portfolio;
