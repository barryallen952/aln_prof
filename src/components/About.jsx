import { skillCategories } from "../constants/skillsData";
import { bioContent, ctaContent } from "../constants/aboutContent";
import { animate, motion } from "framer-motion";
const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [4, -4],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: 0,
      repeatType: "reverse",
    },
  },
});

const About = () => {
  const selectedSkills = skillCategories.flatMap((category) =>
    category.skills.slice(0, 2)
  );

  return (
    <section className="py-20 px-6 bg-black/20 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className=" text-center text-4xl mb-12"
          >
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio Section */}
          <div className="bg-white/3 border border-white/10 backdrop-blur-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Who I Am</h3>
            <p className="text-slate-300 mb-4">{bioContent.paragraph1}</p>
            <p className="text-slate-300">{bioContent.paragraph2}</p>
          </div>

          {/* Skills Overview */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              My Expertise
            </h3>
            <div className=" border border-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
