import React from 'react';
import { PiChatTeardropDotsThin } from "react-icons/pi";
import pfp from '../assets/jbcj0uqbihg41.jpg'
import HeroParticles from './HeroParticles';
import { LuGithub } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail, SiGeeksforgeeks } from "react-icons/si";
import { TbBrandLeetcode } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className='relative overflow-hidden flex flex-col-reverse md:flex-col 
    md:flex-row justify-center items-center min-h-screen md:h-screen bg-black/90 
    px-6 md:px-20 lg:px-40 py-30 md:py-0 gap-12 md:gap-8'>
      <HeroParticles />

      <div className='relative z-10 w-full md:w-1/2 flex flex-col justify-center items-start gap-4 md:gap-7'>
        <div className='flex flex-col slideRight opacity-0'>
          <div className='flex text-white/70 items-center gap-2 text-[0.5em] md:text-[0.8em] max-w-fit
        border border-[#A775FF] py-1 px-3 rounded-2xl shadow-[0_0_10px_#7b00ff] my-4
        '>
            <PiChatTeardropDotsThin className='text-white w-3 h-3' />
            <p>AVAILABLE FOR NEW PROJECTS AND FREE LANCING!</p>
          </div>
          <h1 className='text-2xl md:text-4xl text-white/60 syne'>
            Hello There!
          </h1>
          <h1 className='text-4xl md:text-6xl text-white flex md:translate-y-3 syne'>
            I am Rajasekar
          </h1>
          <p className='text-xl md:text-3xl mt-2 md:mt-7 text-white/80'>
            SoftWare Developer
          </p>
        </div>

        <p className='text-sm md:text-xl text-white/60 syne slideLeft opacity-0 leading-relaxed'>
          Crafting digital experiences that blend precision with artistic vision. <br className="hidden md:inline" />
          Specializing in high-end interfaces and modern aesthetics that <br className="hidden md:inline" />
          define the next generation of the web.
        </p>

        <div className=' flex w-full justify-start gap-5 slideTop opacity-0'>
          <button className="px-5 py-3 text-sm md:text-lg md:px-8 md:py-4 rounded-lg border border-[#A775FF] text-white/80 bg-gray-800
          hover:shadow-[0_0_30px_#7b00ff] transition-all duration-500 backdrop-blur-2xl
          hover:border-[#7b00ff] hover:text-white syne 
          ">
            View Work
          </button>
          <button className='px-5 py-3 text-sm md:text-lg md:px-8 md:py-4 rounded-lg border border-[#A775FF] text-white/80
          bg-transparent hover:shadow-[0_0_30px_#7b00ff] transition-all duration-500 syne'>
            Contact
          </button>
        </div>
        <div className='flex gap-7 text-[#A775FF] text-2xl pt-4 slideTop opacity-0'>
          <LuGithub className='hover:scale-125 transition-all duration-100 hover:text-white' />
          <FaLinkedin className='hover:scale-125 transition-all duration-100 hover:text-white' />
          <SiGmail className='hover:scale-125 transition-all duration-100 hover:text-white' />
          <TbBrandLeetcode className='hover:scale-125 transition-all duration-100 hover:text-white' />
          <SiGeeksforgeeks className='hover:scale-125 transition-all duration-100 hover:text-white' />
        </div>
        <button
          className="text-[1em]
          text-white/80 syne border-1 rounded-lg p-3 border-[#A775FF] md:text-[1.3em]
          hover:text-white/70 transition-all duration-400 bg-black
          hover:shadow-[0_0_50px_#7b00ff] delay-300 flex items-center gap-2 slideTop opacity-0
        "
        >
          Resume
          <IoNewspaperOutline className='text-[#A775FF]'/>
        </button>
      </div>
      <div className='relative z-10 w-full md:w-1/2 flex justify-center items-center'>
        <img
          src={pfp}
          alt="pfp"
          className='w-[16em] h-[16em] sm:w-[22em] sm:h-[22em] md:w-[24em] md:h-[24em] lg:w-[28em] lg:h-[28em] xl:w-[32em] xl:h-[32em] max-w-full aspect-square object-cover border border-[#7b00ff] border-4 shadow-[0_0_50px_#7b00ff] md:shadow-[0_0_1000px_#7b00ff] slideTop opacity-0'
        />
      </div>
    </div>
  )
}

export default Hero