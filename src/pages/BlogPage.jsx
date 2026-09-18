import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowRight, Search, ChevronLeft, ChevronRight, X, Mail, Send } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { posts, blogCategories as categories, formatPostDate } from "../data/blog";

export default function BlogPage() {
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const postsPerPage = 3;

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const inCategory = selectedCategory === "All" || post.category === selectedCategory;
        const q = query.trim().toLowerCase();
        const inQuery =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q);
        return inCategory && inQuery;
      }),
    [selectedCategory, query]
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! Fresh insights every week.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            DreamEstate Blog
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Expert insights, market trends, and tips for buyers, sellers, and investors
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or author..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-10 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400 transition"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setCurrentPage(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {(query || selectedCategory !== "All") && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Found <span className="font-bold text-gray-900 dark:text-white">{filteredPosts.length}</span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
            </p>
          )}
        </div>

        {/* Featured Post */}
        {selectedCategory === "All" && !query && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              <Link
                to={`/blog/${posts[0].slug}`}
                className="group relative min-h-[320px] lg:h-auto rounded-3xl overflow-hidden shadow-soft-lg"
              >
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold uppercase mb-3 inline-block">
                    {posts[0].category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-200 transition">
                    {posts[0].title}
                  </h2>
                  <p className="text-blue-100 mb-4 line-clamp-2 text-sm sm:text-base">{posts[0].excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-white font-semibold">
                    Read More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
              <div className="space-y-6">
                <div className="card p-6">
                  <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider">
                    <Tag size={12} />
                    Featured Article
                  </span>
                  <Link to={`/blog/${posts[1].slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      {posts[1].title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 text-sm">{posts[1].excerpt}</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <img src={posts[1].authorAvatar} alt={posts[1].author} loading="lazy" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{posts[1].author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{posts[1].authorRole} • {posts[1].readTime}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/blog/${posts[2].slug}`}
                  className="card p-5 hover:shadow-soft-lg flex items-start gap-4 group"
                >
                  <img
                    src={posts[2].image}
                    alt=""
                    loading="lazy"
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-bold">
                      {posts[2].category}
                    </span>
                    <h4 className="font-bold text-gray-900 dark:text-white mt-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {posts[2].title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {posts[2].author} • {posts[2].readTime}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-20 card animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-3xl flex items-center justify-center">
              <Search size={36} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Articles Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try a different search term or category</p>
            <button
              onClick={() => { setQuery(""); setSelectedCategory("All"); setCurrentPage(1); }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedPosts.map((post, i) => (
              <article
                key={post.id}
                className="card-hover overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${Math.min(i, 5) * 70}ms` }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-900 dark:text-white rounded-full text-xs font-bold">
                        {post.category}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatPostDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        loading="lazy"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`w-10 h-10 rounded-xl font-semibold transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="relative mt-16 p-8 sm:p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 mx-auto mb-4 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Mail size={26} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Stay Updated with Latest Insights
            </h3>
            <p className="text-blue-200 mb-6 max-w-md mx-auto">
              Get expert real estate tips, market updates, and guides delivered to your inbox weekly.
            </p>
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white placeholder-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 active:scale-95 transition">
                <Send size={16} />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}