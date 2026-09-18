import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid3X3, List, Search, Filter, X, Home } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/home/PropertyCard";
import PropertyCardSkeleton from "../components/home/PropertyCardSkeleton";
import PropertyFilters from "../components/properties/PropertyFilters";

const CATEGORIES = ["house", "apartment", "villa", "commercial"];

// Seed filters from Hero search (?location=&type=&minPrice=&maxPrice=&listingType=)
function readSearchState(searchParams) {
  return {
    query: searchParams.get("location") || "",
    filters: {
      type:
        searchParams.get("listingType") === "rent" || searchParams.get("listingType") === "sale"
          ? searchParams.get("listingType")
          : "all",
      category: CATEGORIES.includes(searchParams.get("type"))
        ? searchParams.get("type")
        : "all",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      bedrooms: "any",
      sortBy: "newest",
    },
  };
}

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState(() => readSearchState(searchParams).query);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(() => readSearchState(searchParams).filters);
  const [syncedParams, setSyncedParams] = useState(() => searchParams.toString());

  // Re-sync when navigating with new search params (e.g. footer category links)
  if (searchParams.toString() !== syncedParams) {
    const next = readSearchState(searchParams);
    setSyncedParams(searchParams.toString());
    setSearchQuery(next.query);
    setFilters(next.filters);
  }

  // Simulate fetch for skeleton UX
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filters.type !== "all") {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.bedrooms !== "any") {
      const beds = filters.bedrooms === "5+" ? 5 : Number(filters.bedrooms);
      result = result.filter((p) =>
        filters.bedrooms === "5+" ? p.bedrooms >= beds : p.bedrooms === beds
      );
    }

    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area":
        result.sort((a, b) => b.area - a.area);
        break;
      case "beds":
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [searchQuery, filters]);

  const activeFilterCount =
    (filters.type !== "all" ? 1 : 0) +
    (filters.category !== "all" ? 1 : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.bedrooms !== "any" ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl translate-y-1/2 animate-float animation-delay-300" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.06%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-slide-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Find Your Perfect Property
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-base sm:text-lg">
            Search through thousands of listings to find the ideal property for your lifestyle
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl mx-auto">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by location, property name, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (desktop) */}
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className="sticky top-28">
              <PropertyFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <span className="font-bold text-gray-900 dark:text-white">
                  {filteredProperties.length}
                </span>{" "}
                {filteredProperties.length === 1 ? "property" : "properties"} found
                {searchQuery && (
                  <>
                    {" "}for <span className="font-semibold text-blue-600 dark:text-blue-400">"{searchQuery}"</span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <Filter size={16} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-lg transition ${
                      view === "grid"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded-lg transition ${
                      view === "list"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    }`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} variant={view} />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-700 animate-scale-in">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-3xl flex items-center justify-center">
                  <Home size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ type: "all", category: "all", minPrice: "", maxPrice: "", bedrooms: "any", sortBy: "newest" });
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredProperties.map((property, i) => (
                  <div key={property.id} className="animate-slide-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                    <PropertyCard property={property} variant={view} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto animate-slide-left p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            <PropertyFilters filters={filters} setFilters={setFilters} />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Show {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}