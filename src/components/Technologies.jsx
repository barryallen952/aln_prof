import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { technologies } from "../constants/technologiesData";

const iconVariants = (duration) => ({
  animate: {
    y: [4, -4],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

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

// Animation for icon container
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

const Technologies = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pb-24">
      <motion.h2
        ref={sectionRef}
        variants={titleVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        className="mt-20 text-center text-4xl mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
      >
        Technologies
      </motion.h2>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
      >
        {technologies.map((tech, index) => (
          <motion.div key={index} variants={itemVariants} className="p-4">
            <a href={tech.link} target="_blank" rel="noopener noreferrer">
              <div className="relative flex flex-col items-center group">
                {/* Hover name */}
                <span className="absolute -top-11 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                  {tech.name ?? ""}
                </span>

                {/* Icon or image */}
                <motion.div
                  animate="animate"
                  variants={iconVariants(2 + (index % 3))}
                >
                  {tech.icon ? (
                    <tech.icon className={`text-4xl ${tech.color ?? ""}`} />
                  ) : (
                    <img
                      src={tech.iconLink}
                      alt={tech.IconName}
                      className="w-25 h-25 rounded object-contain"
                    />
                  )}
                </motion.div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technologies;
