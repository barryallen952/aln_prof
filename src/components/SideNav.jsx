import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Cpu,
  GitBranch,
  TerminalSquare,
  BookOpen,
  Mail,Newspaper
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", to: "hero", icon: Home },
  { name: "About", to: "about", icon: User },
  { name: "Skills", to: "technologies", icon: Cpu },
  { name: "Projects", to: "projects", icon: GitBranch },
  { name: "Journey", to: "resume", icon: TerminalSquare },
  { name: "Writing", to: "writing", icon: BookOpen },
  // { name: "Blogs", to: "/blogs", isRoute: true, icon: Newspaper },
  { name: "Contact", to: "contact", icon: Mail },
];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.to));
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].to);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (id === "/blogs") {
      navigate("/blogs");
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderNavButton = (item) => {
    const isActive = activeSection === item.to;
    const Icon = item.icon;
    return (
      <button
        key={item.to}
        onClick={() => scrollTo(item.to)}
        className={`group flex items-center rounded-xl cursor-pointer transition-all duration-300 w-full outline-none overflow-hidden ${
          isActive
            ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]"
            : "text-slate-500 hover:bg-slate-800/80 hover:text-slate-300 border border-transparent"
        }`}
        aria-label={`Scroll to ${item.name}`}
      >
        {/* Icon zone — always exactly 32px wide, perfectly centered */}
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center relative">
          <Icon
            className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
          />
          {isActive && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
          )}
        </div>

        {/* Label — slides in */}
        <div
          className={`pr-3 overflow-hidden whitespace-nowrap transition-all duration-500 ${isHovered ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"}`}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            {item.name}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div
      className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col font-mono"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-slate-950/80 backdrop-blur-xl border border-slate-800 shadow-[0_0_25px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden relative group/container rounded-2xl ${
          isHovered ? "w-48" : "w-12"
        }`}
      >
        {/* Subtle glowing edge */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover/container:opacity-100 transition-opacity" />

        <div className="flex flex-col py-3 gap-1 px-2">
          {/* First 5 — always visible */}
          {navItems.slice(0, 5).map((item) => renderNavButton(item))}

          {/* Rest — revealed on hover (grid-rows trick animates real height) */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              isHovered ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div
              className={`flex flex-col gap-1 overflow-hidden transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {navItems.slice(5).map((item) => renderNavButton(item))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
