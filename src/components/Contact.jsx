import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Terminal, Loader2 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      setStatus("Error: All fields are required to execute.");
      return;
    }

    setIsLoading(true);
    setStatus("Establishing connection...");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("Success: Payload delivered securely.");
          setFormData({ name: "", email: "", message: "" });
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
      className="pt-20 px-4 sm:px-6 pb-24 font-mono relative overflow-hidden"
      id="contact"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-14 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-900/80 border border-indigo-500/30 mb-6 text-xs text-indigo-400 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <Terminal className="w-4 h-4" />
            <span>POST /api/v1/contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-sans tracking-tight mb-4">
            Let's Talk
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            If you're looking for someone who loves solving difficult problems,
            you're in the right place."
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
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 pl-6 py-3 min-h-[120px] resize-none transition-colors text-sm custom-scrollbar"
                    placeholder="Your message here..."
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
