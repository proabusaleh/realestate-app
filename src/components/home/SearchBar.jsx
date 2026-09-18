import { useState } from "react";
import { Search, MapPin, Home, DollarSign } from "lucide-react";

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState("buy");
  const [search, setSearch] = useState({
    location: "",
    type: "",
    priceRange: "",
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* BUY / RENT TABS */}
      <div className="flex gap-1 mb-4">
        {["buy", "rent"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-t-lg font-semibold capitalize 
                       transition-all ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SEARCH FORM */}
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Location */}
          <div className="relative">
            <MapPin 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 
                         text-gray-400" 
            />
            <input
              type="text"
              placeholder="City, ZIP, or Neighborhood"
              value={search.location}
              onChange={(e) =>
                setSearch({ ...search, location: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border 
                         border-gray-200 rounded-xl focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Property Type */}
          <div className="relative">
            <Home 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 
                         text-gray-400" 
            />
            <select
              value={search.type}
              onChange={(e) =>
                setSearch({ ...search, type: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border 
                         border-gray-200 rounded-xl appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="relative">
            <DollarSign 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 
                         text-gray-400" 
            />
            <select
              value={search.priceRange}
              onChange={(e) =>
                setSearch({ ...search, priceRange: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border 
                         border-gray-200 rounded-xl appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Price Range</option>
              <option value="0-100000">Under $100K</option>
              <option value="100000-500000">$100K - $500K</option>
              <option value="500000-1000000">$500K - $1M</option>
              <option value="1000000+">$1M+</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 
                             bg-blue-600 text-white py-3 px-6 
                             rounded-xl font-semibold hover:bg-blue-700 
                             transition shadow-lg shadow-blue-600/30">
            <Search size={20} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}