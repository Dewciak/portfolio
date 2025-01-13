import React from "react";
import Me from "@/public/images/Me.jpg";
import Image from "next/image";

const About = () => {
  return (
    <div className='max-w-[1600px] mx-auto mt-32 flex flex-col'>
      <h1 className='text-6xl font-bold '>
        <span>About</span> me
      </h1>

      <div className='flex items-center justify-between max-w-[85%]'>
        <Image className='size-[250px] bg-red-500 rounded-[20]' src={Me} alt='MePicture'></Image>
        <div className='flex flex-col space-y-10 text-[100px]'>
          <h1 className='About-Text'>Creative</h1>
          <h1 className='About-Text ml-20'>Frontend</h1>
          <h1 className='About-Text ml-40'>Developer</h1>
        </div>
      </div>
      <p className='max-w-[500px]'>
        <span>I've </span>
        worked in UI design and front-end development, so I can understand designs well and builds effective
        communication between team members. ilds effective communicatioilds effective communication between
      </p>
    </div>
  );
};

export default About;
