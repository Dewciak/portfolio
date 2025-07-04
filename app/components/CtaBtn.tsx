"use client";
import {Link} from "react-scroll";

const CtaBtn = ({text}: {text: string}) => {
  return (
    <Link to='Portfolio' className='flex flex-col relative  group pb-2 md:pb-0'>
      <button
        className='cta-button relative px-6 py-3 bg-white text-black 
        duration-300  border transition-transform
        font-semibold
        md:group-hover:translate-y-2 group-hover:translate-x-2'
      >
        <span className='relative z-10'>{text}</span>

        {/* Warstwa z gradientem */}
      </button>
      <span
        aria-hidden='true'
        className='
          absolute inset-0 -z-10 
          transition-transform duration-300 ease-out
          translate-x-2 translate-y-2
          
        '
        style={{background: "var(--Foreground-Color)"}}
      />
    </Link>
  );
};

export default CtaBtn;
