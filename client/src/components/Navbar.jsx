import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full top-0 left-0 slideTop opacity-0">
      <div
        className="
      w-full lg:w-[85%]
      flex justify-between items-center
      mx-auto shadow-[0_5px_40px_-20px_#7b00ff]
      py-8
      px-5 lg:px-15
      border-b border-[#A775FF]
      backdrop-blur-xl
    "
      >
        <Link to={"/"}>
          <h1 className="text-xl md:text-3xl syne text-white/70">
            RAJASEKAR.DEV
          </h1>
        </Link>
        <div className="flex justify-center items-center">
          <button
            className="
          px-5 py-1 rounded-lg border border-transparent
          text-black bg-[#A775FF]
          text-[0.5rem]
          md:text-[0.9rem]
          font-thin font-mono
          hover:scale-105 hover:border-[#7b00ff]
          hover:bg-transparent hover:text-[#A775FF] hover:shadow-[0_0_30px_#7b00ff]
          transition-all duration-200
        "
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar