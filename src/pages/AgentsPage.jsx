import { useState, useEffect } from "react";
import {
  Phone, Mail, Star, Building2, CheckCircle,
  Award, Search, X, MapPin,
} from "lucide-react";
import { agents } from "../data/agents";
import { useToast } from "../context/ToastContext";

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const toast = useToast();

  const filtered = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Lock body scroll when modal is open + close on Escape
  useEffect(() => {
    if (!selectedAgent) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setSelectedAgent(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedAgent]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Our Expert Agents
          </h1>
          <p className="text-blue-200 mb-8">
            Meet the professionals who will help you find your dream home
          </p>
          <div className="relative max-w-md">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search agents by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Showing <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "agent" : "agents"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((agent, i) => (
            <div
              key={agent.id}
              className="card-hover overflow-hidden animate-slide-up"
              style={{ animationDelay: `${Math.min(i, 6) * 70}ms` }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-5 sm:gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      loading="lazy"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg"
                    />
                    <div
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center"
                      title="Verified agent"
                    >
                      <CheckCircle size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                      {agent.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                      {agent.role}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {agent.rating}
                      </span>
                      <span className="text-sm text-gray-400">
                        ({agent.reviews} reviews)
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={14} className="text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">{agent.listings}</strong> Active
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">{agent.sold}</strong> Sold
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-5 leading-relaxed line-clamp-2">
                  {agent.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {agent.specialties.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSearchQuery(s)}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                      title={`Search for ${s}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    onClick={() => toast.info(`Opening email to ${agent.name}…`)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
                  >
                    <Mail size={16} />
                    Email
                  </a>
                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
                  >
                    Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 card animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-3xl flex items-center justify-center">
              <Search size={36} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Agents Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try a different search term</p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Agent Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedAgent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedAgent.name} profile`}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="relative w-fit mx-auto">
                <img
                  src={selectedAgent.avatar}
                  alt={selectedAgent.name}
                  className="w-28 h-28 rounded-3xl mx-auto object-cover ring-4 ring-blue-100 dark:ring-blue-900 mb-4"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                  <CheckCircle size={14} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAgent.name}</h2>
              <p className="text-blue-600 dark:text-blue-400">{selectedAgent.role}</p>
              <p className="flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-2">
                <MapPin size={14} />
                New York, NY
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6 text-sm leading-relaxed">{selectedAgent.bio}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedAgent.listings}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Listings</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedAgent.sold}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sold</p>
              </div>
              <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{selectedAgent.rating}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rating</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={`tel:${selectedAgent.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
              >
                <Phone size={16} />
                Call Agent
              </a>
              <button
                onClick={() => setSelectedAgent(null)}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}