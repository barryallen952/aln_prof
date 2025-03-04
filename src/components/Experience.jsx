import { motion } from "framer-motion";

const ResumeSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="pt-12 px-4 sm:px-6 lg:px-8 text-white pb-6 mb-16">
      <motion.div
      className="text-4xl py-6"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8 }}
      >
        
      </motion.div>
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Education Section with Left Progress Bar (Timeline) */}
        <motion.div
          className="w-1/2 relative"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-3xl font-bold mb-8 text-white">
            Education
          </motion.h2>

          <div className="relative">
            {/* Progress Bar Line (lowered by 2 pixels from the top) */}
            <div className="absolute left-4 top-5 bottom-0 w-1 bg-blue-500"></div>

            {/* First Education Entry */}
            <motion.div className="pl-12 mb-8 relative" variants={itemVariants}>
              {/* Progress Bar Dot (centered horizontally on the line, vertically at top) */}
              <div className="absolute left-2.5 top-2 w-4 h-4 bg-blue-500 rounded-full"></div>

              <h3 className="text-2xl font-bold text-white">
                BACHELOR OF COMPUTER ENGINEERING
              </h3>
              <div className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded inline-block">
                2023-present
              </div>
              <p className="mt-2 text-white">
                Institute of Engineering ,Purwanchal Campus - TU
              </p>
            </motion.div>

            {/* Second Education Entry */}
            <motion.div className="pl-12 relative" variants={itemVariants}>
              {/* Progress Bar Dot (centered horizontally on the line, vertically at top) */}
              <div className="absolute left-2.5 top-2 w-4 h-4 bg-blue-500 rounded-full"></div>

              <h3 className="text-2xl font-bold text-white">+2 SCIENCE</h3>
              <div className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded inline-block">
                2020 - 2022
              </div>
              <p className="mt-2 text-white">
                Capital College and Research Center ,Balkumari Kathmandu
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Gap */}
        <div className="w-8 hidden md:block"></div>

        {/* Experience Section with Left Progress Bar (Timeline) */}
        <motion.div
          className="w-1/2 relative"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-white">Experience</h2>

          <div className="relative">
            {/* Progress Bar Line (lowered by 2 pixels from the top) */}
            <div className="absolute left-4 top-5 bottom-0 w-1 bg-blue-500"></div>

            {/* First Experience Entry */}
            <motion.div className="pl-12 mb-8 relative" variants={itemVariants}>
              {/* Progress Bar Dot (centered horizontally on the line, vertically at top) */}
              <div className="absolute left-2.5 top-2 w-4 h-4 bg-blue-500 rounded-full"></div>

              <h3 className="text-2xl font-bold text-white">PR Team</h3>
              <div className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded inline-block">
                2024-2025
              </div>
              <p className="mt-2 text-white">
                Association of Computer Engineering(ACES) ,IOEPC
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumeSection;
