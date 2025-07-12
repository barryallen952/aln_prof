import { useState } from "react";
import reactLogo from "./assets/projects/project-1.webp";
import viteLogo from "./assets/projects/project-1.webp";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Experience from "./components/ResumeSection";
import Contact from "./components/Contact";
import '@fontsource/roboto';
import '@fontsource/montserrat';
import '@fontsource/poppins';
import '@fontsource/inter';
import '@fontsource/lato';
import About from "./components/About";
import Skills from "./components/Skills";


function App() {
  return (
    <>
      <div className="text-red overflow-x-hidden text-stone-300 antialiased">
        {/* antialiased for text-edge look good in good displays  */}
        <div className="fixed inset-0 -z-10">
          <div class="relative h-full w-full bg-slate-950">
            <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          </div>
        </div>
        <div className="container mx-auto px-8">
          <Navbar />
          <Hero />
          <Technologies />
          {/* <Skills /> */}
          <Projects />
          <Experience />
          <Contact /> 
        </div>
      </div>
    </>
  );
}

export default App;
