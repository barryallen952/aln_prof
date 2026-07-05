import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { techDomains } from "../constants/technologiesData";

const allTechs = techDomains.flatMap((d) => d.technologies);

// Bento spans per domain — sized by node count so everything fits one screen.
const cellSpan = {
  genai: "sm:col-span-2 lg:col-span-4",
  datastores: "lg:col-span-2",
  ml: "lg:col-span-2",
  mlops: "lg:col-span-2",
  web: "lg:col-span-2",
};

// Offsets into the flat tech list so hover/auto-cycle share one active index.
const domainOffsets = techDomains.reduce((acc, domain, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + techDomains[i - 1].technologies.length);
  return acc;
}, []);

// Proficiency ring: conic arc around the node, filled to level/10.
const ring = (level, active = false) => ({
  background: `conic-gradient(from 0deg, rgba(129,140,248,${active ? 1 : 0.7}) ${
    (level ?? 0) * 36
  }deg, rgba(51,65,85,0.45) ${(level ?? 0) * 36}deg)`,
});

const Node = ({ tech, index, globalIndex, isActive, onEnter, onLeave }) => (
  <motion.a
    href={tech.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.6 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.4,
      delay: index * 0.04,
      type: "spring",
      stiffness: 200,
      damping: 15,
    }}
    className="group flex flex-col items-center gap-1.5 w-16"
    onMouseEnter={() => onEnter(globalIndex)}
    onMouseLeave={onLeave}
  >
    <div className="relative">
      {/* Spinning dashed ring when active */}
      <div
        className={`absolute inset-[-6px] rounded-full border border-dashed animate-[spin_10s_linear_infinite] transition-colors duration-500 pointer-events-none ${
          isActive ? "border-indigo-500/70" : "border-transparent"
        }`}
      />
      {/* Ping pulse when active */}
      {isActive && (
        <div className="absolute inset-[-3px] rounded-full border border-indigo-400/40 animate-ping pointer-events-none" />
      )}

      <div
        className={`rounded-full p-[2.5px] transition-all duration-300 ${
          isActive
            ? "scale-110 shadow-[0_0_18px_rgba(99,102,241,0.55)]"
            : "scale-100"
        }`}
        style={ring(tech.level, isActive)}
      >
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
          <span
            className={`flex items-center justify-center transition-all duration-300 ${
              isActive ? "grayscale-0 opacity-100" : "grayscale-[50%] opacity-95"
            }`}
          >
            {tech.icon ? (
              <tech.icon
                className={`text-xl sm:text-2xl ${tech.color ?? "text-slate-400"}`}
              />
            ) : (
              <img
                src={tech.iconLink}
                alt={tech.IconName}
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded-full"
              />
            )}
          </span>
        </div>
      </div>
    </div>

    <span
      className={`text-[8px] sm:text-[9px] uppercase tracking-wider text-center leading-tight transition-colors duration-300 ${
        isActive ? "text-indigo-300" : "text-slate-500"
      }`}
    >
      {tech.IconName}
    </span>
  </motion.a>
);

const DomainCell = ({
  domain,
  index,
  activeIndex,
  onEnter,
  onLeave,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className={`relative border border-slate-800/70 bg-slate-950/60 hover:border-indigo-500/40 transition-colors duration-500 p-4 flex flex-col ${
      cellSpan[domain.id] ?? ""
    }`}
  >
    {/* Corner tick */}
    <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-indigo-500/70" />

    <div className="flex items-baseline justify-between gap-2 mb-4">
      <div className="flex items-baseline gap-2 min-w-0">
        <span className="text-indigo-500/60 text-[9px] shrink-0">
          /{String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="text-slate-200 text-xs sm:text-sm font-bold font-sans tracking-tight truncate"
          title={domain.caption}
        >
          {domain.title}
        </h3>
      </div>
      <span className="text-[8px] text-slate-600 uppercase tracking-widest shrink-0">
        {domain.technologies.length}x
      </span>
    </div>

    <div className="flex flex-wrap gap-x-3 gap-y-3 justify-center content-center flex-1">
      {domain.technologies.map((tech, i) => {
        const globalIndex = domainOffsets[index] + i;
        return (
          <Node
            key={tech.IconName}
            tech={tech}
            index={i}
            globalIndex={globalIndex}
            isActive={activeIndex === globalIndex}
            onEnter={onEnter}
            onLeave={onLeave}
          />
        );
      })}
    </div>
  </motion.div>
);

const Technologies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserHovering, setIsUserHovering] = useState(false);

  useEffect(() => {
    if (isUserHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allTechs.length);
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
    <section
      id="technologies"
      className="relative font-mono py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-indigo-500 text-[10px] tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            model.architecture()
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-200 font-sans">
            Skills & Technologies
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            <span className="text-indigo-400">$</span> The tech stack powering my builds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {techDomains.map((domain, index) => (
            <DomainCell
              key={domain.id}
              domain={domain}
              index={index}
              activeIndex={activeIndex}
              onEnter={handleEnter}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
