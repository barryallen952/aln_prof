import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories } from "../constants/skillsData";

// Animation variants for skill cards
const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Skills = () => {
  return (
    <section className="py-5 px-6 bg-black/20 min-h-screen">

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 className="text-center text-4xl mb-12">
            Technical{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {skillCategories.map((category, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true, // Animate only once when in view
              threshold: 0.2, // Trigger when 20% of the element is visible
            });

            return (
              <motion.div
                key={index}
                ref={ref}
                variants={cardVariants}
                initial="initial"
                animate={inView ? "animate" : "initial"}
                className="rounded-lg p-8"
              >
                <h3 className="font-semibold text-white mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-4 text-xs">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300">{skill.name}</span>
                      </div>
                      <div className="w-2/3 bg-white/10 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-blue-400 h-1 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
