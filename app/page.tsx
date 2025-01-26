import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Tech from "./components/Tech";
import Footer from "./components/Footer";
import About from "./components/About";
import Works from "./components/Works";
import Gear from "./components/Gear";
import Resume from "./components/Resume";
import Scene from "./components/StarBackground";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tech />
      <About />
      <Works />
      <Resume />
      <Gear />
      <Footer />
    </div>
  );
}
