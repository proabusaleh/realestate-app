import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Trash2 } from "lucide-react";
import { properties } from "../../data/properties";
import { getRecentIds, clearRecent } from "../../utils/recentViews";
import PropertyCard from "./PropertyCard";

export default function RecentlyViewed() {
  const [recentIds, setRecentIds] = useState(getRecentIds);

  const recent = recentIds
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (recent.length === 0) return null;

  const handleClear = () => {
    clearRecent();
    setRecentIds([]);
  };

  return (
    <section className="section-sm bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-3">
              <Clock size={14} />
              Pick Up Where You Left Off
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Recently Viewed
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg">
              Properties you&apos;ve checked out recently
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition"
            >
              <Trash2 size={16} />
              Clear
            </button>
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:opacity-90 transition text-sm"
            >
              Keep Exploring
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recent.map((property, i) => (
            <div key={property.id} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}