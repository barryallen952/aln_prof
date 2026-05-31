import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";


const Footer = () => {
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    "INFO: Initializing Rabin_v2.5.pt NLP model...",
    "SUCCESS: Data pipeline optimization complete (Latency: -42%)",
    "INFO: Deploying ML microservices via FastAPI...",
    "SUCCESS: PyTorch tensor embeddings generated.",
    "INFO: Running DVC pipeline to sync datasets...",
    "Awaiting new data streams...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 font-mono pt-16 pb-8 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top glowing data stream line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/4 w-1/4 h-[2px] bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,1)] animate-[ping_4s_linear_infinite]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left Column: Diagnostics */}
          <div className="flex flex-col gap-4">
            <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 border-b border-slate-800 pb-2">
              System Diagnostics
            </h3>
            <div className="text-[10px] text-slate-400 space-y-3 uppercase tracking-widest">
              <div className="flex justify-between items-center">
                <span>Core_Focus:</span>
                <span className="text-emerald-400 font-bold">
                  Data-Science, NLP, AI
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Primary_Lang:</span>
                <span className="text-indigo-300">Python</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span className="text-emerald-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                  Available_For_Hire
                </span>
              </div>
            </div>
          </div>

          {/* Middle Column: Terminal Log */}
          <div className="flex flex-col">
            <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-slate-800 pb-2">
              Process_Log
            </h3>
            <div className="bg-slate-900/80 border border-slate-800 p-4 h-32 flex flex-col justify-end overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              <p className="text-emerald-400 text-[10px] sm:text-xs">
                <span className="text-slate-500 mr-2">{">"}</span>
                {logs[logIndex]}
                <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-1 animate-pulse align-middle" />
              </p>

              {/* Previous log lines faded out */}
              <div className="absolute top-4 left-4 right-4 opacity-30 pointer-events-none">
                <p className="text-emerald-400 text-[10px] sm:text-xs truncate mb-2">
                  {"> "} {logs[(logIndex - 2 + logs.length) % logs.length]}
                </p>
                <p className="text-emerald-400 text-[10px] sm:text-xs truncate opacity-70">
                  {"> "} {logs[(logIndex - 1 + logs.length) % logs.length]}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: API Endpoints (Socials) */}
          <div className="flex flex-col">
            <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-slate-800 pb-2">
              External_Nodes
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/rabin-poudel"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 border border-slate-800 hover:border-indigo-500/50 bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FaLinkedin className="text-indigo-500 text-lg group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-300 uppercase tracking-widest transition-colors">
                    LinkedIn_Profile
                  </span>
                </div>
                <span className="text-[9px] text-slate-600 group-hover:text-indigo-500 transition-colors">
                  {"->"} Connect
                </span>
              </a>
              <a
                href="https://www.github.com/rabinverse"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 border border-slate-800 hover:border-indigo-500/50 bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      y: [0, -4, 0],
                      filter: [
                        "drop-shadow(0 0 2px rgba(99,102,241,0.4))",
                        "drop-shadow(0 0 8px rgba(99,102,241,1))",
                        "drop-shadow(0 0 2px rgba(99,102,241,0.4))",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaGithub className="text-indigo-500 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-300 uppercase tracking-widest transition-colors">
                    GitHub_Repo
                  </span>
                </div>
                <span className="text-[9px] text-slate-600 group-hover:text-indigo-500 transition-colors">
                  {"->"} View_Code
                </span>
              </a>
              <a
                href="https://x.com/PoudelRabin5824?s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 border border-slate-800 hover:border-indigo-500/50 bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FaTwitter className="text-indigo-500 text-lg group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-300 uppercase tracking-widest transition-colors">
                    X_Timeline
                  </span>
                </div>
                <span className="text-[9px] text-slate-600 group-hover:text-indigo-500 transition-colors">
                  {"->"} Follow
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-slate-800/80 gap-4">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Rabin Poudel. All rights reserved.
          </p>
          <div className="text-slate-600 text-[9px] uppercase tracking-[0.3em]">
            SESSION_ID:{" "}
            {Math.random().toString(36).substring(2, 12).toUpperCase()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
