import React from "react";

const Tech = () => {
  return (
    <section id='Tech' className='max-w-[1300px] flex flex-col mx-auto justify-start items-start space-y-10 '>
      <h1 className='text-6xl font-bold'>
        <span>Tech</span> i work with
      </h1>
      <p className='max-w-[600px] text-MylightGray'>
        Web and mobile development is dynamic and complex, with new solutions constantly emerging. I stay updated with
        these advancements to ensure I&apos;m using the best tools for the job. Here are some of the key technologies I
        work with
      </p>
      <div className='flex space-x-10'>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default Tech;

const Card = () => {
  return (
    <div className='w-[320px] h-[440] bg-[#2C2C39] rounded-[20] flex flex-col'>
      <div className='h-[60%]'></div>
      <div className='w-full h-[40%] bg-[#1C1C21] rounded-b-[20] flex flex-col space-y-4 px-6 py-4'>
        <h2 className='text-xl'>HTML</h2>
        <p className='text-MylightGray'>
          Web and mobile development is dynamic and complex, with new solutions constantly emerging.
        </p>
      </div>
    </div>
  );
};
