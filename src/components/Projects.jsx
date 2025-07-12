import { useState, useEffect, useRef } from "react";
import { projects } from "../constants/projects";
import { ExternalLink, ChevronRight } from "lucide-react";

// Utility function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion className="div"></motion>
          <div
            className={cn(
              "transition-all duration-700 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-900 dark:text-gray-300">
              Explore some of my recent work in machine learning,
              showcasing practical applications and innovative solutions to
              complex problems.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden shadow-lg hover:shadow-xl",
                "transition-all duration-700 transform",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
                "bg-white dark:bg-gray-800 relative"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                  style={{
                    transform:
                      activeProject === index ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-xs py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full text-white">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                {project.blog && (
                  <button className="absolute top-4 right-4 text-xs py-1 px-4 bg-teal-900 backdrop-blur-sm rounded-full text-white">
                    <a
                      href={project.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blog
                    </a>
                  </button>
                )}
              </div>
              <div className="p-6 ">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex justify-end w-full ">
                  <button className="group">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex  items-center text-blue-600 cursor-pointern dark:text-blue-400 font-medium transition-all hover:text-blue-700 dark:hover:text-blue-300  group-hover:translate-x-1"
                    >
                      View Project
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-12 text-center",
            "transition-all duration-700 transform delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <a
            href="https://github.com/rabin20-04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
