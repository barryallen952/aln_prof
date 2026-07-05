import React from "react";
import { Link } from "react-router-dom";
import Home_Logo from "../assets/images/logo.jpg";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <header className="relative w-full z-50 font-mono" id="navbar">
      {/* Top glowing data stream line */}

      <nav className="flex items-center justify-between py-5 px-4 sm:px-8 ">
        {/* Logo Section / Server Identity */}
        <div className="flex flex-shrink-0 items-center gap-4 group">
          <a
            href="/"
            aria-label="Home"
            className="relative block overflow-hidden  transition-colors p-1 bg-slate-950 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute  bottom-0 right-0 w-1.5 h-1.5  border-b-2 border-r-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={Home_Logo}
              alt="Home Logo"
              className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
              width={70}
              height={42}
            />
          </a>
        </div>

        {/* Right Section: Terminal-style social links */}
        <div className="flex items-center justify-center gap-3 text-xl">
          <Link
            to="/blogs"
            aria-label="Blog"
            className="group relative flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/40 hover:bg-indigo-500/20 hover:border-indigo-400 text-indigo-300 hover:text-indigo-200 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent transition-transform duration-700" />
            <BookOpen className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-widest uppercase font-semibold">
              blog
            </span>
          </Link>

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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
