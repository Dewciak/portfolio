import Spline from "@splinetool/react-spline";
import React, {Suspense} from "react";
import Laptop from "@/public/images/Laptop.png";
import Image from "next/image";

const Gear = () => {
  return (
    <section className='max-w-[1300px] mx-auto flex mt-64 flex-col'>
      <h1>
        My code <span>environment</span>
      </h1>
      <div className='flex'>
        <div className='w-[50%]'>
          <div className='flex space-x-10 py-16'>
            <p className='text-3xl font-bold'>Code setup</p>
            <p className='text-3xl font-bold text-[#636363]'>Game setup</p>
          </div>
          <div className='flex flex-col justify-center items-start space-y-12'>
            <GearItem />
            <GearItem />
            <GearItem />
            <GearItem />
          </div>
        </div>
        <div className='w-[50%]'>
          <Suspense fallback={<div>Loading...</div>}>
            <Spline scene='https://prod.spline.design/DHrmA9O3FtjyXCnz/scene.splinecode' />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Gear;

const GearItem = () => {
  return (
    <div className='flex space-x-6'>
      <div className='rounded-full bg-[#191919] size-[64px]'>
        <Image src={Laptop} alt='laptop' className='opacity-[0.6]' />
      </div>
      <div className='flex flex-col'>
        <p>Apple Macbook air M2 16gb</p>
        <p className='text-[#848484]'>
          I love it for almost everything, battery life <br />, performance, weight and apple ecosystems <br /> features
        </p>
      </div>
    </div>
  );
};
