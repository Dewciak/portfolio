import Image from "next/image";
import React from "react";
import Cv from "@/public/images/cv.png";
import CodeSs from "@/public/images/ResumeCode.png";
const Resume = () => {
  return (
    <div className='flex flex-col mx-auto my-[360px] items-center'>
      <div className='flex justtify-center'>
        <div className='w-[360px] h-[544px] rounded-[17px] bg-white z-10 rotate-[-7deg]'>
          <Image src={Cv} alt='Cv' />
        </div>
        <div className='w-[360px] h-[544px] rounded-[17px] bg-gray-600 absolute ml-44 mt-12 rotate-[10deg]'>
          <Image src={CodeSs} alt='Code screen shot' className='object-cover h-full w-auto' />
        </div>
      </div>

      <p className='mt-40 text-2xl underline  decoration-ForegroundColor underline-offset-8'>View resume</p>
    </div>
  );
};

export default Resume;
