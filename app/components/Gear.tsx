import Spline from "@splinetool/react-spline";
import React, {Suspense} from "react";
import Laptop from "@/public/images/Gear/Laptop.png";
import Image, {StaticImageData} from "next/image";
import Scene from "./Scene";

import GearDataJson from "./textContent/Gear.json";
import {getIcon} from "./getIcon";
import Samurai from "@/public/images/Samurai.png";
import Link from "next/link";

const Gear = ({gameMode}: {gameMode: boolean}) => {
  const selectedGear = gameMode ? GearDataJson.gameModeOn : GearDataJson.gameModeOff;
  return (
    <section className='max-w-[1300px] mx-auto flex mt-64 flex-col px-6'>
      <div className='flex justify-between relative '>
        <h1>
          {gameMode ? "My sweet" : "My code"} <span>{gameMode ? "kingdom" : "environment"}</span>
        </h1>

        <Image
          src={Samurai}
          alt='Samurai picture'
          className={`Samurai absolute lg:size-[370px] object-cover right-0 lg:top-[-200px] top-[-330px] size-[300px]   rotate-12 transition-opacity duration-150  ${
            gameMode ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className='flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-[50%] '>
          <div className='flex space-x-10 py-16 text-2xl lg:text-3xl'>
            <Link
              href='?gameMode=Off'
              scroll={false}
              className={`duration-150 font-bold ${gameMode ? "text-[#636363]" : ""}`}
            >
              Code setup
            </Link>
            <Link
              href='?gameMode=On'
              scroll={false}
              className={`duration-150 font-bold ${gameMode ? "" : "text-[#636363]"}`}
            >
              Game setup
            </Link>
          </div>
          <div className='flex flex-col  justify-center items-start space-y-12'>
            {selectedGear.map((gear, key) => (
              <GearItem key={key} title={gear.name} description={gear.description} icon={getIcon(gear.icon)!} />
            ))}
          </div>
        </div>
        <div className='w-[50%]'>{/* <Scene /> */}</div>
      </div>
    </section>
  );
};

export default Gear;

interface GearItemProps {
  title: string;
  description: string;
  icon: StaticImageData;
}

const GearItem = ({title, description, icon}: GearItemProps) => {
  return (
    <div className='flex space-x-6'>
      <div className='rounded-full bg-[#191919] size-[64px] p-1'>
        <Image src={icon} alt='laptop' className='opacity-[0.6] object-cover ' />
      </div>
      <div className='flex flex-col max-w-[70%]'>
        <p>{title}</p>
        <p className='text-[#848484]'>{description}</p>
      </div>
    </div>
  );
};
