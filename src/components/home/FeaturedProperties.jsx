import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { properties } from "../../data/properties";

export default function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-sm bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
              <Sparkles size={14} />
              Curated Selection
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Listings
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg">
              Hand-picked properties by our expert agents for you
            </p>
          </div>
          <Link
            to="/properties"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            View All Properties
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((property, i) => (
            <div key={property.id} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}