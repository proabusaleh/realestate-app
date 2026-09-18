import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  User, Heart, MessageSquare, Settings,
  LogOut, Camera, Edit3, Save, X,
  Building2, MapPin, BedDouble, Bath,
  Trash2, Eye, Star, Calendar
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { properties } from "../data/properties";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 000-0000",
    bio: "Looking for my dream home!",
    location: "New York, USA",
  });

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const favoriteProperties = properties.filter((p) =>
    favorites.includes(p.id)
  );

  const handleSaveProfile = () => {
    updateProfile({ name: profile.name, email: profile.email });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20"
              />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
                <Camera size={14} className="text-gray-600" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-blue-200">
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
            <div className="bg-white rounded-2xl shadow-sm border p-4 sticky top-28">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                    {tab.id === "favorites" && favorites.length > 0 && (
                      <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">
                        {favorites.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
              <hr className="my-4" />
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm border p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  {editing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                      >
                        <Save size={14} /> Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                      >
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", key: "name" },
                    { label: "Email", key: "email" },
                    { label: "Phone", key: "phone" },
                    { label: "Location", key: "location" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={profile[field.key]}
                        onChange={(e) =>
                          setProfile({ ...profile, [field.key]: e.target.value })
                        }
                        disabled={!editing}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      disabled={!editing}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 resize-none"
                    />
                  </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">{favorites.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Favorites</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-xs text-gray-500 mt-1">Inquiries</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-xs text-gray-500 mt-1">Views</p>
                  </div>
                </div>
              </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === "favorites" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  My Favorite Properties ({favoriteProperties.length})
                </h2>
                {favoriteProperties.length === 0 ? (
                  <div className="bg-white rounded-2xl p-16 text-center shadow-sm border">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      No Favorites Yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start browsing and save properties you love!
                    </p>
                    <Link
                      to="/properties"
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Browse Properties
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteProperties.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white rounded-2xl p-4 shadow-sm border flex flex-col sm:flex-row gap-4 hover:shadow-md transition"
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full sm:w-48 h-36 object-cover rounded-xl"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {p.title}
                            </h3>
                            <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                              <MapPin size={14} className="text-blue-500" />
                              {p.address}
                            </p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <BedDouble size={14} /> {p.bedrooms} Beds
                              </span>
                              <span className="flex items-center gap-1">
                                <Bath size={14} /> {p.bathrooms} Baths
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xl font-bold text-blue-600">
                              ${p.price.toLocaleString()}
                              {p.type === "rent" && "/mo"}
                            </span>
                            <div className="flex gap-2">
                              <Link
                                to={`/property/${p.id}`}
                                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100"
                              >
                                <Eye size={14} className="inline mr-1" />
                                View
                              </Link>
                              <button
                                onClick={() => removeFavorite(p.id)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                              >
                                <Trash2 size={14} className="inline mr-1" />
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
              <div className="bg-white rounded-2xl shadow-sm border p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  My Inquiries
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      property: "Modern Luxury Villa",
                      agent: "John Smith",
                      date: "2 days ago",
                      message: "I'm interested in scheduling a viewing for this property. Is it available this weekend?",
                      status: "Replied",
                      statusColor: "bg-green-100 text-green-700",
                      reply: "Hi! Yes, the property is available this Saturday at 2 PM. Shall I confirm?",
                    },
                    {
                      property: "Downtown Penthouse",
                      agent: "Sarah Johnson",
                      date: "5 days ago",
                      message: "What are the lease terms? Is there a minimum rental period?",
                      status: "Pending",
                      statusColor: "bg-amber-100 text-amber-700",
                      reply: null,
                    },
                    {
                      property: "Beachfront Condo",
                      agent: "Emily Chen",
                      date: "1 week ago",
                      message: "Is the condo pet-friendly? I have a small dog.",
                      status: "New",
                      statusColor: "bg-blue-100 text-blue-700",
                      reply: null,
                    },
                  ].map((inq, i) => (
                    <div
                      key={i}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {inq.property}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Agent: {inq.agent} • {inq.date}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${inq.statusColor} w-fit`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        <span className="font-semibold">You: </span>
                        {inq.message}
                      </p>
                      {inq.reply && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-blue-800 text-sm">
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
              <div className="space-y-6">
                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-sm border p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-5">
                    {[
                      {
                        title: "Email Notifications",
                        desc: "Receive email updates about new listings matching your criteria",
                        defaultChecked: true,
                      },
                      {
                        title: "Price Drop Alerts",
                        desc: "Get notified when a saved property's price decreases",
                        defaultChecked: true,
                      },
                      {
                        title: "New Listing Alerts",
                        desc: "Be the first to know about new properties in your area",
                        defaultChecked: false,
                      },
                      {
                        title: "Agent Messages",
                        desc: "Receive notifications when agents reply to your inquiries",
                        defaultChecked: true,
                      },
                      {
                        title: "Newsletter",
                        desc: "Weekly market trends and real estate tips",
                        defaultChecked: false,
                      },
                    ].map((setting) => (
                      <div
                        key={setting.title}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {setting.title}
                          </h4>
                          <p className="text-gray-500 text-xs mt-0.5">
                            {setting.desc}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={setting.defaultChecked}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow-sm border p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Change Password
                  </h2>
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Min 6 characters"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Re-enter new password"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8">
                  <h2 className="text-xl font-bold text-red-600 mb-2">
                    Danger Zone
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    Once you delete your account, there is no going back.
                  </p>
                  <button className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold hover:bg-red-100 transition">
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