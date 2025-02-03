import Html from "@/public/images/Tech-icons/html.png";
import Css from "@/public/images/Tech-icons/css.png";
import Javascript from "@/public/images/Tech-icons/javascript.png";
import Typescript from "@/public/images/Tech-icons/typescript.png";
import ReactPic from "@/public/images/Tech-icons/react.png";
import Next from "@/public/images/Tech-icons/nextjs.png";
import Tailwind from "@/public/images/Tech-icons/tailwind.png";
import Git from "@/public/images/Tech-icons/git.png";
import Photoshop from "@/public/images/Tech-icons/photoshop.png";
import Figma from "@/public/images/Tech-icons/figma.png";
import Spline from "@/public/images/Tech-icons/spline.png";
import MySql from "@/public/images/Tech-icons/mysql.png";
import Astro from "@/public/images/Tech-icons/astro.png";
import Blender from "@/public/images/Tech-icons/blender.png";

import Witcher from "@/public/images/Game-icons/witcher.png";
import Cyberpunk from "@/public/images/Game-icons/cyberpunk.png";
import EldenRing from "@/public/images/Game-icons/eldenring.png";
import Rdr2 from "@/public/images/Game-icons/rdr2.png";
import Gow from "@/public/images/Game-icons/gow.png";
import Spiderman from "@/public/images/Game-icons/spiderman.png";
import Hades from "@/public/images/Game-icons/hades.png";
import Deadcells from "@/public/images/Game-icons/deadcells.png";
import Darksouls from "@/public/images/Game-icons/darksouls.png";
import Horizon from "@/public/images/Game-icons/horizon.png";
import Bioshock from "@/public/images/Game-icons/bioshock.png";
import Uncharted from "@/public/images/Game-icons/uncharted.png";

import Macbook from "@/public/images/Gear/Laptop.png";
import Monitor from "@/public/images/Gear/Monitor.png";
import Desk from "@/public/images/Gear/Desk.png";
import Speakers from "@/public/images/Gear/Speaker.png";

import Pc from "@/public/images/Gear/Pc.png";
import Ps5 from "@/public/images/Gear/Ps5.png";
import Tv from "@/public/images/Gear/Tv.png";
import Soundbar from "@/public/images/Gear/Soundbar.png";

import {StaticImageData} from "next/image";

const iconsMap: Record<string, StaticImageData> = {
  Html: Html,
  Css: Css,
  Javascript: Javascript,
  Typescript: Typescript,
  ReactPic: ReactPic,
  Next: Next,
  Tailwind: Tailwind,
  Git: Git,
  Photoshop: Photoshop,
  Figma: Figma,
  Spline: Spline,
  MySql: MySql,
  Astro: Astro,
  Blender: Blender,
  Witcher: Witcher,
  Cyberpunk: Cyberpunk,
  EldenRing: EldenRing,
  Rdr2: Rdr2,
  Macbook: Macbook,
  Monitor: Monitor,
  Desk: Desk,
  Speakers: Speakers,
  Pc: Pc,
  Ps5: Ps5,
  Tv: Tv,
  Soundbar: Soundbar,
  Gow: Gow,
  Spiderman: Spiderman,
  Hades: Hades,
  Deadcells: Deadcells,
  Darksouls: Darksouls,
  Horizon: Horizon,
  Bioshock: Bioshock,
  Uncharted: Uncharted,
};

export const getIcon = (iconName: string): StaticImageData | null => {
  return iconsMap[iconName];
};
