import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Tech from "./components/Tech";
import Footer from "./components/Footer";
import About from "./components/About";
import Works from "./components/Works";
import Gear from "./components/Gear";
import Resume from "./components/Resume";
import {useState} from "react";

interface Props {
  searchParams: {gameMode: string};
}

export default function Home({searchParams}: Props) {
  const gameMode = searchParams.gameMode === "On" ? true : false;
  return (
    <>
      <Navbar gameMode={gameMode} />
      <Hero gameMode={gameMode} />
      <Tech gameMode={gameMode} />
      <About gameMode={gameMode} />
      <Works gameMode={gameMode} />
      <Resume gameMode={gameMode} />
      <Gear gameMode={gameMode} />
      <Footer />
    </>
  );
}
