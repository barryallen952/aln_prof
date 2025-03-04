import React from "react";
import profile_pic from "../assets/profileee.png";
import { HERO_CONTENT } from "../constants/index.js";
import { animate, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import resume from "../assets/resume.pdf";
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

const Hero = () => {
  return (
    <>
      <div className="pb-4 lg:mb-36 " id="hero">
        <div className="flex flex-wrap lg:flex-row-reverse">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center lg:p-8">
              <motion.img
                src={profile_pic}
                alt=" Profile Image"
                className=" shadow-2xl rounded-3xl"
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
                className="pb-2 text-4xl tracking-tighter lg:text-8xl"
              >
                Rabin Poudel
              </motion.h2>
              <span className="text-xs px-2 text-stone-600">Exploring </span>
              <span className="px-2">
                <TypeAnimation
                  sequence={[
                    "AI / ML",
                    1500, // Show for 1.5 seconds
                    "",
                    500, // Erase
                    "Data Science",
                    1500,
                    "",
                    500,
                    "Deep Learning",
                    1500,
                    "",
                    500,
                    ,
                    "Generative AI",
                    1500,
                    "",
                    500,
                    "Natural Language Processing(NLP)",
                    1500,
                  ]}
                  wrapper="span"
                  speed={50} // Typing speed
                  repeat={Infinity} // Loop forever
                  className="text-blue-400 text-sm font-semibold "
                />
              </span>
              <motion.p
                variants={childVarients}
                className="my-2  max-w-lg py-6  text-xl leading-relaxed tracking-tighter"
              >
                {HERO_CONTENT}
              </motion.p>
              <motion.a
                variants={childVarients}
                href={resume}
                target="_blank"
                rel="noopener  noreferrer"
                download
                className="bg-white rounded-full p-4 text-sm  text-stone-800 mb-10"
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