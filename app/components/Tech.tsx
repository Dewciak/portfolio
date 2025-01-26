"use client";
import React from "react";
import {motion} from "framer-motion";

import Html from "@/public/images/Tech-icons/html.png";
import Css from "@/public/images/Tech-icons/css.png";
import Javascript from "@/public/images/Tech-icons/javascript.png";
import Typescript from "@/public/images/Tech-icons/typescript.png";
import ReactPic from "@/public/images/Tech-icons/react.png";
import Next from "@/public/images/Tech-icons/nextjs.png";
import Tailwind from "@/public/images/Tech-icons/tailwind.png";
import Git from "@/public/images/Tech-icons/git.png";
import Photoshop from "@/public/images/Tech-icons/photoshop.png";
import Figma from "@/public/images/Tech-icons/figma.png";
import Spline from "@/public/images/Tech-icons/spline.png";
import MySql from "@/public/images/Tech-icons/mysql.png";
import Astro from "@/public/images/Tech-icons/astro.png";
import Image, {StaticImageData} from "next/image";

const Tech = () => {
  return (
    <section
      id='Tech'
      className='max-w-[1300px] flex flex-col mx-auto justify-start items-start space-y-10 mt-64 lg:mt-0 px-6 '
    >
      <h1 className='text-6xl font-bold'>
        <span>Tech</span> i work with
      </h1>
      <p className='max-w-[600px] text-MylightGray'>
        A selection of the powerful tools and technologies I utilize to create modern, responsive, and high-performance
        web applications. From front-end frameworks to design tools, these technologies help me craft seamless user
        experiences and ensure efficient, scalable development.
      </p>
      <div className='overflow-hidden w-full flex hover:cursor-grab active:cursor-grabbing '>
        <motion.div
          className='flex space-x-4 '
          drag='x'
          dragConstraints={{left: -2700, right: 0}}
          initial={{x: 0}}
          animate={{x: 0}}
          transition={{type: "spring", stiffness: 300, damping: 30}}
          style={{touchAction: "none"}}
        >
          <Card header='HTML' description='Markup language for structuring web content' icon={Html} />
          <Card header='CSS' description='Style sheet language for designing web pages' icon={Css} />
          <Card header='JavaScript' description='Programming language for dynamic web content' icon={Javascript} />
          <Card header='TypeScript' description='Superset of JavaScript that adds static types' icon={Typescript} />
          <Card header='React' description='JavaScript library for building user interfaces' icon={ReactPic} />
          <Card
            header='Next.js'
            description='React framework for server-side rendering and static websites'
            icon={Next}
          />
          <Card
            header='Astro'
            description='A framework for building fast, static websites using components from various libraries.'
            icon={Astro}
          />
          <Card
            header='TailwindCSS'
            description='Utility-first CSS framework for rapid UI development'
            icon={Tailwind}
          />
          <Card header='Git' description='Version control system for tracking changes in code' icon={Git} />
          <Card
            header='Photoshop'
            description='Image editing software for creating and manipulating graphics'
            icon={Photoshop}
          />
          <Card header='Figma' description='Collaborative interface design tool' icon={Figma} />
          <Card header='Spline' description='3D design and modeling tool' icon={Spline} />
          <Card header='MySQL' description='Relational database management system' icon={MySql} />
        </motion.div>
      </div>
    </section>
  );
};

export default Tech;

interface cardProps {
  header: string;
  description: string;
  icon: StaticImageData;
}

const Card = ({header, description, icon}: cardProps) => {
  return (
    <div className='w-[320px] h-[440px] bg-[#2C2C39] rounded-[20] flex flex-col '>
      <div className='h-[60%] flex items-center justify-center'>
        <Image src={icon} alt='icon' className='size-[130px]' />
      </div>
      <div className='w-full h-[40%] bg-[#1C1C21] rounded-b-[20] flex flex-col space-y-4 px-6 py-4'>
        <h2 className='text-xl'>{header}</h2>
        <p className='text-MylightGray'>{description}</p>
      </div>
    </div>
  );
};
