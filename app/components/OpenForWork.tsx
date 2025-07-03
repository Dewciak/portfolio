import {TypeAnimation} from "react-type-animation";

function OpenForWork({gameMode}: {gameMode: boolean}) {
  return (
    <div className='flex items-center space-x-0 font-normal w-[260px] text-lg '>
      <div id='ping-dot' className='mr-4' />

      <TypeAnimation
        sequence={["Available immediately", 3000, "Open for work", 3000, "Ready for opportunitties", 3000]}
        speed={50}
        wrapper='p'
        style={{display: "inline-block", marginLeft: "0.3rem", fontWeight: "bold"}}
        repeat={Infinity}
      />
    </div>
  );
}
export default OpenForWork;
