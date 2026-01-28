import { div } from "framer-motion/client";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (

    <div>
        <hr className="border-t border-white/20 w-full max-w-12xl mx-auto mt-12" />
    <footer className="container mx-auto max-w-8xl px-6 pb-6 flex flex-col md:flex-row justify-between items-center mt-5">
      
      <p className="text-slate-400 text-sm">© 2024 Rabin Poudel.</p>
      <div className="flex items-center justify-center gap-4 text-2xl py-4">
        <a
          href="https://www.linkedin.com/in/rabin-poudel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-white hover:text-blue-400 transition-colors" />
        </a>
        <a
          href="https://www.github.com/rabinverse"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <FaGithub className="text-white hover:text-blue-400 transition-colors" />
        </a>
        <a
          href="https://x.com/PoudelRabin5824?s=09"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter className="text-white hover:text-blue-400 transition-colors" />
        </a>
      </div>
    </footer></div>
  );
};

export default Footer;