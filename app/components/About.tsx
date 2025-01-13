import React from "react";
import Me from "@/public/images/Me.jpg";
import Image from "next/image";

const About = () => {
  return (
    <section id='About' className='max-w-[1300px] mx-auto mt-64 flex flex-col'>
      {/* <h1 className='text-6xl font-bold '>
        <span>About</span> me
      </h1> */}
      <p className='mr-auto max-w-[320px] mt-16 text-MylightGray leading-8 '>
        I've worked in UI design and front-end development, so I can understand designs well and builds effective
        communication between team members.
      </p>
      <div className='flex items-center justify-between max-w-[100%] mx-auto mt-16'>
        {/* <Image className='size-[250px] rounded-[20]' src={Me} alt='MePicture'></Image> */}
        <div className='flex flex-col space-y-0 text-[110px] font-rockSalt tracking-widest font-bold'>
          <p className='AboutMainText'>Creative</p>
          <p className='AboutMainText ml-40'>Frontend</p>
          <p className='AboutMainText ml-60'>Developer</p>
        </div>
      </div>
      <p className='ml-auto max-w-[320px] mt-16 text-MylightGray leading-8'>
        Currently, I live in Seattle. In my personal life, I love to travel with my backpack, watch documentaries about
        geography, and explore new traditional music.
      </p>
    </section>
  );
};

export default About;
