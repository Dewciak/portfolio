"use client";
import {useTranslations} from "next-intl";
import {TypeAnimation} from "react-type-animation";

function OpenForWork({gameMode}: {gameMode: boolean}) {
  const t = useTranslations("resume");
  const phrases = t.raw("openForWork") as string[];

  return (
    <div className='flex items-center space-x-0 font-normal w-[280px] text-lg '>
      <div id='ping-dot' className='mr-4' />

      <TypeAnimation
        // Remount when the locale changes so the animation restarts in the new language
        key={phrases.join("|")}
        sequence={phrases.flatMap((phrase) => [phrase, 3000])}
        speed={50}
        wrapper='p'
        style={{display: "inline-block", marginLeft: "0.3rem", fontWeight: "bold"}}
        repeat={Infinity}
      />
    </div>
  );
}
export default OpenForWork;
