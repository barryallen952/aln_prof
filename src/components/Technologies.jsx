import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { technologies } from "../constants/technologiesData";

const LevelBar = ({ level }) => (
  <div className="flex flex-col items-center gap-0.5 w-full">
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.2, delay: i * 0.04 }}
          className={`w-[4px] h-[10px] rounded-sm ${
            i < level
              ? "bg-indigo-400 shadow-[0_0_4px_rgba(99,102,241,0.8)]"
              : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  </div>
);

const NodeItem = ({
  tech,
  globalIndex,
  isActive,
  sectionInView,
  onEnter,
  onLeave,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={
      sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
    }
    transition={{ duration: 0.4, delay: globalIndex * 0.05 }}
    className="flex flex-col items-center gap-4"
    style={{ width: "80px" }}
    onMouseEnter={() => onEnter(globalIndex)}
    onMouseLeave={onLeave}
  >
    {/* Node */}
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer flex-shrink-0">
      <a
        href={tech.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full outline-none"
      >
        {/* Outer glowing ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500 pointer-events-none ${
            isActive
              ? "border-indigo-400/60 scale-125"
              : "border-indigo-500/10 scale-100"
          }`}
        />

        {/* Spinning dashed ring */}
        <div
          className={`absolute inset-[-10px] rounded-full border border-dashed animate-[spin_10s_linear_infinite] transition-colors duration-500 pointer-events-none ${
            isActive ? "border-indigo-500/70" : "border-slate-700/25"
          }`}
        />

        {/* Ping pulse when active */}
        {isActive && (
          <div className="absolute inset-[-4px] rounded-full border border-indigo-400/40 animate-ping pointer-events-none" />
        )}

        {/* Main Node */}
        <div
          className={`relative w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden z-10 transition-all duration-300 ${
            isActive
              ? "border border-indigo-400 shadow-[0_0_24px_rgba(99,102,241,0.6)]"
              : "border border-slate-800 shadow-[0_0_8px_rgba(0,0,0,0.4)]"
          }`}
        >
          <div
            className={`absolute inset-0 transition-opacity duration-300 pointer-events-none bg-indigo-500/20 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`transition-all duration-300 relative z-20 ${
              isActive ? "grayscale-0 scale-110" : "grayscale-[70%] scale-100"
            }`}
          >
            {tech.icon ? (
              <tech.icon
                className={`text-3xl sm:text-4xl ${tech.color ?? "text-slate-400"}`}
              />
            ) : (
              <img
                src={tech.iconLink}
                alt={tech.IconName}
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
              />
            )}
          </div>
        </div>
      </a>
    </div>

    {/* Label + level bar — fixed height */}
    <div className="flex flex-col items-center h-12 justify-start gap-1.5">
      <span
        className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase transition-colors duration-300 ${
          isActive ? "text-indigo-300" : "text-indigo-600"
        }`}
      >
        {tech.IconName ?? tech.name}
      </span>

      <div
        className={`transition-all duration-300 ${isActive ? "opacity-100" : "opacity-40"}`}
      >
        {tech.level != null && <LevelBar level={tech.level} />}
      </div>
    </div>
  </motion.div>
);

const Technologies = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserHovering, setIsUserHovering] = useState(false);

  useEffect(() => {
    if (isUserHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % technologies.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isUserHovering]);

  const handleEnter = useCallback((idx) => {
    setIsUserHovering(true);
    setActiveIndex(idx);
  }, []);

  const handleLeave = useCallback(() => {
    setIsUserHovering(false);
  }, []);

  return (
    <div className="py-32 relative font-mono overflow-hidden" id="technologies">
      <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="text-center mb-20 relative z-20"
        ref={sectionRef}
        initial={{ opacity: 0, y: -30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-indigo-500/50" />
          <h2 className="text-xs text-indigo-400 uppercase tracking-[0.3em] font-bold">
            model.architecture()
          </h2>
          <div className="h-px w-12 bg-indigo-500/50" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-200 font-sans">
          Technology Graph
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-10 justify-items-center items-start">
          {technologies.map((tech, index) => (
            <NodeItem
              key={index}
              tech={tech}
              globalIndex={index}
              isActive={activeIndex === index}
              sectionInView={sectionInView}
              onEnter={handleEnter}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technologies;
