import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { resumeData } from "../constants/resumeData";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const JupyterCell = ({ item, type, index }) => (
  <motion.div variants={itemVariants} className="mb-8 flex gap-4 w-full group">
    <div className="text-indigo-500/50 font-mono text-xs pt-1 shrink-0 w-12 text-right">
      In [{index + 1}]:
    </div>
    <div className="flex-1 bg-slate-950 border border-slate-800 overflow-hidden group-hover:border-indigo-500/50 transition-colors relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/30 group-hover:bg-indigo-400 transition-colors" />
      <div className="p-4 bg-slate-900/50 border-b border-slate-800 pl-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-200 font-sans">
              {item.title}
            </h3>
            <p className="text-indigo-400 font-mono text-xs mt-1">
              @{" "}
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-200 underline underline-offset-4 decoration-indigo-500/50"
                >
                  {type === "education"
                    ? item.institution
                    : item.organization}{" "}
                </a>
              ) : type === "education" ? (
                item.institution
              ) : (
                item.organization
              )}
            </p>
          </div>
          <div className="text-slate-500 font-mono text-xs border border-slate-700 px-2 py-1 bg-slate-950">
            {item.period}
          </div>
        </div>
      </div>
      {item.description && (
        <div className="p-4 pl-6">
          <div className="text-slate-500 text-xs mb-2"># Output:</div>
          <div className="font-mono text-sm text-slate-300 leading-relaxed border-l-2 border-indigo-500/30 pl-4 py-1">
            {item.description}
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

const ResumeSection = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="relative py-20 px-4 sm:px-8 lg:px-12 font-mono"
      id="resume"
    >
      <motion.div
        className="max-w-4xl mx-auto mb-16 text-center lg:text-left"
        ref={sectionRef}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
      >
        <div className="inline-block mb-4 text-indigo-400 text-xs uppercase tracking-widest border border-slate-800 px-3 py-1 bg-slate-900">
          import history as my_journey
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-200 font-sans mt-2">
          Curriculum Vitae
        </h1>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto flex flex-col gap-16 relative z-10"
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div>
          <h2 className="text-xl text-slate-400 mb-6 flex items-center gap-2">
            <span className="text-indigo-500">##</span> Experience Logs
          </h2>
          {resumeData.experience.map((exp, index) => (
            <JupyterCell
              key={`exp-${index}`}
              item={exp}
              type="experience"
              index={index}
            />
          ))}
        </div>

        <div>
          <h2 className="text-xl text-slate-400 mb-6 flex items-center gap-2">
            <span className="text-indigo-500">##</span> Education Records
          </h2>
          {resumeData.education.map((edu, index) => (
            <JupyterCell
              key={`edu-${index}`}
              item={edu}
              type="education"
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
