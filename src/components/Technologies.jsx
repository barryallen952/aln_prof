import React from "react";
import { motion } from "framer-motion";
import { technologies } from "../constants/technologiesData";

const iconVariants = (duration) => ({
  initial: { y: -10 },
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

const Technologies = () => {
  return (
    <div className="pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
        className="mt-20 text-center text-4xl mb-12"
      >
        Technologies
      </motion.h2>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            initial="initial"
            animate="animate"
            variants={iconVariants(2 + (index % 3))}
            className="p-4"
          >
            <a href={tech.link} target="_blank" rel="noopener noreferrer">
              <tech.icon className={`text-4xl ${tech.color}`} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technologies;
