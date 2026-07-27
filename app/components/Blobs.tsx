const Blobs = (_props: {gameMode: boolean}) => {
  return (
    <div>
      <div
        className='fixed top-1/2 left-0 -translate-x-1/2 -translate-y-1/2
               h-[400px] w-[400px] rounded-full opacity-50 blur-[140px]
               pointer-events-none
               animate-[walkBlob_28s_ease-in-out_infinite] -z-10'
        style={{background: "radial-gradient(circle at center, var(--theme-accent-end) 0%, transparent 70%)"}}
      />

      <div
        className='fixed top-1/3 left-2/3
               h-[400px] w-[400px] rounded-full opacity-50 blur-[160px]
               pointer-events-none
               animate-[walkBlob_34s_ease-in-out_infinite_reverse] delay-[6s] -z-10'
        style={{background: "radial-gradient(circle at center, var(--theme-accent-middle) 0%, transparent 70%)"}}
      />
      <div
        className='fixed top-0 left-0
               h-[400px] w-[400px] rounded-full opacity-50 blur-[160px]
               pointer-events-none
               animate-[walkBlob_34s_ease-in-out_infinite_reverse] delay-[6s] -z-10'
        style={{background: "radial-gradient(circle at center, var(--theme-accent-start) 0%, transparent 70%)"}}
      />
    </div>
  );
};

export default Blobs;
