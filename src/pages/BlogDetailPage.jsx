import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar, Clock, ArrowLeft, ArrowRight, Share2,
  Link2, Check, Tag, FileText,
} from "lucide-react";
import { getPostBySlug, getRelatedPosts, formatPostDate, posts } from "../data/blog";
import { useToast } from "../context/ToastContext";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center">
            <FileText size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Article Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The article you&apos;re looking for doesn&apos;t exist or was removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post);
  const index = posts.findIndex((p) => p.id === post.id);
  const prev = posts[(index - 1 + posts.length) % posts.length];
  const next = posts[(index + 1) % posts.length];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setCopied(true);
    toast.success("Article link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition mb-8"
        >
          <ArrowLeft size={16} />
          All Articles
        </Link>

        {/* Header */}
        <header className="animate-slide-up">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              to={`/blog`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wide"
            >
              <Tag size={12} />
              {post.category}
            </Link>
            {post.featured && (
              <span className="px-3 py-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight text-balance">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-gray-700"
              />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{post.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.authorRole} • {formatPostDate(post.publishedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Clock size={14} />
                {post.readTime}
              </span>
              <span className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
              <button
                onClick={handleShare}
                className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 rounded-xl transition"
                aria-label="Share article"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={handleCopy}
                className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 rounded-xl transition"
                aria-label="Copy article link"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Link2 size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="relative rounded-3xl overflow-hidden my-8 shadow-soft-lg animate-fade-in">
          <img src={post.image} alt={post.title} className="w-full h-64 sm:h-96 object-cover" />
        </div>

        {/* Body */}
        <div
          className="blog-content card p-6 sm:p-10 animate-slide-up"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author card */}
        <div className="card p-6 sm:p-8 mt-8 flex flex-col sm:flex-row items-start gap-5">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900 shrink-0"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              Written by
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{post.author}</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{post.authorRole}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Part of the DreamEstate expert team, helping buyers, sellers, and investors
              make smarter property decisions every day.
            </p>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Link
            to={`/blog/${prev.slug}`}
            className="card-hover p-5 group flex items-center gap-3"
          >
            <ArrowLeft size={20} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:-translate-x-1 transition shrink-0" />
            <span className="min-w-0">
              <span className="block text-xs text-gray-400 uppercase tracking-wide font-semibold">Previous</span>
              <span className="block font-bold text-gray-900 dark:text-white truncate">{prev.title}</span>
            </span>
          </Link>
          <Link
            to={`/blog/${next.slug}`}
            className="card-hover p-5 group flex items-center justify-end gap-3 text-right"
          >
            <span className="min-w-0">
              <span className="block text-xs text-gray-400 uppercase tracking-wide font-semibold">Next</span>
              <span className="block font-bold text-gray-900 dark:text-white truncate">{next.title}</span>
            </span>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition shrink-0" />
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h2>
            <Link to="/blog" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} to={`/blog/${r.slug}`} className="card-hover overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-900 dark:text-white rounded-full text-xs font-bold">
                    {r.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {r.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-3">
                    <Calendar size={12} />
                    {formatPostDate(r.publishedAt)} • {r.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}