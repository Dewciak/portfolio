import Cv from "@/public/images/cv.png";
import CodeSs from "@/public/images/ResumeCode.png";
import Steam from "@/public/images/steam.webp";
import Image from "next/image";
import Link from "next/link";
const Resume = ({gameMode}: {gameMode: boolean}) => {
  return (
    <section id='Resume' className=' flex mt-[160px]  lg:my-[340px] justify-center  w-full overflow-hidden '>
      <div className=' flex justify-center items-center flex-col  p-4 overflow-hidden w-full py-10 relative'>
        <div className='cv-image-box flex justtify-center mr-16 group '>
          <div className='lg:w-[360px] lg:h-[544px] w-[260px] h-[370px] overflow-hidden  rounded-[17px] bg-white z-10 rotate-[-7deg] group-hover:scale-105 duration-300 group-hover:rotate-[-12deg]'>
            <Image src={gameMode ? Steam : Cv} alt='Cv' className='' loading='lazy' />
          </div>
          <div className='overflow-hidden lg:w-[360px] lg:h-[544px] w-[260px] h-[370px]  rounded-[17px] absolute  ml-44 mt-12 rotate-[10deg] group-hover:scale-105 group-hover:rotate-[12deg] duration-300'>
            <Image loading='lazy' src={CodeSs} alt='Code screen shot' className='object-cover h-full w-auto' />
          </div>
        </div>

        <Link
          href={"https://docs.google.com/document/d/1EYLU0Js3A6Ty38V0ynXZbpGybL-jv2vckIot6LakuVQ/edit?usp=sharing"}
          className='view-resume mt-32 text-2xl cursor-pointer'
          target='blank'
        >
          {gameMode ? "My steam profile" : "View Resume"}
        </Link>
      </div>
    </section>
  );
};

export default Resume;
