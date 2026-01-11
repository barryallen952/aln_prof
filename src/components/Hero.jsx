import React from "react";
// import profile_pic from "../assets/profile-pic.png";
// import profile_pic from "../assets/profile-pic (1).png";
import profile_pic from "../assets/heroimg.png";
// import profile_pic from "../assets/profileee.png";
import { HERO_CONTENT } from "../constants/index.js";
import { HERO_CONTENT_ANS } from "../constants/index.js";
import { animate, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import resume from "../assets/Rabin-Poudel-cv.pdf";
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
      <div className="pb-4 lg:mb-46 " id="hero">
        <div className="flex flex-wrap lg:flex-row-reverse">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center lg:pt-16">
              <motion.img
                src={profile_pic}
                alt=" Profile Image"
                className=" shadow-2xl rounded-3xl"
                height={550}
                width={500}
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
              className="flex flex-col items-center lg:items-start mt-15"
            >
              <motion.h2
                variants={childVarients}
                className="pb-2 text-4xl tracking-tighter lg:text-8xl font-montserrat"
              >
                Rabin Poudel
              </motion.h2>
              <span className="px-2">
                {" "}
                <span className="text-stone-500">I </span>
                <TypeAnimation
                  sequence={[
                    " work with data.",
                    2500, // Show for 1.5 seconds
                    " create systems that learn.",
                    2500, // Show for 1.5 seconds
                    "",
                    100,
                  ]}
                  wrapper="span"
                  speed={50} // Typing speed
                  repeat={Infinity} // Loop forever
                  className="text-blue-400 text-sm font-semibold "
                />
              </span>

              <motion.p
                variants={childVarients}
                className="my-2  max-w-lg py-9  text-xl leading-relaxed tracking-tighter"
              >
                <p className="text-teal-500" style={{ whiteSpace: "pre-line" }}>
                  Driven by a simple question:
                </p>
                <p className="text-stone-400" style={{ whiteSpace: "pre-line" }}>{HERO_CONTENT}</p>
                <p
                  className="relative inline-block border-b-2 border-cyan-400 after:content-[''] after:absolute after:left-0 after:-bottom-[6px] after:w-full after:h-[2px] after:bg-cyan-400 after:blur-md after:opacity-70"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {HERO_CONTENT_ANS}
                </p>
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
