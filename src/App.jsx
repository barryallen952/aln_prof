import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Experience from "./components/ResumeSection";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import "@fontsource-variable/fraunces";

function App() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    const handle = () => {
      const pct =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[9999] h-[2px] pointer-events-none">
        <div
          id="progress-bar"
          className="h-full bg-indigo-500"
          style={{ width: "0%", boxShadow: "0 0 8px rgba(99,102,241,0.8)" }}
        />
      </div>
      <div className="overflow-x-hidden text-stone-300 antialiased relative">
        <SideNav />
        <div className="fixed inset-0 -z-10">
          <div className="relative h-full w-full bg-slate-950">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Technologies />
          <Projects />
          <Experience />
          <Writing />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
