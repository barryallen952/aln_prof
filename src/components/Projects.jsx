import { useState, useEffect, useRef } from "react";
import { projects } from "../constants/projects";
import { ExternalLink, Github } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative font-mono"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto mb-20 text-center">
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-200 mb-6 tracking-tight font-sans">
              Research & Pipelines
            </h2>
            <p className="text-sm text-slate-400">
              [INFO] Fetching records... found {projects.length} significant
              implementations.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "relative group/wrapper bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors duration-500",
                "transform transition-all duration-1000",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12",
              )}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              {/* Terminal Header */}
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-wider">
                <span className="text-indigo-400">
                  Run ID:{" "}
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </span>
                {/* <span>Status: COMPLETED</span> */}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-200 mb-3 font-sans">
                  {project.title}
                </h3>

                {/* Data array visualization for tags */}
                <div className="text-xs mb-6 text-slate-500 flex flex-wrap gap-1">
                  params = [
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-emerald-400">
                      "{tag}"{i < project.tags.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  ]
                </div>

                <div className="relative h-48 mb-6 overflow-hidden border border-slate-800 group-hover/wrapper:border-indigo-500/30">
                  <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10 group-hover/wrapper:bg-transparent transition-colors duration-500 pointer-events-none" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover/wrapper:grayscale-0 transition-all duration-700 group-hover/wrapper:scale-105"
                  />
                  {/* Research metrics overlay */}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 h-20 overflow-y-auto pr-2 custom-scrollbar">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> [View_Details]
                    </a>
                  )}
                  {project.blog && (
                    <a
                      href={project.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> [Read_Blog]
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 ml-auto"
                    >
                      <Github className="w-4 h-4" /> source_code
                    </a>
                  )}
                </div>
              </div>
            </div>
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
            Execute GET/repos
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
