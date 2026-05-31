import React, { useState, useEffect } from "react";
import Home_Logo from "../assets/images/logo.jpg";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Navbar = () => {
  const [cpuUsage, setCpuUsage] = useState(14);
  const [memoryUsage, setMemoryUsage] = useState(2.4);

  useEffect(() => {
    // Simulate dynamic system metrics
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 20) + 10); // Random 10-30%
      setMemoryUsage((2.0 + Math.random() * 1.5).toFixed(1)); // Random 2.0-3.5 GB
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full z-50 font-mono"id="navbar">
      {/* Top glowing data stream line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-900 overflow-hidden">
        <motion.div
          className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          style={{ width: "20%" }}
        />
      </div>

      <nav className="flex items-center justify-between py-5 px-4 sm:px-8 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        {/* Logo Section / Server Identity */}
        <div className="flex flex-shrink-0 items-center gap-4 group">
          <a
            href="/"
            aria-label="Home"
            className="relative block overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-colors p-1 bg-slate-950 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={Home_Logo}
              alt="Home Logo"
              className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
              width={45}
              height={24}
            />
          </a>
          <div className="hidden sm:flex flex-col">
            <span className="text-indigo-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">
              Root_Access
            </span>
            <span className="text-slate-500 text-[9px] tracking-wider leading-none">
              ~/portfolio/main
            </span>
          </div>
        </div>

        {/* Center: System Metrics (Creative Element) */}
        <div className="hidden lg:flex flex-1 mx-12 items-center justify-center gap-8 text-[10px] uppercase tracking-widest text-slate-400 bg-slate-900/50 border border-slate-800/50 rounded-full py-2 px-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">CPU</span>
            <div className="w-12 h-1.5 bg-slate-800 overflow-hidden relative rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
            <span className="w-6 text-indigo-300 text-right">{cpuUsage}%</span>
          </div>

          <div className="h-3 w-px bg-slate-700" />

          <div className="flex items-center gap-2">
            <span className="text-slate-500">MEM</span>
            <div className="w-12 h-1.5 bg-slate-800 overflow-hidden relative rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(memoryUsage / 16) * 100}%` }}
              />
            </div>
            <span className="w-8 text-emerald-400 text-right">
              {memoryUsage}G
            </span>
          </div>

          <div className="h-3 w-px bg-slate-700" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_5px_rgba(99,102,241,0.8)]" />
            <span className="text-indigo-400 font-bold">WS://SYNCED</span>
          </div>
        </div>

        {/* Right Section: Terminal-style social links */}
        <div className="flex items-center justify-center gap-3 text-xl">
          <a
            href="https://www.linkedin.com/in/rabin-poudel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 transition-all duration-300 group"
          >
            <FaLinkedin className="text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="hidden md:block text-[10px] tracking-widest uppercase font-semibold">
              --in
            </span>
          </a>

          <a
            href="https://www.github.com/rabinverse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 transition-all duration-300 group"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                filter: [
                  "drop-shadow(0 0 2px rgba(99,102,241,0.4))",
                  "drop-shadow(0 0 8px rgba(99,102,241,1))",
                  "drop-shadow(0 0 2px rgba(99,102,241,0.4))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaGithub className="text-indigo-500 group-hover:scale-110 transition-transform" />
            </motion.div>
            <span className="hidden md:block text-[10px] tracking-widest uppercase font-semibold">
              --git
            </span>
          </a>

          <a
            href="https://x.com/PoudelRabin5824?s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 transition-all duration-300 group"
          >
            <FaTwitter className="text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="hidden md:block text-[10px] tracking-widest uppercase font-semibold">
              --x
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
