import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero'
import Cursor from './components/Cursor';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Feedback from './components/Feedback';

const App = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-20 bg-[url('./assets/background.png')] bg-cover bg-center bg-fixed opacity-40" />
      <div className="relative z-0">
        <Cursor />
        <Navbar />

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact/>
        <Feedback/>
      </div>
    </div>
  )
}
export default App