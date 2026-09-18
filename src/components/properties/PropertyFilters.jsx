import { SlidersHorizontal, X } from "lucide-react";

export default function PropertyFilters({ filters, setFilters }) {
  const resetFilters = () => {
    setFilters({
      type: "all",
      category: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "any",
      sortBy: "newest",
    });
  };

  const hasActive =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.bedrooms !== "any";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
          <SlidersHorizontal size={20} className="text-blue-600 dark:text-blue-400" />
          Filters
        </h3>
        {hasActive && (
          <button
            onClick={resetFilters}
            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition font-medium"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Listing Type */}
        <div>
          <label className="label">Listing Type</label>
          <div className="flex gap-2">
            {["all", "sale", "rent"].map((t) => (
              <button
                key={t}
                onClick={() => setFilters({ ...filters, type: t })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition ${
                  filters.type === t
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {t === "all" ? "All" : `For ${t}`}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="label">Property Type</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="input"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="label">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="input input-icon-left-sm"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="input input-icon-left-sm"
              />
            </div>
          </div>
          {/* Quick price ranges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { label: "Under $500K", min: "", max: "500000" },
              { label: "$500K – $1M", min: "500000", max: "1000000" },
              { label: "$1M+", min: "1000000", max: "" },
            ].map((r) => (
              <button
                key={r.label}
                onClick={() => setFilters({ ...filters, minPrice: r.min, maxPrice: r.max })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filters.minPrice === r.min && filters.maxPrice === r.max
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="label">Bedrooms</label>
          <div className="flex gap-2">
            {["any", "1", "2", "3", "4", "5+"].map((b) => (
              <button
                key={b}
                onClick={() => setFilters({ ...filters, bedrooms: b })}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                  filters.bedrooms === b
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {b === "any" ? "Any" : b}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="label">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="input"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="area">Largest Area</option>
            <option value="beds">Most Bedrooms</option>
          </select>
        </div>
      </div>
    </div>
  );
}