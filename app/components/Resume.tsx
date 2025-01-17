import Image from "next/image";
import React from "react";
import Cv from "@/public/images/cv.png";
import CodeSs from "@/public/images/ResumeCode.png";
const Resume = () => {
  return (
    <div className='flex my-[360px] justify-center'>
      <div className='cv-image-box flex justify-center items-center flex-col group p-4'>
        <div className='flex justtify-center '>
          <div className='w-[360px] h-[544px] rounded-[17px] bg-white z-10 rotate-[-7deg] group-hover:scale-105 duration-300 group-hover:rotate-[-12deg]'>
            <Image src={Cv} alt='Cv' className='' />
          </div>
          <div className=' w-[360px] h-[544px] rounded-[17px] bg-gray-600 absolute ml-44 mt-12 rotate-[10deg] group-hover:scale-105 group-hover:rotate-[12deg] duration-300'>
            <Image src={CodeSs} alt='Code screen shot' className='object-cover h-full w-auto' />
          </div>
        </div>

        <p className='view-resume mt-32 text-2xl '>View resume</p>
      </div>
    </div>
  );
};

export default Resume;
