import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Tech from "./components/Tech";
import Footer from "./components/Footer";
import About from "./components/About";
import Works from "./components/Works";
import Gear from "./components/Gear";
import Resume from "./components/Resume";
import {Metadata} from "next";
import Blobs from "./components/Blobs";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

interface Props {
  searchParams: {gameMode: string};
}

export default function Home({searchParams}: Props) {
  const gameMode = searchParams.gameMode === "On" ? true : false;
  return (
    <>
      <Blobs gameMode={gameMode} />
      <header>
        <Navbar gameMode={gameMode} />
      </header>
      <main>
        <Hero gameMode={gameMode} />

        <Portfolio />

        <Resume gameMode={gameMode} />
        <Tech gameMode={gameMode} />

        <About gameMode={gameMode} />

        <Gear gameMode={gameMode} />
        <Contact gameMode={gameMode} />
      </main>
      <footer>
        <Footer gameMode={gameMode} />
      </footer>
    </>
  );
}

export const metadata: Metadata = {
  title: "Wiktor Dawid | Personal Portfolio",
  description: "Portfolio of Wiktor Dawid, a frontend developer.",
};
