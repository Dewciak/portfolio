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

interface Props {
  searchParams: {gameMode: string};
}

export default function Home({searchParams}: Props) {
  const gameMode = searchParams.gameMode === "On" ? true : false;
  return (
    <>
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
    </>
  );
}

export const metadata: Metadata = {
  title: "Wiktor Dawid Portfolio",
  description: "Portfolio of Wiktor Dawid, a frontend developer.",
};
