import Image from "next/image";
import Navbar from "./components/Navbar";
import {Roboto} from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Home() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
