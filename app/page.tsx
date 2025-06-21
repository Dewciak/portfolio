import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Tech from "./components/Tech";
import Footer from "./components/Footer";
import About from "./components/About";
import Works from "./components/Works";
import Gear from "./components/Gear";
import Resume from "./components/Resume";
import {useState} from "react";
import {Metadata} from "next";
import IconsSocials from "./components/IconsSocials";

interface Props {
  searchParams: {gameMode: string};
}

export default function Home({searchParams}: Props) {
  const gameMode = searchParams.gameMode === "On" ? true : false;
  return (
    <div>
      <div
        className='fixed top-1/2 left-0 -translate-x-1/2 -translate-y-1/2
               h-[400px] w-[400px] rounded-full opacity-50 blur-[140px]
               bg-[radial-gradient(circle_at_center,_#ae29d6_0%,_transparent_70%)]
               pointer-events-none
               animate-[walkBlob_28s_ease-in-out_infinite] -z-10'
      />
      {/* 🟣 Blob #2 – inna trasa i rozmiar */}
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
      <Navbar gameMode={gameMode} />
      <main>
        <Hero gameMode={gameMode} />
        <Tech gameMode={gameMode} />
        <About gameMode={gameMode} />
        <Works gameMode={gameMode} />
        <Resume gameMode={gameMode} />
        <Gear gameMode={gameMode} />
      </main>
      <Footer />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Wiktor Dawid Portfolio",
  description: "Portfolio of Wiktor Dawid, a frontend developer.",
};
