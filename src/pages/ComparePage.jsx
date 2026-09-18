import { Link } from "react-router-dom";
import {
  GitCompareArrows, X, ArrowRight, BedDouble, Bath,
  Maximize, MapPin, Calendar, Star, Trash2, Building2,
} from "lucide-react";
import { properties } from "../data/properties";
import { useCompare, MAX_COMPARE } from "../context/CompareContext";

function formatPrice(price, type) {
  return type === "rent"
    ? `$${price.toLocaleString()}/mo`
    : `$${price.toLocaleString()}`;
}

export default function ComparePage() {
  const { comparedIds, remove, clear, count } = useCompare();
  const compared = comparedIds
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean);

  if (compared.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center">
            <GitCompareArrows size={48} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Compare Properties Side by Side
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Pick up to {MAX_COMPARE} properties and see price, size, amenities, and more in one clear table.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
          >
            <Building2 size={18} />
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  const prices = compared.map((p) => p.price);
  const areas = compared.map((p) => p.area);
  const beds = compared.map((p) => p.bedrooms);
  const minPrice = Math.min(...prices);
  const maxArea = Math.max(...areas);
  const maxBeds = Math.max(...beds);

  const rows = [
    {
      label: "Price",
      render: (p) => (
        <span className="inline-flex flex-col gap-1">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(p.price, p.type)}
          </span>
          {p.price === minPrice && (
            <span className="w-fit px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-bold">
              Best price
            </span>
          )}
        </span>
      ),
    },
    {
      label: "Listing",
      render: (p) => (
        <span className="flex flex-wrap gap-1.5">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
            p.type === "sale"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          }`}>
            For {p.type}
          </span>
          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-bold capitalize">
            {p.category}
          </span>
        </span>
      ),
    },
    {
      label: "Address",
      render: (p) => (
        <span className="flex items-start gap-1.5 text-sm text-gray-600 dark:text-gray-300">
          <MapPin size={14} className="text-blue-500 shrink-0 mt-0.5" />
          {p.address}
        </span>
      ),
    },
    {
      label: "Bedrooms",
      render: (p) => (
        <span className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <BedDouble size={16} className="text-blue-500" />
          {p.bedrooms}
          {p.bedrooms === maxBeds && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-bold">
              Most
            </span>
          )}
        </span>
      ),
    },
    {
      label: "Bathrooms",
      render: (p) => (
        <span className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <Bath size={16} className="text-blue-500" />
          {p.bathrooms}
        </span>
      ),
    },
    {
      label: "Area",
      render: (p) => (
        <span className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <Maximize size={16} className="text-blue-500" />
          {p.area.toLocaleString()} sqft
          {p.area === maxArea && (
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs font-bold">
              Largest
            </span>
          )}
        </span>
      ),
    },
    {
      label: "Year Built",
      render: (p) => (
        <span className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <Calendar size={16} className="text-blue-500" />
          {p.yearBuilt}
        </span>
      ),
    },
    {
      label: "Amenities",
      render: (p) => (
        <span className="flex flex-wrap gap-1.5">
          {p.amenities.map((a) => (
            <span key={a} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
              {a}
            </span>
          ))}
        </span>
      ),
    },
    {
      label: "Agent",
      render: (p) => (
        <span className="flex items-center gap-2">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(p.agent)}`}
            alt={p.agent}
            className="w-8 h-8 rounded-full bg-blue-50 dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-white">{p.agent}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-slide-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 border border-white/30 rounded-full text-xs font-semibold text-white mb-3 backdrop-blur-sm">
                <GitCompareArrows size={14} />
                {count} of {MAX_COMPARE} selected
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Compare Properties</h1>
            </div>
            <div className="flex gap-3">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition text-sm backdrop-blur-sm"
              >
                Add More
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={clear}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/90 text-white rounded-xl font-semibold hover:bg-red-500 transition text-sm"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="w-32 sm:w-44 p-4 sm:p-6 text-left text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800 align-bottom">
                  <span className="flex items-center gap-1.5">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    4.8 rated
                  </span>
                </th>
                {compared.map((p) => (
                  <th key={p.id} className="p-4 sm:p-6 text-left align-top min-w-[220px]">
                    <div className="relative rounded-2xl overflow-hidden mb-3 group">
                      <img src={p.image} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={() => remove(p.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition"
                        aria-label={`Remove ${p.title} from compare`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <Link
                      to={`/property/${p.id}`}
                      className="font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-1"
                    >
                      {p.title}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={row.label}
                  className={ri !== rows.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}
                >
                  <th className="p-4 sm:p-6 text-left text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800 align-top">
                    {row.label}
                  </th>
                  {compared.map((p) => (
                    <td key={p.id} className="p-4 sm:p-6 align-top">
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-800" />
                {compared.map((p) => (
                  <td key={p.id} className="p-4 sm:p-6">
                    <Link
                      to={`/property/${p.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}