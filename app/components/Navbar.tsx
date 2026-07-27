"use client";
import {Link as LocaleLink, usePathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {motion} from "framer-motion";
import {Twirl as Hamburger} from "hamburger-react";
import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {FaRegUser} from "react-icons/fa";
import {GrContact, GrProjects} from "react-icons/gr";
import {IoMdHome} from "react-icons/io";
import {LuGamepad} from "react-icons/lu";
import {SiReaddotcv} from "react-icons/si";
import {Link as ScrollLink} from "react-scroll";

interface NavbarProps {
  gameMode: boolean;
}

const Navbar = ({gameMode}: NavbarProps) => {
  const t = useTranslations("nav");
  const [mobileNav, setMobileNav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-accent-start", gameMode ? "#FB4311" : "#5785dd");
    root.style.setProperty("--theme-accent-middle", gameMode ? "#FB8C39" : "#8357da");
    root.style.setProperty("--theme-accent-end", gameMode ? "#FAD461" : "#AE29D6");
    root.style.setProperty("--theme-background", gameMode ? "#000000" : "#01000e");
  }, [gameMode]);
  // Function to change the color theme based on the game mode

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleGameModeChange(): Promise<void> {
    if (mobileNav) {
      setIsAnimating(true);
      setMobileNav(false);

      router.push(`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`, {scroll: false});
      await delay(300);
      setIsAnimating(false);

      setMobileNav(true);
    } else {
      setIsAnimating(true);
      router.push(`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`, {scroll: false});
      await delay(300);
      setIsAnimating(false);
    }
  }
  // Function to handle the game mode change with a delay for the animation

  return (
    <nav className=' w-full fixed z-[100] pointer-events-none '>
      <div className='hidden pointer-events-auto lg:flex backdrop-blur bg-BackgroundColor/30 items-center transition-colors duration-500 justify-between w-full mx-auto py-6 px-16'>
        <ScrollLink
          to='Home'
          activeClass='active'
          smooth={true}
          duration={200}
          offset={50}
          spy={true}
          className='text-xl font-bold flex space-x-2 cursor-pointer'
        >
          <span>&lt;</span>
          <p>Wiktor Dawid</p>
          <span>/&gt;.</span>
        </ScrollLink>

        <ul className='flex space-x-10  justify-center items-center text-md font-medium  '>
          <li>
            <ScrollLink
              to='Home'
              activeClass='active'
              className='cursor-pointer hover:text-[#848484]'
              smooth={true}
              duration={200}
              offset={50}
              spy={true}
            >
              {t("home")}
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to='Portfolio'
              activeClass='active'
              className='cursor-pointer hover:text-[#848484]'
              smooth={true}
              duration={200}
              offset={-140}
              spy={true}
            >
              {t("portfolio")}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to='Resume'
              activeClass='active'
              className='cursor-pointer hover:text-[#848484]'
              smooth={true}
              duration={200}
              offset={-100}
              spy={true}
            >
              {gameMode ? t("steam") : t("resume")}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to='About'
              activeClass='active'
              className='cursor-pointer hover:text-[#848484]'
              smooth={true}
              duration={200}
              offset={-100}
              spy={true}
            >
              {t("about")}
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to='Contact'
              activeClass='active'
              className='cursor-pointer hover:text-[#848484]'
              smooth={true}
              duration={200}
              offset={-150}
              spy={true}
            >
              {t("contact")}
            </ScrollLink>
          </li>
        </ul>

        <div className='flex items-center space-x-4'>
          <LocaleSwitch />
          <Link
            scroll={false}
            aria-label={t("gameModeToggle")}
            href={`${gameMode ? "?gameMode=Off" : "?gameMode=On"}`}
            className={`
              relative z-10 rounded-md  bg-[#F2F0ED]
              flex items-center justify-center space-x-2 py-1 px-4
               transition duration-300
              ${gameMode ? "shadow-[0_0_20px_rgba(251,67,17,0.4),0_0_40px_rgba(251,140,57,0.3),0_0_60px_rgba(250,212,97,0.2)]" : "shadow-[0_0_20px_rgba(87,133,221,0.4),0_0_40px_rgba(131,87,218,0.3),0_0_60px_rgba(174,41,214,0.2)]"}   `}
          >
            <p className={` hidden xl:flex ${gameMode ? "text-gray-400" : " text-black"}`}>{t("gameModeOff")}</p>
            <LuGamepad color='black' size={30} opacity={gameMode ? 1 : 0.3} />
          </Link>
        </div>
      </div>

      <MobileNav
        gameMode={gameMode}
        setMobileNav={setMobileNav}
        mobileNav={mobileNav}
        isAnimating={isAnimating}
        handleGameModeChange={handleGameModeChange}
      />
    </nav>
  );
};

export default Navbar;

function LocaleSwitch() {
  const t = useTranslations("nav");
  const activeLocale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Keep ?gameMode=On across a language change
  const query = Object.fromEntries(searchParams.entries());

  return (
    <div className='locale-switch' role='group' aria-label={t("languageLabel")}>
      {routing.locales.map((locale) => (
        <LocaleLink
          key={locale}
          href={{pathname, query}}
          locale={locale}
          scroll={false}
          hrefLang={locale}
          aria-current={locale === activeLocale}
          title={locale === "pl" ? t("languagePl") : t("languageEn")}
        >
          {locale.toUpperCase()}
        </LocaleLink>
      ))}
    </div>
  );
}

interface MobileNavProps {
  gameMode: boolean;
  setMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  mobileNav: boolean;
  isAnimating: boolean;
  handleGameModeChange: () => void;
}

function MobileNav({gameMode, setMobileNav, mobileNav, isAnimating, handleGameModeChange}: MobileNavProps) {
  const t = useTranslations("nav");

  return (
    <div className='pointer-events-auto lg:pointer-events-none'>
      <div className='flex lg:hidden justify-between items-center w-full px-4 py-8 '>
        <div className='flex space-x-2 ml-auto items-center'>
          <LocaleSwitch />

          <button
            type='button'
            aria-label={t("gameModeToggle")}
            onClick={() => handleGameModeChange()}
            className={`  rounded-full p-3 flex items-center justify-center duration-300 transition-colors ${
              gameMode ? "bg-[#141414]" : "bg-slate-900"
            }`}
          >
            <motion.div animate={{scale: isAnimating ? 1.2 : 1}} transition={{duration: 0.3, ease: "easeInOut"}}>
              <LuGamepad size={30} />
            </motion.div>
          </button>

          <div
            className={`  rounded-full text-gray-100 px-1 flex items-center justify-center duration-300 transition-colors
              ${gameMode ? "bg-[#141414]" : "bg-slate-900"}`}
          >
            <Hamburger size={24} onToggle={setMobileNav} toggled={mobileNav} label={t("label")} />
          </div>
        </div>
      </div>
      {mobileNav && (
        <div className='absolute top-12 left-0 w-full flex items-center justify-center sm:justify-end z-[-1] '>
          <motion.div
            className=' z-[-1] flex flex-col md:w-[450px] w-[90%] max-w-[450px] mt-32 left-[-1/2] transform translate-x-[50%] sm:mr-6   text-center '
            initial={{opacity: 0, x: 50}}
            animate={{
              opacity: mobileNav ? 1 : 0,
              x: mobileNav ? 0 : 50,
            }}
            exit={{opacity: 0, x: 50}}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div
              className={` w-full  text-slate-300  rounded-t-2xl  font-bold flex justify-start items-center ${
                gameMode ? "bg-[#141414]" : "bg-slate-800"
              }`}
            >
              <div className='w-[60px] border-l-2 border-t-2 py-8  border-ForegroundColor rounded-tl-2xl' />
              <h6 className='px-4 relative right-12'>{t("label")}</h6>
            </div>
            <ul className='flex flex-col'>
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='Home'
                  smooth={true}
                  duration={200}
                  offset={0}
                  spy={true}
                  className='nav-link'
                  onClick={() => setMobileNav(false)}
                >
                  {t("home")}
                </ScrollLink>
                <IoMdHome size={25} />
              </li>
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='Portfolio'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  className='nav-link'
                  onClick={() => setMobileNav(false)}
                >
                  {t("portfolio")}
                </ScrollLink>
                <GrProjects size={25} />
              </li>{" "}
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='Resume'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  className='nav-link'
                  onClick={() => setMobileNav(false)}
                >
                  {gameMode ? t("steam") : t("resume")}
                </ScrollLink>
                <SiReaddotcv size={25} />
              </li>
              <li
                className={`w-full  text-slate-300 py-4 border-b-[1px] ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                } px-6 font-medium flex justify-between items-center`}
              >
                <ScrollLink
                  to='About'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  className='nav-link'
                  onClick={() => setMobileNav(false)}
                >
                  {t("about")}
                </ScrollLink>
                <FaRegUser size={25} />
              </li>
              <div
                className={`w-full  text-slate-300  rounded-b-2xl  font-medium flex justify-between items-center ${
                  gameMode ? "bg-[#1f1f1f]" : "bg-slate-900"
                }`}
              >
                <ScrollLink
                  to='Contact'
                  className='px-6'
                  smooth={true}
                  duration={200}
                  offset={-100}
                  spy={true}
                  onClick={() => setMobileNav(false)}
                >
                  {t("contact")}
                </ScrollLink>
                <div className='flex items-center'>
                  <GrContact size={25} className='relative left-8' />
                  <div className='w-[60px] border-r-2 border-b-2 py-8  border-ForegroundColor rounded-br-2xl' />
                </div>
              </div>
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
}
