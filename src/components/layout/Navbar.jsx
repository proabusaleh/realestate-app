import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home as HomeIcon,
  Building2,
  Users,
  Phone,
  Info,
  LogIn,
  UserPlus,
  Heart,
  User as UserIcon,
  LogOut,
  ShoppingCart,
  Bell,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../hooks/useFavorites";

const navLinks = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Properties", path: "/properties", icon: Building2 },
  { name: "Agents", path: "/agents", icon: Users },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Phone },
  { name: "Blog", path: "/blog", icon: ShoppingCart },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { count } = useFavorites();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-soft border-b border-gray-100 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="DreamEstate Home"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <HomeIcon size={22} />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Dream<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Estate</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`relative px-4 py-2.5 font-medium text-sm rounded-xl transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <link.icon size={18} />
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Favorites */}
            <Link
              to="/favorites"
              onClick={closeMobileMenu}
              className="relative p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300"
              aria-label={`Favorites${count > 0 ? ` (${count})` : ""}`}
            >
              <Heart size={20} className={count > 0 ? "fill-current text-red-500" : ""} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-scale-in">
                  {count}
                </span>
              )}
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <button
                className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-300"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-300"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 rounded-xl transition"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "user"}`}
                    alt=""
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                  />
                  <span className="font-medium text-sm hidden sm:block">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg border border-gray-100 dark:border-gray-700 py-2 animate-scale-in z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <UserIcon size={18} />
                        Dashboard
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <Heart size={18} className="text-red-500" />
                        Favorites
                        {count > 0 && (
                          <span className="ml-auto px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                            {count}
                          </span>
                        )}
                      </Link>
                      <hr className="my-2 border-gray-100 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition transform hover:scale-[1.02]"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-[600px] opacity-100 visible pb-4"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-soft-lg">
          <div className="px-4 pt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                  location.pathname === link.path
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            ))}
            <hr className="my-3 border-gray-100 dark:border-gray-800" />
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl font-medium"
                >
                  <UserIcon size={20} />
                  Dashboard
                </Link>
                <Link
                  to="/favorites"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl font-medium"
                >
                  <Heart size={20} className="text-red-500" />
                  Favorites ({count})
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl font-medium w-full justify-center"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl font-medium"
                >
                  <LogIn size={20} />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium justify-center"
                >
                  <UserPlus size={20} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}