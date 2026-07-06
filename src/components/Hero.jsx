import React from "react";
import profile_pic from "../assets/images/heroimg.png";
import { HERO_CONTENT, HERO_CONTENT_ANS } from "../constants/index.js";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const containerVarients = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.15 },
  },
};
const childVarients = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const ScrollIndicator = () => (
  <motion.div
    className="absolute mt-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 0.8 }}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-3 h-3 border-r-2 border-b-2 border-indigo-400 rotate-45"
        style={{
          animation: "pulse 1.6s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
          opacity: 0,
        }}
      />
    ))}
  </motion.div>
);

const Hero = () => {
  return (
    <section
      className="pb-12 pt-16 lg:pt-24 lg:mb-32 relative font-mono"
      id="hero"
    >
      {/* Matrix / Node background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950/80 to-slate-950"></div>
        <div className="absolute right-[10%] top-[20%] w-96 h-96 border-[1px] border-indigo-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute right-[15%] top-[25%] w-72 h-72 border-[1px] border-indigo-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute left-[5%] top-[10%] text-[8px] text-indigo-500/20 leading-tight hidden md:block">
          {"[CLS] Rabin Poudel [SEP] Data Engineer [SEP] ML [PAD] [PAD]"}
          <br />
          {"attention_weights = [0.89, 0.92, 0.99, 0.12]"}
          <br />
          {"embedding_dim: 768"}
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-row-reverse items-center">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-16 lg:mb-0">
          <div className="flex justify-center relative">
            <motion.div
              className="relative p-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative border border-indigo-500/30 bg-slate-950/50 p-2">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-indigo-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-indigo-400" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-indigo-400" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-indigo-400" />
                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-500/10 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                  <motion.div
                    className="absolute top-4 right-4 z-20 bg-slate-950/60 border border-indigo-500/30 px-2 py-1 text-[9px] text-indigo-300/90 backdrop-blur-sm pointer-events-none"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                  >
                    entity: PERSON
                    <br />
                    conf: 0.998
                  </motion.div>
                  <img
                    src={profile_pic}
                    alt="Profile Image"
                    className="w-full max-w-[600px] lg:max-w-[480px] object-cover filter contrast-125 grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 lg:pl-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVarients}
            className="flex flex-col items-start"
          >
            <motion.div
              variants={childVarients}
              className="mb-6 flex items-center gap-2 text-indigo-400 text-xs"
            >
              <span className="inline-block w-2 h-2 bg-indigo-500 animate-ping"></span>
              <span>
                Model loaded:{" "}
                <span className="text-slate-300">Rabin_v2.5.pt</span>
              </span>
            </motion.div>

            <motion.h1
              variants={childVarients}
              className="font-display pb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-200"
            >
              <span className="relative inline-block group mt-6">
                Rabin
                <span className="font-mono absolute -top-5 left-0 text-[10px] bg-indigo-500/20 text-indigo-300 px-1 border border-indigo-500/50 rounded-sm uppercase tracking-wider">
                  B-PER
                </span>
              </span>{" "}
              <span className="relative inline-block group mt-6">
                Poudel
                <span className="font-mono absolute -top-5 left-0 text-[10px] bg-indigo-500/20 text-indigo-300 px-1 border border-indigo-500/50 rounded-sm uppercase tracking-wider">
                  I-PER
                </span>
              </span>
            </motion.h1>

            <motion.div
              variants={childVarients}
              className="mb-8 flex flex-wrap items-center gap-2 text-sm"
            >
              <span className="text-slate-500">{"{"}</span>
              <span className="text-indigo-300">"role"</span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-900 border border-slate-700 px-2 py-1 text-emerald-400">
                <TypeAnimation
                  sequence={[
                    '"NLP Practitioner"',
                    2000,
                    '"ML Systems Builder"',
                    2000,
                    '"AI Researcher"',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
              <span className="text-slate-500">{"}"}</span>
            </motion.div>

            <motion.div
              variants={childVarients}
              className="w-full max-w-lg mb-10 bg-slate-900/30 border-l-2 border-indigo-500/50 pl-4 py-2"
            >
              <div className="mb-4">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">
                  Driven by a simple question:
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {HERO_CONTENT}
                </p>
              </div>
              <div className="relative mt-4 bg-slate-950 p-4 border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">
                  Generated_Output:
                </p>
                <p className="text-indigo-200 text-sm leading-relaxed">
                  {HERO_CONTENT_ANS}
                </p>
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={childVarients}
              className="flex items-center gap-4"
            >
              <a
                href="https://drive.google.com/file/d/1lHKmEiQo-mSIvNXfegg4Fo0gIhw3BY9h/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-indigo-500 px-6 py-3 text-xs text-slate-300 transition-colors"
              >
                <span className="text-indigo-400 font-bold">GET</span>
                <span>CV</span>
                <svg
                  className="w-4 h-4 ml-2 text-slate-500 group-hover:text-indigo-400 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                View Work
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
