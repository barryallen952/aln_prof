import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "../constants/projects";
import {
  ExternalLink,
  Github,
  Star,
  BookOpen,
  Maximize2,
  Wrench,
  X,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ProjectCard = ({ project, index, isVisible, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(project)}
    className={cn(
      "group text-left relative bg-slate-950 border border-slate-800 overflow-hidden",
      "hover:border-indigo-500/60 hover:-translate-y-1 transition-all duration-300",
      "focus:outline-none focus-visible:border-indigo-500",
      "transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
    )}
    style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    aria-label={`Open details for ${project.title}`}
  >
    {/* Thumbnail */}
    <div className="relative h-56 overflow-hidden">
      <img
        src={project.image}
        alt={`${project.title}, AI/ML project by Rabin Poudel`}
        loading="lazy"
        className="w-full h-full object-cover filter grayscale contrast-110 brightness-75 group-hover:grayscale-0 group-hover:brightness-90 scale-105 group-hover:scale-110 transition-all duration-700 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

      {/* Top row */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="px-2 py-0.5 bg-slate-950/70 backdrop-blur-sm border border-slate-700 text-indigo-300 text-[9px] uppercase tracking-widest">
          {project.category}
        </span>
        {project.featured && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-400/10 border border-amber-400/40 text-amber-300 text-[9px] uppercase tracking-widest">
            <Star className="w-2.5 h-2.5 fill-amber-300" /> Featured
          </span>
        )}
      </div>

      {/* Hover overlay — slides up over the image (no layout shift) */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none">
        <p className="text-slate-300 text-[13px] leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-indigo-500/15 border border-indigo-500/40 text-indigo-200 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-indigo-300 text-[9px] uppercase tracking-widest shrink-0">
            <Maximize2 className="w-3 h-3" /> View
          </span>
        </div>
      </div>
    </div>

    {/* Body — fixed, title only */}
    <div className="p-5">
      <h3 className="font-display text-xl font-semibold text-slate-100 leading-tight tracking-tight group-hover:text-white transition-colors">
        {project.title}
      </h3>
    </div>
  </button>
);

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm font-mono"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={`${project.title} details`}
  >
    <motion.div
      className="relative w-full max-w-2xl bg-slate-950 border border-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.15)] max-h-[90vh] overflow-y-auto custom-scrollbar"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-indigo-400/70 z-20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-indigo-400/70 z-20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-indigo-400/70 z-20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-indigo-400/70 z-20 pointer-events-none" />

      {/* Header bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-[10px] uppercase tracking-widest text-indigo-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-indigo-500 animate-pulse" />
          project_details.json
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex items-center justify-center w-7 h-7 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image */}
      <div className="relative h-52 sm:h-64 overflow-hidden border-b border-slate-800">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-slate-950/70 backdrop-blur-sm border border-slate-700 text-indigo-300 text-[9px] uppercase tracking-widest">
            {project.category}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-400/10 border border-amber-400/40 text-amber-300 text-[9px] uppercase tracking-widest">
              <Star className="w-2.5 h-2.5 fill-amber-300" /> Featured
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-display text-3xl font-semibold text-white leading-tight tracking-tight mb-5">
          {project.title}
        </h3>

        {/* Overview */}
        <div className="mb-7">
          <p className="text-[11px] mb-2">
            <span className="text-slate-600">"</span>
            <span className="text-indigo-300">overview</span>
            <span className="text-slate-600">":</span>
          </p>
          <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-indigo-500/40 pl-4">
            {project.description}
            <span className="inline-block w-[7px] h-4 bg-indigo-400/80 ml-1 align-middle animate-pulse" />
          </p>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tools used */}
        {project.tools?.length > 0 && (
          <div className="mb-8">
            <p className="text-[11px] mb-3 flex items-center gap-1.5">
              <Wrench className="w-3 h-3 text-emerald-400" />
              <span className="text-slate-600">$</span>
              <span className="text-emerald-300">pip install</span>
              <span className="text-slate-600">--tools</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool, i) => (
                <span
                  key={i}
                  className="group/tool inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-emerald-500/[0.07] border border-emerald-500/25 text-emerald-200/90 hover:border-emerald-400/60 hover:text-emerald-200 transition-colors"
                >
                  <span className="text-emerald-500/70 group-hover/tool:text-emerald-400">
                    #
                  </span>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-800">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.blog && (
            <a
              href={project.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Read Blog
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-indigo-300 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ml-auto"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  // Esc to close + lock body scroll while modal open.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const visibleProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative font-mono"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <div
            className={cn(
              "transition-all duration-1000 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12",
            )}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 mb-6 text-xs text-indigo-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-indigo-500 animate-pulse" />
              experiment_logs.csv
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-100 mb-6 tracking-tight">
              Projects
            </h2>
            <p className="font-display italic text-lg text-slate-400">
              some of my recent works.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-2 mb-14 transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold border transition-all duration-300",
                activeCategory === category
                  ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                  : "bg-slate-900 border-slate-800 text-slate-500 hover:border-indigo-500/40 hover:text-slate-300",
              )}
            >
              {category === "All"
                ? `All `
                : `${category} `}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
              onOpen={setSelected}
            />
          ))}
        </div>

        <div
          className={cn(
            "mt-20 text-center transition-all duration-1000 delay-500",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <a
            href="https://github.com/rabinverse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-slate-950 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
