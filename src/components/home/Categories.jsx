import { Link } from "react-router-dom";
import { Home, Building2, Castle, Store, ArrowRight } from "lucide-react";
import { categories } from "../../data/properties";

const iconMap = {
  Home: Home,
  Building2: Building2,
  Castle: Castle,
  Store: Store,
};

export default function Categories() {
  return (
    <section className="section-sm bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 shadow-sm">
            <Building2 size={16} />
            Browse by Category
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Explore Property Types
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            Find the perfect type of property for your lifestyle and needs
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            return (
              <Link
                key={cat.name}
                to={`/properties?type=${cat.name.toLowerCase().replace(/s$/, "")}`}
                className="group relative rounded-3xl overflow-hidden shadow-soft border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                      <p className="text-sm text-gray-300 mt-0.5">{cat.count} Properties</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition">
                      <Icon size={22} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/95 via-blue-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-white text-2xl font-bold mb-2">{cat.name}</span>
                  <span className="text-blue-100 text-sm">{cat.count} properties available</span>
                  <span className="mt-4 px-4 py-2 bg-white text-blue-700 rounded-xl font-semibold text-sm flex items-center gap-2">
                    View Properties
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}