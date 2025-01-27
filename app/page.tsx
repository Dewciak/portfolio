import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Tech from "./components/Tech";
import Footer from "./components/Footer";
import About from "./components/About";
import Works from "./components/Works";
import Gear from "./components/Gear";
import Resume from "./components/Resume";
import Scene from "./components/StarBackground";

interface Props {
  searchParams: {gameMode: string};
}

export default function Home({searchParams}: Props) {
  return (
    <div>
      <Navbar gameMode={searchParams.gameMode} />
      <Hero gameMode={searchParams.gameMode} />
      <Tech />
      <About />
      <Works />
      <Resume />
      <Gear />
      <Footer />
    </div>
  );
}
