import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { articles, mediumProfile } from "../constants/writingData";
import { BookOpen, ArrowUpRight, ArrowRight } from "lucide-react";

const Writing = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="writing" className="py-20 lg:py-28 relative font-mono">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 sm:px-8"
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 mb-6 text-xs text-indigo-400 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            publications.md
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-100 tracking-tight mb-4">
            Writing
          </h2>
          <p className="text-sm text-slate-400">
            Explaining what I build: the reasoning, not just the code.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {articles.map((article, index) => (
            <motion.a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-slate-950 border border-slate-800 hover:border-indigo-500/50 p-6 transition-colors duration-300"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/30 group-hover:bg-indigo-400 transition-colors" />

              <div className="flex items-start justify-between gap-4 pl-3">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">
                    article_{String(index + 1).padStart(2, "0")} · Medium
                  </p>
                  <h3 className="font-display text-xl font-semibold text-slate-100 mb-2 group-hover:text-indigo-200 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/blogs"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 text-xs font-bold uppercase tracking-widest transition-colors overflow-hidden shadow-[0_0_25px_rgba(99,102,241,0.35)]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
            <BookOpen className="w-4 h-4" />
            Read the Blog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={mediumProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-indigo-400 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Read More on Medium
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Writing;
