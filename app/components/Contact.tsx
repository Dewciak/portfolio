"use client";

import {FaConnectdevelop, FaGithub, FaLinkedinIn, FaRegEnvelope, FaRegUserCircle} from "react-icons/fa";
import {FiMessageSquare} from "react-icons/fi";
import {LuSend} from "react-icons/lu";
import {MdOutlineMailOutline} from "react-icons/md";

const Contact = ({gameMode}: {gameMode: boolean}) => {
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

        <div className='flex justify-between md:items-center items-start'>
          <h1 className='gradient-text text-5xl md:text-7xl'>Get In Touch</h1>
          <FaConnectdevelop
            size={40}
            className='text-ForegroundColor w-[40px] h-[40px] md:w-[50px] md:h-[50px] hover:animate-spin'
          />
        </div>

        <h2>Have something to discuss? Send me a message and let's talk.</h2>

        {/* Name input */}
        <div
          className={`flex bg-[#fcfcfc0b] border p-3 rounded-lg items-center group transition-colors duration-300 ${focusBorder}`}
        >
          <FaRegUserCircle size={25} className={`text-[#9CA3AF] ${focusIcon}`} />
          <input
            type='text'
            name='name'
            className='bg-transparent w-full p-2 focus:outline-none'
            placeholder='Your Name'
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
            placeholder='Your Email'
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
            placeholder='Your Message'
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
          className={`bg-gradient-to-r flex items-center hover:scale-105 duration-300 justify-center ${
            gameMode ? "from-[#FB4311] via-[#FB8C39] to-[#FAD461]" : "from-[#5785dd] via-[#8357da] to-[#ae29d6]"
          } w-full py-3 rounded-lg space-x-4`}
        >
          <LuSend size={22} />
          <p>Send message</p>
        </button>

        <FooterSocials />
      </form>
    </section>
  );
};

export default Contact;

function FooterSocials() {
  return (
    <div className='flex space-x-6 w-full border p-4 rounded-lg backdrop-blur-lg justify-center items-center'>
      <a
        href='https://github.com/Dewciak/portfolio'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaGithub size={30} aria-label='GitHub' />
      </a>

      <a
        href='mailto:wiktorskid@wp.pl'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaRegEnvelope size={30} aria-label='Email' />
      </a>

      <a
        href='https://www.linkedin.com/in/wiktor-dawid-9145a2355'
        target='_blank'
        rel='noreferrer'
        className='social-Icon cursor-pointer text-white hover:text-white'
      >
        <FaLinkedinIn size={30} aria-label='LinkedIn' />
      </a>
    </div>
  );
}
