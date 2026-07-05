import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { resumeData } from "../constants/resumeData";
import { Briefcase, GraduationCap } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TimelineItem = ({ item, type, isLast }) => {
  const org = type === "education" ? item.institution : item.organization;
  return (
    <motion.div
      variants={itemVariants}
      className={`group relative pl-8 ${isLast ? "" : "pb-10"}`}
    >
      {/* Vertical line */}
      {!isLast && (
        <span className="absolute left-[5px] top-3 bottom-0 w-px bg-slate-800" />
      )}
      {/* Node */}
      <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-slate-700 bg-slate-950 group-hover:border-indigo-400 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-300" />

      <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400/70 mb-1.5">
        {item.period}
      </p>
      <h4 className="font-display text-lg font-semibold text-slate-100 leading-tight group-hover:text-white transition-colors">
        {item.title}
      </h4>
      {org &&
        (item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-0.5 text-indigo-300/80 hover:text-indigo-200 text-xs underline underline-offset-4 decoration-indigo-500/40"
          >
            {org}
          </a>
        ) : (
          <p className="mt-0.5 text-indigo-300/80 text-xs">{org}</p>
        ))}
      {item.description && (
        <p className="mt-3 text-slate-500 text-[13px] leading-relaxed max-w-md">
          {item.description}
        </p>
      )}
    </motion.div>
  );
};

const Column = ({ icon, label, items, type }) => (
  <div>
    <div className="flex items-center gap-2.5 mb-8">
      <span className="text-indigo-400">{icon}</span>
      <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
        {label}
      </h3>
      <span className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent" />
    </div>
    <div>
      {items.map((item, index) => (
        <TimelineItem
          key={`${type}-${index}`}
          item={item}
          type={type}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  </div>
);

const ResumeSection = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 px-4 sm:px-8 font-mono" id="resume">
      <motion.div
        className="max-w-4xl mx-auto"
        ref={sectionRef}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-14">
          <div className="flex items-center gap-2 text-indigo-500 text-[10px] tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            journey.log
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-100">
            Experience & Education
          </h2>
        </motion.div>

        {/* Two-column timeline */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
          <Column
            icon={<Briefcase className="w-4 h-4" />}
            label="Experience"
            items={resumeData.experience}
            type="experience"
          />
          <Column
            icon={<GraduationCap className="w-4 h-4" />}
            label="Education"
            items={resumeData.education}
            type="education"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
