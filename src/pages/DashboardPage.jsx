import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  User, Heart, MessageSquare, Settings,
  LogOut, Camera, Edit3, Save, X,
  Building2, MapPin, BedDouble, Bath,
  Trash2, Eye,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { useToast } from "../context/ToastContext";
import { properties } from "../data/properties";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

const mockInquiries = [
  {
    property: "Modern Luxury Villa",
    agent: "John Smith",
    date: "2 days ago",
    message: "I'm interested in scheduling a viewing for this property. Is it available this weekend?",
    status: "Replied",
    statusClasses: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    reply: "Hi! Yes, the property is available this Saturday at 2 PM. Shall I confirm?",
  },
  {
    property: "Downtown Penthouse",
    agent: "Sarah Johnson",
    date: "5 days ago",
    message: "What are the lease terms? Is there a minimum rental period?",
    status: "Pending",
    statusClasses: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    reply: null,
  },
  {
    property: "Beachfront Condo",
    agent: "Emily Chen",
    date: "1 week ago",
    message: "Is the condo pet-friendly? I have a small dog.",
    status: "New",
    statusClasses: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    reply: null,
  },
];

const notificationDefaults = [
  { title: "Email Notifications", desc: "Updates about new listings matching your criteria", on: true },
  { title: "Price Drop Alerts", desc: "Get notified when a saved property's price decreases", on: true },
  { title: "New Listing Alerts", desc: "Be the first to know about new properties in your area", on: false },
  { title: "Agent Messages", desc: "Notifications when agents reply to your inquiries", on: true },
  { title: "Newsletter", desc: "Weekly market trends and real estate tips", on: false },
];

export default function DashboardPage() {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/favorites" ? "favorites" : "profile"
  );
  const [syncedPath, setSyncedPath] = useState(location.pathname);

  // Open the Favorites tab when landing on /favorites (e.g. from the navbar)
  if (location.pathname !== syncedPath) {
    setSyncedPath(location.pathname);
    setActiveTab(location.pathname === "/favorites" ? "favorites" : "profile");
  }
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(notificationDefaults);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 000-0000",
    bio: "Looking for my dream home!",
    location: "New York, USA",
  });

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));
  const avatar = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || "user")}`;
  const firstName = user?.name?.split(" ")[0] || "there";

  const handleSaveProfile = () => {
    updateProfile({ name: profile.name, email: profile.email });
    setEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleRemoveFavorite = (id, title) => {
    removeFavorite(id);
    toast.info(`Removed "${title}" from favorites`);
  };

  const handleLogout = () => {
    logout();
    toast.info("You've been signed out");
    navigate("/");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    toast.success("Password updated successfully");
    e.target.reset();
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      logout();
      toast.info("Your account has been deleted");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative shrink-0">
              <img
                src={avatar}
                alt={user?.name || "User"}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20 bg-white/20"
              />
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition"
                aria-label="Change profile photo"
                onClick={() => toast.info("Photo upload coming soon")}
              >
                <Camera size={14} className="text-gray-600" />
              </button>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-white truncate">
                Welcome back, {firstName}!
              </h1>
              <p className="text-blue-200 text-sm sm:text-base">
                Manage your profile, favorites, and inquiries
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="card p-4 lg:sticky lg:top-28">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                    {tab.id === "favorites" && favorites.length > 0 && (
                      <span className="ml-auto bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 text-xs px-2 py-0.5 rounded-full font-bold">
                        {favorites.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="card p-6 sm:p-8 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                  {editing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition"
                      >
                        <Save size={14} /> Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                      >
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", key: "name", type: "text" },
                    { label: "Email", key: "email", type: "email" },
                    { label: "Phone", key: "phone", type: "tel" },
                    { label: "Location", key: "location", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="label">{field.label}</label>
                      <input
                        type={field.type}
                        value={profile[field.key]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        disabled={!editing}
                        className="input disabled:opacity-70"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="label">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!editing}
                      rows={3}
                      className="input disabled:opacity-70 resize-none"
                    />
                  </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{favorites.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Favorites</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{mockInquiries.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Inquiries</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Views</p>
                  </div>
                </div>
              </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === "favorites" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  My Favorite Properties ({favoriteProperties.length})
                </h2>
                {favoriteProperties.length === 0 ? (
                  <div className="card p-16 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-3xl flex items-center justify-center">
                      <Heart size={36} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      No Favorites Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Start browsing and save properties you love!
                    </p>
                    <Link
                      to="/properties"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      <Building2 size={18} />
                      Browse Properties
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteProperties.map((p) => (
                      <div
                        key={p.id}
                        className="card p-4 flex flex-col sm:flex-row gap-4 hover:shadow-soft-lg transition"
                      >
                        <Link to={`/property/${p.id}`} className="shrink-0">
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="w-full sm:w-48 h-40 sm:h-36 object-cover rounded-xl"
                          />
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <Link to={`/property/${p.id}`}>
                              <h3 className="font-bold text-gray-900 dark:text-white text-lg hover:text-blue-600 dark:hover:text-blue-400 transition truncate">
                                {p.title}
                              </h3>
                            </Link>
                            <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-1">
                              <MapPin size={14} className="text-blue-500 shrink-0" />
                              <span className="truncate">{p.address}</span>
                            </p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <BedDouble size={14} /> {p.bedrooms} Beds
                              </span>
                              <span className="flex items-center gap-1">
                                <Bath size={14} /> {p.bathrooms} Baths
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              ${p.price.toLocaleString()}
                              {p.type === "rent" && <span className="text-sm text-gray-400">/mo</span>}
                            </span>
                            <div className="flex gap-2">
                              <Link
                                to={`/property/${p.id}`}
                                className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                              >
                                <Eye size={14} />
                                View
                              </Link>
                              <button
                                onClick={() => handleRemoveFavorite(p.id, p.title)}
                                className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === "inquiries" && (
              <div className="card p-6 sm:p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  My Inquiries
                </h2>
                <div className="space-y-4">
                  {mockInquiries.map((inq, i) => (
                    <div
                      key={i}
                      className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-soft transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {inq.property}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Agent: {inq.agent} • {inq.date}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${inq.statusClasses}`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        <span className="font-semibold">You: </span>
                        {inq.message}
                      </p>
                      {inq.reply && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                          <p className="text-blue-800 dark:text-blue-200 text-sm">
                            <span className="font-semibold">Agent Reply: </span>
                            {inq.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-6 animate-fade-in">
                <div className="card p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {notifications.map((setting) => (
                      <div
                        key={setting.title}
                        className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {setting.title}
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                            {setting.desc}
                          </p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={setting.on}
                          aria-label={setting.title}
                          onClick={() => {
                            setNotifications((prev) =>
                              prev.map((n) => (n.title === setting.title ? { ...n, on: !n.on } : n))
                            );
                            toast.info(`${setting.title} ${setting.on ? "disabled" : "enabled"}`);
                          }}
                          className={`relative w-11 h-6 rounded-full transition shrink-0 ${
                            setting.on ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${
                              setting.on ? "translate-x-full" : ""
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Change Password
                  </h2>
                  <form onSubmit={handlePasswordUpdate} className="max-w-md space-y-4">
                    <div>
                      <label className="label">Current Password</label>
                      <input type="password" required placeholder="••••••••" autoComplete="current-password" className="input" />
                    </div>
                    <div>
                      <label className="label">New Password</label>
                      <input type="password" required minLength={6} placeholder="Min 6 characters" autoComplete="new-password" className="input" />
                    </div>
                    <div>
                      <label className="label">Confirm New Password</label>
                      <input type="password" required placeholder="Re-enter new password" autoComplete="new-password" className="input" />
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="card p-6 sm:p-8 !border-red-200 dark:!border-red-900/50">
                  <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                    Danger Zone
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Once you delete your account, there is no going back.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                  >
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}