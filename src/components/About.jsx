import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { profile } from "../constants/index.js";

const focusAreas = [
  { label: "GenAI / LLM Systems", detail: "RAG pipelines, agents, fine-tuning" },
  { label: "NLP", detail: "transformers, low-resource languages" },
  { label: "ML Engineering", detail: "training, evaluation, MLOps" },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative py-20 lg:py-28 font-mono">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-4 sm:px-8"
      >
        <div className="flex items-center gap-2 text-indigo-500 text-[10px] tracking-widest uppercase mb-7 ">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
          about me
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: statement */}
          <div>
            <h2
              className="font-display text-[clamp(28px,4vw,42px)] font-semibold leading-tight tracking-tight text-slate-100 mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              AI engineer.
              <br />
              NLP practitioner.
              <br />
              <span className="text-indigo-500">Built from Nepal.</span>
            </h2>

            <p className="text-slate-500 text-[13px] leading-relaxed max-w-xl border-l-2 border-indigo-950 pl-5">
              I train models, break them, and ship the ones that survive. My
              work sits at the intersection of{" "}
              <span className="text-slate-400">large language models</span>,{" "}
              <span className="text-slate-400">NLP systems</span>, and
              real-world ML, from fine-tuning transformers to building RAG
              pipelines that actually hold up in production. I'm drawn to the
              hard problems: low-resource languages, evaluation that matters,
              systems that reason.
              <br />
              <br />
              Studying Computer Engineering at{" "}
              <span className="text-slate-400">
                Tribhuvan University · IOE
              </span>
              , building in public from the Himalayas.
            </p>

            <div className="flex flex-wrap gap-2 mt-7">
              {["PyTorch", "LangChain", "Transformers", "RAG", "FastAPI", "Nepal 🏔"].map(
                (t) => (
                  <span
                    key={t}
                    className="text-[10px] tracking-widest uppercase text-indigo-500 border border-indigo-950 px-2.5 py-1 rounded-sm"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right: model card */}
          <div className="relative bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-colors">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-[10px] uppercase tracking-wider">
              <span className="text-indigo-400"></span>
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {profile.available ? "open_to_work: true" : "status: busy"}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-5 text-sm">
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">
                  domain:
                </p>
                <p className="text-indigo-200 font-bold">
                  Artificial Intelligence / Machine Learning
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">
                  focus_areas:
                </p>
                <ul className="flex flex-col gap-2">
                  {focusAreas.map((area) => (
                    <li
                      key={area.label}
                      className="flex items-baseline gap-2 border border-slate-800 bg-slate-900/40 px-3 py-2"
                    >
                      <span className="text-indigo-400 text-xs font-bold shrink-0">
                        -
                      </span>
                      <span>
                        <span className="text-slate-200 text-xs font-semibold">
                          {area.label}
                        </span>
                        <span className="text-slate-500 text-[11px] block">
                          {area.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                    location:
                  </p>
                  <p className="text-slate-300 text-xs">{profile.location}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                    education:
                  </p>
                  <p className="text-slate-300 text-xs">
                    B.E. Computer, TU · IOE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
