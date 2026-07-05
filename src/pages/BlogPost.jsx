import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { getPost } from "../blogs";
import { BlogShell } from "./BlogList";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = post
      ? `${post.title} — Rabin Poudel`
      : "Post not found — Rabin Poudel";
    return () => {
      document.title = "Rabin Poudel — AI/ML Engineer & NLP Practitioner";
    };
  }, [slug, post]);

  if (!post) {
    return (
      <BlogShell>
        <div className="py-20 text-center">
          <h1 className="font-display text-3xl font-semibold text-slate-100 mb-4">
            Post not found
          </h1>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to blog
          </Link>
        </div>
      </BlogShell>
    );
  }

  return (
    <BlogShell>
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400 hover:text-indigo-300 transition-colors mb-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> All posts
      </Link>

      <article>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 mb-4">
          {post.date && <span>{post.date}</span>}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readingTime} min read
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-slate-100 leading-tight mb-5">
          {post.title}
        </h1>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.cover ? (
          <div className="mb-10 border border-slate-800 overflow-hidden">
            <img src={post.cover} alt={post.title} className="w-full object-cover" />
          </div>
        ) : (
          <div className="mb-10 border border-slate-800 overflow-hidden">
            <div className="h-44 sm:h-56 relative bg-gradient-to-br from-indigo-600 via-indigo-800 to-slate-900">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:22px_22px]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-indigo-400/30 blur-2xl" />
            </div>
          </div>
        )}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <div className="mt-16 pt-8 border-t border-slate-800">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all posts
        </Link>
      </div>
    </BlogShell>
  );
};

export default BlogPost;
