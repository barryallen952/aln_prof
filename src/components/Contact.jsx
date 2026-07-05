import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send, Terminal, Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SEND_COOLDOWN_MS = 30_000;

const MESSAGE_PHRASES = [
  "Let's build chatbot for business.",
  "Build amazing models together.",
  "Let's build nlp systems.",
  "Let's find business insight in the data.",
  "Let's collaborate.",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [lastSentAt, setLastSentAt] = useState(0);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const messageRef = useRef(null);

  // Typewriter placeholder for the message field (imperative, no form re-render).
  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;
    let i = 0;
    let char = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = MESSAGE_PHRASES[i];
      char += deleting ? -1 : 1;
      el.placeholder = word.slice(0, char) + "▌";
      if (!deleting && char === word.length) {
        deleting = true;
        timer = setTimeout(tick, 1800);
      } else if (deleting && char === 0) {
        deleting = false;
        i = (i + 1) % MESSAGE_PHRASES.length;
        timer = setTimeout(tick, 400);
      } else {
        timer = setTimeout(tick, deleting ? 30 : 60);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !message) {
      setStatus("Error: All fields are required to execute.");
      return;
    }
    if (email && !EMAIL_RE.test(email)) {
      setStatus("Error: Invalid email format.");
      return;
    }
    if (Date.now() - lastSentAt < SEND_COOLDOWN_MS) {
      setStatus("Error: Rate limited. Please wait a moment before resending.");
      return;
    }
    // Honeypot tripped: pretend success, send nothing.
    if (honeypot) {
      setStatus("Success: Payload delivered securely.");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    setIsLoading(true);
    setStatus("Establishing connection...");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          message,
          time: new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("Success: Payload delivered securely.");
          setFormData({ name: "", email: "", message: "" });
          setLastSentAt(Date.now());
          setIsLoading(false);
          setTimeout(() => setStatus(""), 4000);
        },
        (error) => {
          setStatus("Error: Delivery failed. Please try again.");
          console.error(error);
          setIsLoading(false);
        },
      );
  };
  return (
    <section
      className="pt-20 px-4 sm:px-6 pb-44 font-mono relative overflow-hidden"
      id="contact"
    >
      {/* Background ambient glow — full width */}
      <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 h-[28rem] bg-indigo-500/[0.07] blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-14 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-900/80 border border-indigo-500/30 mb-6 text-xs text-indigo-400 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <Terminal className="w-4 h-4" />
            <span>POST /api/v1/contact</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-100 tracking-tight mb-4">
            Let's Talk
            <span className="text-indigo-500">.</span>
            <span className="inline-block w-[3px] h-8 md:h-10 bg-indigo-400 ml-2 align-middle animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.9)]" />
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Great things start with a simple message. Let's build together.
          </p>
          <span className="inline-flex items-center gap-2 px-3 py-1 mt-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[11px] tracking-[0.18em] uppercase">
            <span className="w-1.5  h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            You can expect to hear from me within 24 hours
          </span>
        </div>

        <div className="relative group z-10">
          {/* Cyberpunk corner brackets */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-indigo-500/50 transition-all duration-500 group-hover:border-indigo-400 group-hover:w-8 group-hover:h-8" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-indigo-500/50 transition-all duration-500 group-hover:border-indigo-400 group-hover:w-8 group-hover:h-8" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-indigo-500/50 transition-all duration-500 group-hover:border-indigo-400 group-hover:w-8 group-hover:h-8" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-indigo-500/50 transition-all duration-500 group-hover:border-indigo-400 group-hover:w-8 group-hover:h-8" />

          <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative">
            {/* Top decorative bar */}
            <div className="absolute top-0 left-0 w-full h-1 flex">
              <div className="w-1/3 h-full bg-indigo-500/80" />
              <div className="w-2/3 h-full bg-slate-800/80" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 mt-2">
              {/* Honeypot — hidden from humans, bots fill it */}
              <div
                className="absolute -left-[9999px] top-auto"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="block text-xs uppercase tracking-widest text-indigo-400/80 mb-2 font-semibold relative">
                  <span>
                    Name
                    <span className="text-red-500 align-super text-[8px] ml-0.5">
                      *
                    </span>
                  </span>
                </label>
                <div className="relative flex items-center group/input">
                  <span
                    className={`absolute left-0 transition-colors ${focusedField === "name" ? "text-indigo-400" : "text-slate-500"}`}
                  >
                    ~{">"}
                  </span>
                  <input
                    type="text"
                    maxLength={100}
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 pl-6 py-2 transition-colors text-sm"
                    placeholder="Your Name..."
                  />
                  {focusedField === "name" && (
                    <span className="absolute right-0 w-1.5 h-4 bg-indigo-400 animate-pulse" />
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs uppercase tracking-widest text-indigo-400/80 mb-2 font-semibold">
                  Email
                </label>
                <div className="relative flex items-center group/input">
                  <span
                    className={`absolute left-0 transition-colors ${focusedField === "email" ? "text-indigo-400" : "text-slate-500"}`}
                  >
                    ~{">"}
                  </span>
                  <input
                    type="email"
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 pl-6 py-2 transition-colors text-sm"
                    placeholder="Your Email..."
                  />
                  {focusedField === "email" && (
                    <span className="absolute right-0 w-1.5 h-4 bg-indigo-400 animate-pulse" />
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs uppercase tracking-widest text-indigo-400/80 mb-2 font-semibold relative">
                  Message
                  <span className="text-red-500 align-super text-[8px] ml-0.5">
                    *
                  </span>
                </label>
                <div className="relative flex items-start group/input">
                  <span
                    className={`absolute left-0 top-3 transition-colors ${focusedField === "message" ? "text-indigo-400" : "text-slate-500"}`}
                  >
                    ~{">"}
                  </span>
                  <textarea
                    ref={messageRef}
                    maxLength={2000}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 pl-6 py-3 min-h-[120px] resize-none transition-colors text-sm custom-scrollbar"
                  />
                  {focusedField === "message" && (
                    <span className="absolute right-0 top-4 w-1.5 h-4 bg-indigo-400 animate-pulse" />
                  )}
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-800/80">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-indigo-600/10 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/50 px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all overflow-hidden disabled:opacity-50"
                >
                  {/* Hover scanline effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting</span>
                    </>
                  ) : (
                    <>
                      <span>SEND</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="text-[11px] h-4">
                  {status && (
                    <span
                      className={
                        status.includes("Success")
                          ? "text-emerald-400 font-bold"
                          : status.includes("Error")
                            ? "text-red-400 font-bold"
                            : "text-indigo-400 animate-pulse"
                      }
                    >
                      {status}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
