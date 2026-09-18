import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Home,
  Sparkles,
  Award,
  Users,
  ArrowRight,
  TrendingUp,
  Shield,
  Star,
} from "lucide-react";

const stats = [
  {
    number: "15K+",
    label: "Properties",
    icon: Home,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    number: "10K+",
    label: "Happy Clients",
    icon: Users,
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
  },
  {
    number: "500+",
    label: "Expert Agents",
    icon: Award,
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
  },
  {
    number: "200+",
    label: "Cities Covered",
    icon: MapPin,
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
  },
];

const features = [
  { icon: Shield, label: "Verified Listings", desc: "All properties verified by our team" },
  { icon: TrendingUp, label: "Market Insights", desc: "Real-time market data & trends" },
  { icon: Star, label: "Expert Guidance", desc: "Top-rated agents at your service" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchData, setSearchData] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.location) params.set("location", searchData.location);
    if (searchData.type) params.set("type", searchData.type);
    if (searchData.minPrice) params.set("minPrice", searchData.minPrice);
    if (searchData.maxPrice) params.set("maxPrice", searchData.maxPrice);
    params.set("listingType", activeTab);
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl animate-float animation-delay-200" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl animate-float animation-delay-400" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow" />
          <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse-slow animation-delay-200" />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse-slow animation-delay-400" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-800/50 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 backdrop-blur-sm">
              <Sparkles size={16} className="animate-pulse" />
              <span>New AI-powered search launched</span>
            </div>

            {/* Headline */}
            <h1 className="text-display-md md:text-display-lg font-bold text-gray-900 dark:text-white leading-tight">
              Find Your Perfect
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                Dream Home
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              Discover thousands of properties for sale and rent. Our platform connects
              you with the perfect property through advanced search and expert guidance.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Shield size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Verified Listings</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">100% authenticated properties</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Expert Agents</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">500+ licensed professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Market Data</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Real-time insights & trends</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="pt-4">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-soft-lg p-3 border border-gray-100 dark:border-gray-700 relative z-20">
                {/* Tabs */}
                <div className="flex items-center gap-2 mb-3 px-4">
                  {["buy", "rent"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      }`}
                    >
                      {tab === "buy" ? "Buy" : "Rent"}
                    </button>
                  ))}
                </div>

                {/* Search Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 px-2">
                  <div className="relative sm:col-span-2 md:col-span-1">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location, city, neighborhood..."
                      value={searchData.location}
                      onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="relative sm:col-span-2 md:col-span-1">
                    <Home size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={searchData.type}
                      onChange={(e) => setSearchData({ ...searchData, type: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="relative sm:col-span-1 md:col-span-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={searchData.minPrice}
                      onChange={(e) => setSearchData({ ...searchData, minPrice: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="relative sm:col-span-1 md:col-span-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={searchData.maxPrice}
                      onChange={(e) => setSearchData({ ...searchData, maxPrice: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-1">
                    <button
                      type="submit"
                      className="w-full h-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Search size={18} />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Quick Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {features.map((feature, i) => (
                <div
                  key={feature.label}
                  className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3">
                    <feature.icon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{feature.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="animate-slide-right relative">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-gray-700/50 shadow-soft text-center group hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} className={stat.text} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.number}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Visual Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-soft-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%2E%3C/g%3E%3C/svg%3E')] opacity-50" />
                  <div className="relative z-10 text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <Home size={48} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Dream Home Awaits</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto">
                      Start your journey today with our intelligent property matching.
                    </p>
                    <Link
                      to="/properties"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-300"
                    >
                      Explore Properties
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-soft">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-300">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}