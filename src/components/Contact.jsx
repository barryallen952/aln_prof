import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Linkedin, Github, Globe } from "lucide-react";
import { FaGithub, FaLinkedin, FaSnapchat, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:poudelrabin2004@gmail.com" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rabin-poudel-770842277",
    },
    { icon: Github, label: "GitHub", href: "https://github.com/rabin20-04" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      setStatus("Please enter your name.");
      return;
    }
    if (!formData.email.trim()) {
      setStatus("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setStatus("Please enter a message.");
      return;
    }

    emailjs
      .send(
        "service_o4ydtyi",
        "template_fkz9f8k",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "vjVj_aO5hwyctO6dE" 
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(""), 3000);
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          console.error("EmailJS error:", error);
        }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="pt-10 px-6 bg-black/20 min-h-screen flex flex-col">
      <div className="container mx-auto max-w-4xl flex-grow">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-slate-300">
            Interested in collaborating or discussing opportunities? I'd love to
            hear from you!
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Send a Message
            </h3>
            <div className="space-y-6">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows={8}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 rounded-md transition-all duration-300"
              >
                Send Message
              </button>
              {status && (
                <p
                  className={`text-center text-sm ${
                    status.includes("successfully")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-white/20 w-full max-w-6xl mx-auto mt-12" />
      <footer className="container mx-auto max-w-6xl px-6 pb-6 flex flex-col md:flex-row justify-between items-center bg-black/10 mt-5">
        <p className="text-slate-400 text-sm">© 2024 Rabin Poudel.</p>
        <div className="flex items-center justify-center gap-4 text-2xl py-4">
          <a
            href="https://www.linkedin.com/in/rabin-poudel-770842277"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="" />
          </a>
          <a
            href="https://www.github.com/rabin20-04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <FaGithub className="text-white" />
          </a>
          <a
            href="https://x.com/PoudelRabin5824?s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="" />
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Contact;