import React from "react";

const Blobs = () => {
  return (
    <div>
      <div
        className='fixed top-1/2 left-0 -translate-x-1/2 -translate-y-1/2
               h-[400px] w-[400px] rounded-full opacity-50 blur-[140px]
               bg-[radial-gradient(circle_at_center,_#ae29d6_0%,_transparent_70%)]
               pointer-events-none
               animate-[walkBlob_28s_ease-in-out_infinite] -z-10'
      />

      <div
        className='fixed top-1/3 left-2/3
               h-[400px] w-[400px] rounded-full opacity-50 blur-[160px]
               bg-[radial-gradient(circle_at_center,_#8357da_0%,_transparent_70%)]
               pointer-events-none
               animate-[walkBlob_34s_ease-in-out_infinite_reverse] delay-[6s] -z-10'
      />
      <div
        className='fixed top-0 left-0
               h-[400px] w-[400px] rounded-full opacity-50 blur-[160px]
              bg-[radial-gradient(circle_at_center,_#5785dd_0%,_transparent_70%)]

               pointer-events-none
               animate-[walkBlob_34s_ease-in-out_infinite_reverse] delay-[6s] -z-10'
      />
    </div>
  );
};

export default Blobs;
