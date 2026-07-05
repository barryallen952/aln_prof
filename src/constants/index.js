import { FaGithub, FaLinkedin, FaTwitter, FaMediumM } from "react-icons/fa";

export const profile = {
  name: "Rabin Poudel",
  firstName: "Rabin",
  lastName: "Poudel",
  roles: ['"NLP Practitioner"', '"ML Systems Builder"', '"AI Researcher"'],
  location: "Kathmandu, Nepal",
  cvLink:
    "https://drive.google.com/file/d/1lHKmEiQo-mSIvNXfegg4Fo0gIhw3BY9h/view?usp=sharing",
  available: true,
};

export const socials = [
  {
    name: "LinkedIn",
    handle: "--in",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/rabin-poudel",
    action: "Connect",
  },
  {
    name: "GitHub",
    handle: "--git",
    icon: FaGithub,
    href: "https://github.com/rabinverse",
    action: "View_Code",
  },
  {
    name: "Medium",
    handle: "--blog",
    icon: FaMediumM,
    href: "https://medium.com/@poudelrabin",
    action: "Read",
  },
  {
    name: "X",
    handle: "--x",
    icon: FaTwitter,
    href: "https://x.com/PoudelRabin5824?s=09",
    action: "Follow",
  },
];

export const HERO_CONTENT = ` How can AI make this better? `;
export const HERO_CONTENT_ANS = `I build machine learning solutions that answer it.`;
