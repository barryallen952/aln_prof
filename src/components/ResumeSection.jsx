import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { resumeData } from '../constants/resumeData';

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.1,
    },
  },
};

// Animation variants for items
const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Animation for timeline line
const lineVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "100%",
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

// Animation for section title
const titleVariants = {
  hidden: { opacity: 0, y: -70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const ResumeSection = () => {
  // Intersection observers for scroll-based animations
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [eduRef, eduInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [expRef, expInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative py-12 px-4 sm:px-8 lg:px-12  min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        ref={sectionRef}
        variants={titleVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          My Journey
        </h1>
       
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
      >
        {/* Education Section */}
        <motion.div className="flex-1 relative" ref={eduRef}>
          <motion.h2
            className="text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
            variants={itemVariants}
          >
            Education
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-6 top-6 w-1 bg-gradient-to-b from-indigo-400 to-purple-500"
              variants={lineVariants}
              initial="hidden"
              animate={eduInView ? "visible" : "hidden"}
              style={{ height: "calc(100% - 1.5rem)" }}
            />

            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                className="pl-16 mb-12 relative"
                variants={itemVariants}
              >
                <div className="absolute left-4 top-2 w-5 h-5 bg-indigo-500 rounded-full border-4 border-gray-800"></div>
                <div className="bg-gray-800/40 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-100">
                    {edu.title}
                  </h3>
                  <div className="mt-3 bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full inline-block text-sm font-medium">
                    {edu.period}
                  </div>
                  <p className="mt-3 text-gray-300">{edu.institution}</p>
                  <p className="mt-2 text-gray-400 text-sm">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div className="flex-1 relative" ref={expRef}>
          <motion.h2
            className="text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
            variants={itemVariants}
          >
            Experience
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-6 top-6 w-1 bg-gradient-to-b from-indigo-400 to-purple-500"
              variants={lineVariants}
              initial="hidden"
              animate={expInView ? "visible" : "hidden"}
              style={{ height: "calc(100% - 1.5rem)" }}
            />

            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={index}
                className="pl-16 mb-12 relative"
                variants={itemVariants}
              >
                <div className="absolute left-4 top-2 w-5 h-5 bg-purple-500 rounded-full border-4 border-gray-800"></div>
                <div className="bg-gray-800/40 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-700/30">
                  <div className="flex items-center gap-4">
                    <a href={exp.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={exp.logo}
                        alt={`${exp.organization} logo`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 "
                      />
                    </a>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">
                        {exp.title}
                      </h3>
                      <div className="mt-3 bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full inline-block text-sm font-medium">
                        {exp.period}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-300">{exp.organization}</p>
                  <p className="mt-2 text-gray-400 text-sm">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;