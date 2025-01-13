import Image from "next/image";
import Navbar from "./components/Navbar";
import {Roboto} from "next/font/google";
import {Rock_Salt} from "next/font/google";
import Hero from "./components/Hero";
import Tech from "./components/Tech";
import Footer from "./components/Footer";
import About from "./components/About";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: ["400"],
});
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tech />
      <About />
      <Footer />
    </div>
  );
}
