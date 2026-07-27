"use client";

import {EMAIL, GITHUB_URL, LINKEDIN_URL} from "@/app/lib/links";
import {useLocale, useTranslations} from "next-intl";
import {FaConnectdevelop, FaGithub, FaLinkedinIn, FaRegEnvelope, FaRegUserCircle} from "react-icons/fa";
import {FiMessageSquare} from "react-icons/fi";
import {LuSend} from "react-icons/lu";
import {MdOutlineMailOutline} from "react-icons/md";

const Contact = ({gameMode}: {gameMode: boolean}) => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const focusBorder = gameMode ? "focus-within:border-[#fad461]" : "focus-within:border-[#8357da]";
  const focusIcon = gameMode ? "group-focus-within:text-[#fad461]" : "group-focus-within:text-[#8357da]";

  return (
    <section id='Contact'>
      <form
        action='https://api.web3forms.com/submit'
        method='POST'
        className='flex flex-col md:max-w-[550px] max-w-[95%] mx-auto md:p-10 p-6 backdrop-blur-lg lg:mt-[320px] mt-32 bg-red pb-20 space-y-10 border rounded-[30px] bg-[#ffffff1a]'
      >
        <input type='hidden' name='access_key' value='64cc9455-2d9f-4697-9cc2-1dcc08ecdaa8' />
        <input type='hidden' name='from_name' value='wiktordawid.pl' />
        <input type='hidden' name='language' value={locale} />

        <div className='flex justify-between md:items-center items-start'>
          <h1 className='gradient-text text-5xl md:text-7xl'>{t("heading")}</h1>
          <FaConnectdevelop
            size={40}
            className='text-ForegroundColor w-[40px] h-[40px] md:w-[50px] md:h-[50px] hover:animate-spin'
          />
        </div>

        <h2>{t("subheading")}</h2>

        {/* Name input */}
        <div
          className={`flex bg-[#fcfcfc0b] border p-3 rounded-lg items-center group transition-colors duration-300 ${focusBorder}`}
        >
          <FaRegUserCircle size={25} className={`text-[#9CA3AF] ${focusIcon}`} />
          <input
            type='text'
            name='name'
            className='bg-transparent w-full p-2 focus:outline-none'
            placeholder={t("namePlaceholder")}
            required
          />
        </div>

        {/* Email input */}
        <div
          className={`flex bg-[#fcfcfc0b] border p-3 rounded-lg items-center group transition-colors duration-300 ${focusBorder}`}
        >
          <MdOutlineMailOutline size={25} className={`text-[#9CA3AF] ${focusIcon}`} />
          <input
            type='email'
            name='email'
            className='bg-transparent w-full p-2 focus:outline-none'
            placeholder={t("emailPlaceholder")}
            required
          />
        </div>

        {/* Message textarea */}
        <div
          className={`flex bg-[#fcfcfc0b] border p-3 rounded-lg items-start space-x-2 group transition-colors duration-300 ${focusBorder}`}
        >
          <FiMessageSquare size={25} className={`text-[#9CA3AF] ${focusIcon}`} />
          <textarea
            name='message'
            className='bg-transparent pb-32 text-wrap w-full resize-none focus:outline-none'
            placeholder={t("messagePlaceholder")}
            required
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          />
        </div>

        {/* Submit button */}
        <button
          type='submit'
          className='flex items-center hover:scale-105 duration-300 justify-center w-full py-3 rounded-lg space-x-4'
          style={{background: "var(--Foreground-Color)"}}
        >
          <LuSend size={22} />
          <p>{t("submit")}</p>
        </button>

        <FooterSocials />
      </form>
    </section>
  );
};

export default Contact;

function FooterSocials() {
  const t = useTranslations("contact");

  return (
    <div className='flex space-x-6 w-full border p-4 rounded-lg backdrop-blur-lg justify-center items-center'>
      <a
        href={GITHUB_URL}
        target='_blank'
        rel='noreferrer'
        aria-label={t("github")}
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaGithub size={30} aria-hidden='true' />
      </a>

      <a
        href={`mailto:${EMAIL}`}
        aria-label={t("email")}
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaRegEnvelope size={30} aria-hidden='true' />
      </a>

      <a
        href={LINKEDIN_URL}
        target='_blank'
        rel='noreferrer'
        aria-label={t("linkedin")}
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaLinkedinIn size={30} aria-hidden='true' />
      </a>
    </div>
  );
}
