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
      <Blobs />
      <header>
        <Navbar gameMode={gameMode} />
      </header>
      <main>
        <Hero gameMode={gameMode} />

        {/* <Works gameMode={gameMode} /> */}
        <Portfolio gameMode={gameMode} />

        <Resume gameMode={gameMode} />
        <Tech gameMode={gameMode} />

        <About gameMode={gameMode} />

        <Gear gameMode={gameMode} />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export const metadata: Metadata = {
  title: "Wiktor Dawid Portfolio",
  description: "Portfolio of Wiktor Dawid, a frontend developer.",
};
