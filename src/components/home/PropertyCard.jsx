import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Heart,
  Share2,
  Star,
  Tag,
  Eye,
  Home,
  GitCompareArrows,
} from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import { useCompare } from "../../context/CompareContext";

const formatPrice = (price, type) => {
  return type === "rent"
    ? `$${price.toLocaleString()}/mo`
    : `$${price.toLocaleString()}`;
};

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export default function PropertyCard({ property, variant = "grid" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isCompared, toggle: toggleCompare } = useCompare();
  const compared = isCompared(property.id);

  const isFav = isFavorite(property.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleView = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getTypeBadge = () => {
    if (property.type === "sale") {
      return { label: "For Sale", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" };
    }
    return { label: "For Rent", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" };
  };

  if (variant === "list") {
    return (
      <Link to={`/property/${property.id}`} className="block group">
        <div className="card-hover flex flex-col md:flex-row overflow-hidden group-hover:shadow-soft-lg transition-all duration-300">
          {/* Image */}
          <div className="relative md:w-72 md:min-w-[288px] flex-shrink-0 overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 shimmer animate-shimmer bg-gray-200 dark:bg-gray-700" />
            )}
            <img
              ref={imgRef}
              src={property.image}
              alt={property.title}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } group-hover:scale-105 ${imageError ? "hidden" : ""}`}
            />
            {imageError && (
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Home size={48} className="text-gray-400" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getTypeBadge().color} backdrop-blur-sm`}>
                {getTypeBadge().label}
              </span>
              {property.featured && (
                <span className="px-3 py-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                  <Tag size={10} />
                  Featured
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 max-lg:opacity-100 max-lg:translate-y-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleCompare(property.id);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                  compared
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600"
                }}`}
                aria-label={compared ? "Remove from compare" : "Add to compare"}
                title={compared ? "Remove from compare" : "Add to compare (up to 3)"}
              >
                <GitCompareArrows size={18} />
              </button>
              <button
                onClick={handleFavorite}
                className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                  isFav
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-red-500"
                }}`}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={18} className={isFav ? "fill-current" : ""} />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 backdrop-blur-sm transition-all duration-300"
                aria-label="Share property"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Price Tag */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(property.price, property.type)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between flex-1 min-w-0">
            <div>
              {/* Title & Rating */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {property.title}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">4.8</span>
                </div>
                <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">126 reviews</span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1.5 mb-4 text-gray-500 dark:text-gray-400">
                <MapPin size={14} className="text-blue-500 shrink-0" />
                <span className="text-sm truncate">{property.address}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                  {property.category}
                </span>
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                  Built {property.yearBuilt}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center gap-1.5 py-2">
                <BedDouble size={16} className="text-blue-500" />
                <div className="text-center">
                  <span className="font-bold text-gray-900 dark:text-white text-sm block">{property.bedrooms}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Beds</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-2 border-x border-gray-100 dark:border-gray-700">
                <Bath size={16} className="text-blue-500" />
                <div className="text-center">
                  <span className="font-bold text-gray-900 dark:text-white text-sm block">{property.bathrooms}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Baths</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-2">
                <Maximize size={16} className="text-blue-500" />
                <div className="text-center">
                  <span className="font-bold text-gray-900 dark:text-white text-sm block">{formatNumber(property.area)}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">sqft</span>
                </div>
              </div>
            </div>

            {/* Agent */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <img
                src={property.agentAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${property.agent}`}
                alt={property.agent}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate block">{property.agent}</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Listing Agent</div>
              </div>
              <button
                onClick={handleView}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition"
                aria-label="View property"
              >
                <Eye size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link to={`/property/${property.id}`} className="block group">
      <div className="card-hover overflow-hidden group-hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 shimmer animate-shimmer bg-gray-200 dark:bg-gray-700" />
          )}
          <img
            ref={imgRef}
            src={property.image}
            alt={property.title}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110 ${imageError ? "hidden" : ""}`}
          />
          {imageError && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Home size={48} className="text-gray-400" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getTypeBadge().color} backdrop-blur-sm`}>
              {getTypeBadge().label}
            </span>
            {property.featured && (
              <span className="px-3 py-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                <Tag size={10} />
                Featured
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 max-lg:opacity-100 max-lg:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(property.id);
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                compared
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600"
              }}`}
              aria-label={compared ? "Remove from compare" : "Add to compare"}
              title={compared ? "Remove from compare" : "Add to compare (up to 3)"}
            >
              <GitCompareArrows size={18} />
            </button>
            <button
              onClick={handleFavorite}
              className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                isFav
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-red-500"
              }}`}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={18} className={isFav ? "fill-current" : ""} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 backdrop-blur-sm transition-all duration-300"
              aria-label="Share property"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(property.price, property.type)}
            </span>
          </div>

          {/* Quick View Button */}
          <button
            onClick={handleView}
            className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
            aria-label="Quick view"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Quick View</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title & Rating */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">4.8</span>
            </div>
            <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">126 reviews</span>
          </div>

          {/* Address */}
          <div className="flex items-center gap-1.5 mb-4 text-gray-500 dark:text-gray-400">
            <MapPin size={14} className="text-blue-500 shrink-0" />
            <span className="text-sm truncate">{property.address}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 dark:border-gray-700 mb-4">
            <div className="flex items-center justify-center gap-1.5 py-2">
              <BedDouble size={16} className="text-blue-500" />
              <div className="text-center">
                <span className="font-bold text-gray-900 dark:text-white text-sm block">{property.bedrooms}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Beds</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-2 border-x border-gray-100 dark:border-gray-700">
              <Bath size={16} className="text-blue-500" />
              <div className="text-center">
                <span className="font-bold text-gray-900 dark:text-white text-sm block">{property.bathrooms}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Baths</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-2">
              <Maximize size={16} className="text-blue-500" />
              <div className="text-center">
                <span className="font-bold text-gray-900 dark:text-white text-sm block">{formatNumber(property.area)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">sqft</span>
              </div>
            </div>
          </div>

          {/* Agent */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <img
              src={property.agentAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${property.agent}`}
              alt={property.agent}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
            />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate block">{property.agent}</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">Listing Agent</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}