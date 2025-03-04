import React from "react";
import {
  SiFastapi,
  SiFlask,
  SiScikitlearn,
  SiStreamlit,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiPytorch,
  SiJupyter,
} from "react-icons/si";
import { FaReact, FaPython } from "react-icons/fa";
import { animate, motion } from "framer-motion";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [8, -8],
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
    <>
      <div className="pb-24">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          className="my-20 text-center text-4xl"
        >
          Technologies
        </motion.h2>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(2.5)}
            className="p-4"
          >
            <FaReact className="text-7xl text-cyan-400" />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(3)}
            className="p-4"
          >
            <SiFastapi className="text-7xl text-teal-500" />{" "}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(5)}
            className="p-4"
          >
            <SiStreamlit className="text-7xl text-red-500" />{" "}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(2)}
            className="p-4"
          >
            <SiFlask className="text-7xl text-gray-800" />{" "}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(6)}
            className="p-4"
          >
            <SiScikitlearn className="text-7xl text-orange-400" />{" "}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(3.5)}
            className="p-4"
          >
            <FaPython className="text-7xl bg-gradient-to-b from-[#3776AB] to-[#FFD43B] p-1 rounded-lg " />{" "}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(2)}
            className="p-4"
          >
            <SiPandas className="text-7xl text-blue-900" />{" "}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(6)}
            className="p-4"
          >
            <SiNumpy className="text-7xl text-blue-600" />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(3)}
            className="p-4"
          >
            <SiTensorflow className="text-7xl text-orange-600" />{" "}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(5)}
            className="p-4"
          >
            <SiPytorch className="text-7xl text-red-600" />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(2.5)}
            className="p-4"
          >
            <SiJupyter className="text-7xl text-orange-500" />{" "}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Technologies;
