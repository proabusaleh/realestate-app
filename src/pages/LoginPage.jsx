import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Home, AlertCircle, Shield, TrendingUp, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const demoUsers = {
  "admin@test.com": { id: 1, name: "Admin User", email: "admin@test.com", role: "admin", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  "agent@test.com": { id: 2, name: "John Agent", email: "agent@test.com", role: "agent", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
  "user@test.com": { id: 3, name: "Jane Buyer", email: "user@test.com", role: "user", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
};

const demoAccounts = [
  { email: "admin@test.com", role: "Admin", classes: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" },
  { email: "agent@test.com", role: "Agent", classes: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" },
  { email: "user@test.com", role: "User", classes: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" },
];

const highlights = [
  { icon: Shield, title: "Verified Listings", desc: "Every property authenticated by our team" },
  { icon: Users, title: "500+ Expert Agents", desc: "Licensed professionals at your service" },
  { icon: TrendingUp, title: "Market Insights", desc: "Real-time data to guide your decision" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = demoUsers[formData.email.toLowerCase()];

    if (user && formData.password === "123456") {
      login(user);
      if (remember) {
        localStorage.setItem("dreamestate_remember", formData.email);
      } else {
        localStorage.removeItem("dreamestate_remember");
      }
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      setTimeout(() => {
        if (user.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      }, 600);
    } else {
      setErrors({ form: "Invalid credentials. Try a demo account below (password: 123456)" });
      toast.error("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl animate-float animation-delay-300" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.06%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 w-full">
          <Link to="/" className="flex items-center gap-2 mb-12 w-fit">
            <div className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl border border-white/30">
              <Home size={26} />
            </div>
            <span className="text-3xl font-bold text-white">
              Dream<span className="text-blue-200">Estate</span>
            </span>
          </Link>
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Welcome back to your property journey
          </h1>
          <p className="text-blue-200 text-lg mb-10 max-w-md">
            Sign in to manage favorites, track inquiries, and pick up right where you left off.
          </p>
          <div className="space-y-4 max-w-md">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <h.icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{h.title}</p>
                  <p className="text-sm text-blue-200">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-2xl">
                <Home size={26} />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                Dream<span className="text-blue-600 dark:text-blue-400">Estate</span>
              </span>
            </Link>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Sign in</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
            Welcome back! Please enter your details.
          </p>

          <div className="card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="label">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`input input-icon-left ${errors.email ? "input-error" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="label">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`input input-icon-left input-icon-right ${errors.password ? "input-error" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {errors.form && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2.5 rounded-xl">
                  <AlertCircle size={14} className="shrink-0" />
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
                Demo Accounts <span className="font-semibold">(password: 123456)</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => {
                      setFormData({ email: acc.email, password: "123456" });
                      setErrors({});
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition ${acc.classes}`}
                  >
                    {acc.role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}