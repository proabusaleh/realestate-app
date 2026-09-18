import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, Users, MessageSquare,
  FileText, Settings, DollarSign,
  Eye, Plus, Edit3, Trash2, Search,
  CheckCircle, Clock, XCircle,
  ArrowUpRight, ArrowDownRight,
  Home, MapPin, X, Save, Image
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { properties as initialProperties } from "../data/properties";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "users", label: "Users", icon: Users },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const statsCards = [
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Properties Listed",
    value: "1,248",
    change: "+8.2%",
    up: true,
    icon: Building2,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Active Users",
    value: "8,432",
    change: "+23.1%",
    up: true,
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Pending Inquiries",
    value: "56",
    change: "-3.4%",
    up: false,
    icon: MessageSquare,
    color: "bg-amber-50 text-amber-600",
  },
];

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@test.com", role: "user", status: "active", joined: "Jan 2024", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 2, name: "Sarah Miller", email: "sarah@test.com", role: "agent", status: "active", joined: "Feb 2024", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
  { id: 3, name: "Mike Wilson", email: "mike@test.com", role: "user", status: "inactive", joined: "Mar 2024", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
  { id: 4, name: "Emily Davis", email: "emily@test.com", role: "agent", status: "active", joined: "Jan 2024", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 5, name: "Robert Brown", email: "robert@test.com", role: "user", status: "suspended", joined: "Dec 2023", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
];

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [propertyList, setPropertyList] = useState(initialProperties);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect non-admins
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  const handleDeleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setPropertyList(propertyList.filter((p) => p.id !== id));
    }
  };

  const filteredProperties = propertyList.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white fixed h-full z-40 hidden lg:block">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home size={20} />
            </div>
            <span className="text-lg font-bold">
              Dream<span className="text-blue-400">Estate</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {item.id === "inquiries" && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  56
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900 capitalize">
              {activeTab}
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back, {user?.name}!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <MessageSquare size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* ============ OVERVIEW TAB ============ */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {statsCards.map((stat) => (
                  <div
                    key={stat.title}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                        <stat.icon size={22} />
                      </div>
                      <span
                        className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                          stat.up
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {stat.up ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder + Recent Activity */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Revenue Overview</h3>
                    <select className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600">
                      <option>Last 12 months</option>
                      <option>Last 6 months</option>
                      <option>Last 30 days</option>
                    </select>
                  </div>
                  <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-xl flex items-end justify-around px-4 pb-4">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                      (h, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className="w-full max-w-[32px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[10px] text-gray-400">
                            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h3 className="font-bold text-gray-900 mb-6">
                    Recent Activity
                  </h3>
                  <div className="space-y-5">
                    {[
                      { action: "New property listed", detail: "Modern Villa in Beverly Hills", time: "5 min ago", color: "bg-green-500" },
                      { action: "User registered", detail: "sarah.miller@email.com", time: "15 min ago", color: "bg-blue-500" },
                      { action: "Inquiry received", detail: "Downtown Penthouse", time: "1 hr ago", color: "bg-amber-500" },
                      { action: "Property sold", detail: "Cozy Family Home, TX", time: "3 hrs ago", color: "bg-purple-500" },
                      { action: "Review posted", detail: "⭐⭐⭐⭐⭐ Beachfront Condo", time: "5 hrs ago", color: "bg-pink-500" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${activity.color} mt-2 shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {activity.detail}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ PROPERTIES TAB ============ */}
          {activeTab === "properties" && (
            <div className="space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow"
                >
                  <Plus size={18} />
                  Add Property
                </button>
              </div>

              {/* Properties Table */}
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProperties.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {p.title}
                                </p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin size={10} />
                                  {p.address}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium capitalize">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-gray-900 text-sm">
                              ${p.price.toLocaleString()}
                              {p.type === "rent" && (
                                <span className="text-gray-400 font-normal">/mo</span>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                p.featured
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {p.featured ? (
                                <CheckCircle size={12} />
                              ) : (
                                <Clock size={12} />
                              )}
                              {p.featured ? "Active" : "Pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                              <Eye size={14} />
                              {100 + ((p.id * 137) % 400)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                <Edit3 size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition">
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProperty(p.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProperties.length === 0 && (
                  <div className="text-center py-16">
                    <Building2 size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No properties found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============ USERS TAB ============ */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="font-bold text-gray-900">
                  All Users ({mockUsers.length})
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700">
                  <Plus size={16} />
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                      <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={u.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{u.name}</p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${
                            u.role === "agent"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            u.status === "active"
                              ? "bg-green-100 text-green-700"
                              : u.status === "inactive"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {u.status === "active" ? <CheckCircle size={12} /> : u.status === "inactive" ? <Clock size={12} /> : <XCircle size={12} />}
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{u.joined}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={16} /></button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============ INQUIRIES TAB ============ */}
          {activeTab === "inquiries" && (
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="font-bold text-gray-900 mb-6">All Inquiries</h3>
              <div className="space-y-4">
                {[
                  { name: "Alex Turner", email: "alex@test.com", property: "Modern Luxury Villa", message: "Is this property still available?", date: "10 min ago", status: "new" },
                  { name: "Jessica Lee", email: "jess@test.com", property: "Downtown Penthouse", message: "Can I schedule a viewing?", date: "1 hr ago", status: "read" },
                  { name: "Tom Hardy", email: "tom@test.com", property: "Beachfront Condo", message: "What's the security deposit?", date: "3 hrs ago", status: "replied" },
                ].map((inq, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                        {inq.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{inq.name}</p>
                        <p className="text-xs text-gray-500">{inq.property} — {inq.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        inq.status === "new" ? "bg-blue-100 text-blue-700" :
                        inq.status === "read" ? "bg-amber-100 text-amber-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {inq.status}
                      </span>
                      <span className="text-xs text-gray-400">{inq.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ BLOG TAB ============ */}
          {activeTab === "blog" && (
            <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Blog Management</h3>
              <p className="text-gray-500 mb-6">Create and manage blog posts for your real estate website.</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
                <Plus size={16} className="inline mr-2" />
                Create New Post
              </button>
            </div>
          )}

          {/* ============ SETTINGS TAB ============ */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Site Settings</h3>
              <div className="max-w-lg space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
                  <input type="text" defaultValue="DreamEstate" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
                  <input type="email" defaultValue="info@dreamestate.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============ ADD PROPERTY MODAL ============ */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Property
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Modern Luxury Villa"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Listing Type *
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>For Sale</option>
                    <option>For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    placeholder="500000"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area (sqft) *
                  </label>
                  <input
                    type="number"
                    placeholder="2500"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <input type="number" placeholder="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <input type="number" placeholder="2" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  placeholder="123 Main St, City, State"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the property..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer">
                  <Image size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Drag & drop images here or{" "}
                    <span className="text-blue-600 font-semibold">browse</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 5MB each
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddModal(false);
                    alert("Property added successfully! (Demo)");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  <Save size={16} />
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}