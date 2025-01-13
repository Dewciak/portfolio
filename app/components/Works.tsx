import React from "react";
import HebelPlaceHolder from "@/public/images/Hebel.png";
import Image from "next/image";

const Works = () => {
  const techStack = ["React", "Next.js", "Tailwind", "React", "Typescript", "MySql", "Firebase"];
  return (
    <section className='max-w-[1300px] mx-auto flex flex-col justify-center items-center mt-64'>
      <div className='flex justify-between w-full items-end '>
        <h1 className='leading-[70%]'>
          My rescent <span>works</span>
        </h1>
        <select className='bg-transparent text-2xl mr-6 px-1'>
          <option>Carpentry website</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className='flex mt-28 justify-between'>
        <div className='flex flex-col w-[35%] space-y-10 px-6 items-start justify-center'>
          <h2 className='text-3xl font-bold '>Hebel Mebel</h2>
          <p className='text-lg'>
            I've worked in UI design and front-end development, so I can understand designs well and builds effective
            communication between team members.designs well and builds effective communication between team members.
          </p>
          <div className='flex space-x-10 '>
            <span>Visit live</span>
            <p className='underline underline-offset-4'>View vode</p>
          </div>
          <div className='flex flex-wrap gap-x-6 gap-y-6 text-[#7B7B7B]'>
            {techStack.map((techName, key) => (
              <p key={key}>{techName}</p>
            ))}
          </div>
        </div>
        <Image src={HebelPlaceHolder} alt='image' className='w-[60%] '></Image>
      </div>
    </section>
  );
};

export default Works;
