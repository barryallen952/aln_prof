import React from "react";
import Home_Logo from "../assets/logo.jpg";
import { FaGithub, FaLinkedin, FaSnapchat, FaTwitter } from "react-icons/fa";
const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between py-6">
        <div className="flex flex-shrink-0  items-center">
          {/* flex-shrink: 0; prevents shrinking even if there is not enough space, which may cause overflow */}

          <a href="/" aria-label="Home">
            <img
              src={Home_Logo}
              alt="Home Logo"
              className="mx-2 text-4xl"
              width={100}
              height={53}
            />
          </a>
        </div>
        {/* -------------------        -------------------- */}
        <div className="m-8 flex  items-center justify-center gap-4 text-2xl">
          <a
            href="https://www.linkedin.com/in/rabin-poudel-770842277"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-blue-400 " />
          </a>
          <a
            href="https://www.github.com/rabin20-04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/PoudelRabin5824?s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="text-blue-400" />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
