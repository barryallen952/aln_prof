import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { getAllPosts } from "../blogs";

const posts = getAllPosts();

const BlogShell = ({ children }) => (
  <div className="min-h-screen bg-slate-950 text-stone-300 antialiased relative overflow-x-hidden font-mono" id="blogs">
    <div className="fixed inset-0 -z-10">
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
    </div>

    {/* Top bar */}
    <header className="border-b border-slate-800/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-2xl font-semibold tracking-tight text-slate-100 lowercase hover:text-white transition-colors"
        >
          rabin<span className="text-indigo-500">.</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-16 relative z-10">
      {children}
    </main>
  </div>
);

const BlogList = () => {
  useEffect(() => {
    document.title = "Blog - Rabin Poudel";
    return () => {
      document.title = "Rabin Poudel - AI/ML Engineer & NLP Practitioner";
    };
  }, []);

  return (
  <BlogShell>
    <div className="mb-12">
      <div className="flex items-center gap-2 text-indigo-500 text-[10px] tracking-widest uppercase mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
        blog/
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-100">
        Blog
      </h1>
      <p className="text-slate-500 text-sm mt-3">
        {posts.length} {posts.length === 1 ? "post" : "posts"} · notes on ML,
        NLP, and building things.
      </p>
    </div>

    {posts.length === 0 ? (
      <p className="text-slate-500 text-sm">
        No posts yet. Drop a .md file into{" "}
        <span className="text-indigo-300">src/blogs/posts/</span>.
      </p>
    ) : (
      <div className="grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="group relative bg-slate-950 border border-slate-800 hover:border-indigo-500/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {post.cover ? (
              <div className="h-40 overflow-hidden">
                <img
                  src={post.cover}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 scale-105 group-hover:scale-110 transition-all duration-700"
                />
              </div>
            ) : (
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-800 to-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:22px_22px]" />
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-indigo-400/30 blur-2xl group-hover:bg-indigo-400/50 transition-colors duration-700" />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                {post.date && <span>{post.date}</span>}
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readingTime} min
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold text-slate-100 leading-tight mb-2 group-hover:text-white transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </BlogShell>
  );
};

export { BlogShell };
export default BlogList;
