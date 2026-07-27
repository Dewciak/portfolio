import {setRequestLocale} from "next-intl/server";
import About from "../components/About";
import Blobs from "../components/Blobs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Gear from "../components/Gear";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Resume from "../components/Resume";
import Tech from "../components/Tech";

interface Props {
  params: {locale: string};
  searchParams: {gameMode?: string};
}

export default function Home({params, searchParams}: Props) {
  setRequestLocale(params.locale);

  const gameMode = searchParams.gameMode === "On";

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
