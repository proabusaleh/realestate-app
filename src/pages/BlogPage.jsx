import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Tag, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";

const posts = [
  {
    id: 1,
    slug: "how-to-buy-first-home",
    title: "How to Buy Your First Home: A Complete Guide",
    excerpt: "Buying your first home can be overwhelming. This comprehensive guide walks you through every step of the process, from saving for a down payment to closing day.",
    content: `
      <h2>Getting Started</h2>
      <p>Buying your first home is one of the biggest financial decisions you'll ever make. It's exciting, but it can also be stressful if you're not prepared.</p>
      <h2>Step 1: Check Your Credit Score</h2>
      <p>Your credit score plays a crucial role in determining your mortgage rate. Aim for a score of 620 or higher for conventional loans.</p>
      <h2>Step 2: Save for a Down Payment</h2>
      <p>While 20% is ideal to avoid PMI, many first-time buyer programs allow as little as 3-5% down.</p>
      <h2>Step 3: Get Pre-Approved</h2>
      <p>A pre-approval letter shows sellers you're serious and helps you understand your budget.</p>
      <h2>Step 4: Find the Right Agent</h2>
      <p>An experienced buyer's agent can save you time and money. They know the market and can negotiate on your behalf.</p>
    `,
    category: "Buying",
    author: "Sarah Johnson",
    authorRole: "Senior Agent",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    featured: true,
  },
  {
    id: 2,
    slug: "top-10-cities-real-estate-2024",
    title: "Top 10 Cities for Real Estate Investment in 2024",
    excerpt: "Discover the hottest markets for real estate investment this year. From emerging tech hubs to affordable growing cities.",
    content: `
      <h2>Market Analysis</h2>
      <p>2024 presents unique opportunities for real estate investors. Here are the top markets to watch.</p>
      <h3>1. Austin, Texas</h3>
      <p>Strong job growth in tech sector continues to drive demand.</p>
      <h3>2. Raleigh, North Carolina</h3>
      <p>Research Triangle brings steady influx of professionals.</p>
      <h3>3. Tampa, Florida</h3>
      <p>Population growth and no state income tax attract buyers.</p>
    `,
    category: "Investment",
    author: "Mike Davis",
    authorRole: "Investment Specialist",
    authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    featured: true,
  },
  {
    id: 3,
    slug: "staging-tips-sell-faster",
    title: "5 Staging Secrets to Sell Your Home Faster",
    excerpt: "Professional staging can increase your sale price by 10-15%. Learn the tricks top agents use to make homes irresistible to buyers.",
    content: `
      <h2>Why Staging Matters</h2>
      <p>Staged homes sell 73% faster than non-staged homes. Here's how to do it right.</p>
      <h3>1. Declutter Everything</h3>
      <p>Remove personal items, excess furniture, and clutter.</p>
      <h3>2. Neutral Colors</h3>
      <p>Paint walls in warm neutrals to appeal to the widest audience.</p>
      <h3>3. Maximize Light</h3>
      <p>Open curtains, add lamps, replace dim bulbs.</p>
      <h3>4. Curb Appeal</h3>
      <p>First impression starts at the sidewalk.</p>
      <h3>5. Fresh Scents</h3>
      <p>Subtle, clean scents only. No strong air fresheners.</p>
    `,
    category: "Selling",
    author: "Emily Chen",
    authorRole: "Listing Specialist",
    authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    publishedAt: "2024-01-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    featured: false,
  },
  {
    id: 4,
    slug: "rent-vs-buy-2024",
    title: "Rent vs Buy in 2024: What the Numbers Say",
    excerpt: "With interest rates fluctuating, the rent vs buy decision is more complex than ever. We break down the math for major metros.",
    content: `
      <h2>The Current Landscape</h2>
      <p>Mortgage rates have stabilized but remain elevated. Let's look at the numbers.</p>
      <h3>When to Rent</h3>
      <p>Short-term stays, uncertain job markets, high-rate environments.</p>
      <h3>When to Buy</h3>
      <p>Long-term plans, stable income, building equity.</p>
    `,
    category: "Market Trends",
    author: "John Smith",
    authorRole: "Market Analyst",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    publishedAt: "2024-01-01",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    featured: false,
  },
  {
    id: 5,
    slug: "smart-home-value",
    title: "Do Smart Home Features Increase Property Value?",
    excerpt: "From smart thermostats to security systems, we analyze which tech upgrades actually pay off at resale.",
    content: `
      <h2>ROI on Smart Home Tech</h2>
      <p>Not all smart features are created equal when it comes to resale value.</p>
      <h3>High ROI</h3>
      <ul><li>Smart thermostats (Nest, Ecobee)</li><li>Smart security systems</li><li>Smart lighting</li></ul>
      <h3>Low ROI</h3>
      <ul><li>Smart appliances</li><li>Voice assistants</li><li>Smart mirrors</li></ul>
    `,
    category: "Technology",
    author: "David Kim",
    authorRole: "Tech Specialist",
    authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    publishedAt: "2023-12-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800",
    featured: false,
  },
  {
    id: 6,
    slug: "first-time-investor-mistakes",
    title: "7 Mistakes First-Time Real Estate Investors Make",
    excerpt: "Avoid these common pitfalls that can cost you thousands. Learn from the pros before you make your first investment.",
    content: `
      <h2>Common Pitfalls</h2>
      <p>Real estate investing can be lucrative, but mistakes are costly.</p>
      <h3>1. Not Running the Numbers</h3>
      <p>Always calculate cap rate, cash-on-cash return, and ROI.</p>
      <h3>2. Ignoring Location</h3>
      <p>You can fix a house, you can't fix a neighborhood.</p>
      <h3>3. Overleveraging</h3>
      <p>Too much debt leaves no margin for vacancies or repairs.</p>
    `,
    category: "Investment",
    author: "Mike Davis",
    authorRole: "Investment Specialist",
    authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    publishedAt: "2023-12-20",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    featured: false,
  },
];

const categories = ["All", "Buying", "Selling", "Investment", "Market Trends", "Technology"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredPosts = posts.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Featured Post */}
        {selectedCategory === "All" && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold uppercase mb-2 inline-block">
                    {posts[0].category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {posts[0].title}
                  </h2>
                  <p className="text-blue-100 mb-4 line-clamp-2">{posts[0].excerpt}</p>
                  <Link
                    to={`/blog/${posts[0].slug}`}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition"
                  >
                    Read More
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border">
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                    Featured Article
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {posts[1].title}
                  </h3>
                  <p className="text-gray-500 mt-2 line-clamp-2">{posts[1].excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <img src={posts[1].authorAvatar} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{posts[1].author}</p>
                      <p className="text-sm text-gray-500">{posts[1].authorRole}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/blog/${posts[1].slug}`}
                  className="block p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={posts[2].image}
                      alt=""
                      className="w-24 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {posts[2].category}
                      </span>
                      <h4 className="font-bold text-gray-900 mt-2 line-clamp-1">{posts[2].title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {posts[2].author} • {posts[2].readTime}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-gray-900 rounded-full text-xs font-bold">
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
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{post.author}</span>
                  </Link>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Read More
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl font-semibold transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Stay Updated with Latest Insights
          </h3>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">
            Get expert real estate tips, market updates, and guides delivered to your inbox weekly.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white placeholder-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <button className="px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}