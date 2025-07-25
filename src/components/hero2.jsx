import React, { useState, useEffect } from "react";
import profile_pic from "../assets/profileee.png";
import { HERO_CONTENT } from "../constants/index.js";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import resume from "../assets/Rabin_Poudel_cv.pdf";

const containerVarients = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, staggerChildren: 0.5 },
  },
};
const childVarients = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const roles = [
  { title: "AI / ML", tagline: "Building powerful models with XGBoost and beyond." },
  { title: "Data Science", tagline: "Uncovering insights with Pandas and EDA." },
  { title: "Deep Learning", tagline: "Exploring neural networks for cutting-edge solutions." },
  { title: "Generative AI", tagline: "Crafting innovative systems with AI creativity." },
  { title: "Natural Language Processing (NLP)", tagline: "Mastering language models for smarter interactions." },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles every 2000ms to match TypeAnimation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000); // Matches 1500ms display + 500ms erase
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="pb-4 lg:mb-36" id="hero">
        <div className="flex flex-wrap lg:flex-row-reverse">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center lg:p-8">
              <motion.img
                src={profile_pic}
                alt="Profile Image"
                className="shadow-2xl rounded-3xl"
                height={650}
                width={650}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVarients}
              className="flex flex-col items-center lg:items-start mt-10"
            >
              <motion.h2
                variants={childVarients}
                className="pb-2 text-4xl tracking-tighter lg:text-8xl font-montserrat"
              >
                Rabin Poudel
              </motion.h2>
            
              <span className="px-2">
                <TypeAnimation
                  sequence={roles.flatMap((role) => [
                    role.title,
                    1500, // Show for 1.5 seconds
                    "", // Erase
                    500, // Pause before next
                  ])}
                  wrapper="span"
                  speed={50} // Typing speed
                  repeat={Infinity} // Loop forever
                  className="text-blue-400 text-sm font-semibold"
                />
              </span>
              {/* Tagline with animation */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[roleIndex].tagline} // Sync with roleIndex
                  className="text-sm text-gray-300 mt-2 px-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {roles[roleIndex].tagline}
                </motion.p>
              </AnimatePresence>
              <motion.p
                variants={childVarients}
                className="my-2 max-w-lg py-6 text-xl leading-relaxed tracking-tighter font-montserrat"
              >
                {HERO_CONTENT}
              </motion.p>
              <motion.a
                variants={childVarients}
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="bg-white rounded-full p-4 text-sm text-stone-800 mb-10"
              >
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;