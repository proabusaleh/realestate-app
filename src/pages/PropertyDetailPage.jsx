import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, BedDouble, Bath, Maximize, Calendar,
  Car, Trees, Wifi, Shield, Dumbbell, Waves,
  Heart, Share2, Phone, Mail, ChevronLeft,
  ChevronRight, Star, Send, CheckCircle, Home,
  Calculator, X, Expand, Printer, ArrowLeft,
} from "lucide-react";
import { properties } from "../data/properties";
import { useFavorites } from "../hooks/useFavorites";
import PropertyCard from "../components/home/PropertyCard";

const amenityIcons = {
  Pool: Waves, Garage: Car, Garden: Trees,
  "Smart Home": Wifi, Gym: Dumbbell, Security: Shield,
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const [currentImage, setCurrentImage] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const { isFavorite, toggleFavorite } = useFavorites();

  const similar = useMemo(
    () =>
      properties
        .filter((p) => p.id !== property?.id && p.category === property?.category)
        .slice(0, 3),
    [property]
  );

  const monthlyPayment = useMemo(() => {
    if (!property || property.type === "rent") return 0;
    const principal = property.price * (1 - downPayment / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [property, downPayment, rate, years]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center">
            <Home size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Property Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The listing you're looking for doesn't exist or was removed.</p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const fav = isFavorite(property.id);

  const handleInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 4000);
  };

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % property.images.length);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Properties</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="relative rounded-3xl overflow-hidden mb-6 h-[320px] sm:h-[420px] lg:h-[500px] bg-gray-200 dark:bg-gray-800 group shadow-soft">
          <img
            key={currentImage}
            src={property.images[currentImage]}
            alt={property.title}
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-gray-800 dark:text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-gray-800 dark:text-white" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
            {currentImage + 1} / {property.images.length}
          </div>

          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase backdrop-blur-sm ${
              property.type === "sale" ? "bg-green-500/90 text-white" : "bg-blue-500/90 text-white"
            }`}>
              For {property.type}
            </span>
            {property.featured && (
              <span className="px-3 py-1.5 bg-amber-500/90 text-white rounded-full text-xs font-bold backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition ${
                fav ? "bg-red-500 text-white" : "bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-300 hover:text-red-500"
              }`}
              aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={20} className={fav ? "fill-current" : ""} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) navigator.share({ title: property.title, url: window.location.href });
                else navigator.clipboard.writeText(window.location.href);
              }}
              className="w-11 h-11 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:text-blue-600 transition"
              aria-label="Share property"
            >
              <Share2 size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setLightbox(true)}
              className="w-11 h-11 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:text-blue-600 transition"
              aria-label="View fullscreen"
            >
              <Expand size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {property.images.length > 1 && (
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                  i === currentImage
                    ? "border-blue-600 shadow-lg shadow-blue-600/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Price */}
            <div className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      property.type === "sale"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}>
                      For {property.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold uppercase capitalize">
                      {property.category}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {property.title}
                  </h1>
                  <p className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mt-2">
                    <MapPin size={16} className="text-blue-500 shrink-0" />
                    {property.address}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ${property.price.toLocaleString()}
                    {property.type === "rent" && <span className="text-lg text-gray-400">/mo</span>}
                  </p>
                  {property.type === "sale" && (
                    <button
                      onClick={() => setShowCalculator(!showCalculator)}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Calculator size={14} />
                      Estimate payment
                    </button>
                  )}
                </div>
              </div>

              {/* Mortgage calculator */}
              {showCalculator && property.type === "sale" && (
                <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl animate-slide-up">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calculator size={18} className="text-blue-600" />
                    Mortgage Calculator
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="label">Down payment (%)</label>
                      <input type="number" min={0} max={100} value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="input" />
                    </div>
                    <div>
                      <label className="label">Interest rate (%)</label>
                      <input type="number" step={0.1} value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="input" />
                    </div>
                    <div>
                      <label className="label">Term (years)</label>
                      <select value={years} onChange={(e) => setYears(Number(e.target.value))} className="input">
                        <option value={15}>15 years</option>
                        <option value={20}>20 years</option>
                        <option value={30}>30 years</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Estimated monthly payment:{" "}
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                    </span>
                  </p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
                {[
                  { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                  { icon: Maximize, label: "Area", value: `${property.area.toLocaleString()} sqft` },
                  { icon: Calendar, label: "Year Built", value: property.yearBuilt },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <stat.icon size={22} className="text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{property.description}</p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                This stunning property offers the perfect blend of luxury and comfort.
                Located in a prime neighborhood with easy access to schools, shopping centers,
                and public transportation. The open floor plan creates a seamless flow between
                living spaces, while large windows flood the interior with natural light.
              </p>
            </div>

            {/* Amenities */}
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || CheckCircle;
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Location</h2>
              <div className="h-72 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600">
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p className="font-medium text-gray-600 dark:text-gray-300">{property.address}</p>
                  <p className="text-xs mt-1">Lat: {property.lat}, Lng: {property.lng}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl font-medium hover:bg-blue-700 transition"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 lg:sticky lg:top-28">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Listed By</h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${property.agent}`}
                  alt={property.agent}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900 bg-blue-50 dark:bg-gray-700"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{property.agent}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Licensed Agent</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a href="tel:+15551234567" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                  <Phone size={18} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">+1 (555) 123-4567</span>
                </a>
                <a href="mailto:agent@dreamestate.com" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                  <Mail size={18} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">agent@dreamestate.com</span>
                </a>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Send Inquiry</h3>
              {inquirySent ? (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl animate-scale-in">
                  <CheckCircle size={20} />
                  <span className="font-medium text-sm">Inquiry sent successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <input type="text" placeholder="Your Name" required className="input" />
                  <input type="email" placeholder="Your Email" required className="input" />
                  <input type="tel" placeholder="Your Phone" className="input" />
                  <textarea placeholder="I'm interested in this property..." rows={3} className="input resize-none" />
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                    <Send size={16} />
                    Send Inquiry
                  </button>
                </form>
              )}

              <button
                onClick={() => window.print()}
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
              >
                <Printer size={16} />
                Print Listing
              </button>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Similar Properties</h2>
              <Link to="/properties" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={property.images[currentImage]}
            alt={property.title}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-6 text-white/80 text-sm">
            {currentImage + 1} / {property.images.length}
          </div>
        </div>
      )}
    </div>
  );
}