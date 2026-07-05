import { StrictMode, lazy, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Blog pages (and the markdown parser) load only when /blogs is visited
const BlogList = lazy(() => import("./pages/BlogList.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RouteFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <span className="font-mono text-xs tracking-widest uppercase text-slate-500">
      loading…
    </span>
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
