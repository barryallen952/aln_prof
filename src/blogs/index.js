import { marked } from "marked";

// Drop any .md file into src/blogs/posts/ and it shows up as a blog card.
// Optional frontmatter at the top of the file:
// ---
// title: My Post Title
// date: 2026-07-05
// excerpt: One-line summary shown on the card.
// tags: NLP, RAG, LLM
// cover: https://...   (optional image URL)
// ---
const files = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const parseFrontmatter = (raw) => {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    meta[key] = value;
  });
  return { meta, body: match[2] };
};

const readingTime = (text) => {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

// Local cover support: `cover: src/assets/images/foo.webp` (or just `foo.webp`)
// resolves to the bundled asset URL. Full http(s) URLs pass through untouched.
const coverFiles = import.meta.glob("../assets/images/*", {
  query: "?url",
  import: "default",
  eager: true,
});
const resolveCover = (cover) => {
  if (!cover) return "";
  if (/^https?:\/\//.test(cover)) return cover;
  const name = cover.split("/").pop();
  const hit = Object.entries(coverFiles).find(([p]) => p.endsWith(`/${name}`));
  return hit ? hit[1] : cover;
};

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug.replace(/-/g, " "),
      date: meta.date || "",
      excerpt: meta.excerpt || body.replace(/[#*`>_-]/g, "").slice(0, 160).trim(),
      tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      cover: resolveCover(meta.cover),
      readingTime: readingTime(body),
      html: marked.parse(body),
    };
  })
  // Newest first. Parses both "2025-07-07" and "Jul 7, 2025" formats.
  .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));

export const getAllPosts = () => posts;
export const getPost = (slug) => posts.find((p) => p.slug === slug);
