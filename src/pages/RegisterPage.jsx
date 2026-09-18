import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Shield, Home, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const roles = [
  { value: "user", label: "Buyer / Renter", icon: User, desc: "Find your dream home" },
  { value: "agent", label: "Agent", icon: Shield, desc: "List & sell properties" },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!agreed) newErrors.terms = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newUser = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.toLowerCase(),
      role: formData.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name.trim())}`,
    };

    login(newUser);
    toast.success("Account created successfully. Welcome!");

    setTimeout(() => {
      setIsLoading(false);
      if (newUser.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    }, 600);
  };

  const strength = (() => {
    const p = formData.password;
    if (!p) return { score: 0, label: "", color: "" };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const normalized = Math.min(4, Math.ceil(score / 1.5));
    if (normalized <= 1) return { score: normalized, label: "Weak", color: "bg-red-500" };
    if (normalized === 2) return { score: normalized, label: "Fair", color: "bg-amber-500" };
    if (normalized === 3) return { score: normalized, label: "Good", color: "bg-blue-500" };
    return { score: normalized, label: "Strong", color: "bg-green-500" };
  })();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full blur-3xl animate-float animation-delay-300" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.06%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 w-full">
          <Link to="/" className="flex items-center gap-2 mb-12 w-fit">
            <div className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl border border-white/30">
              <Home size={26} />
            </div>
            <span className="text-3xl font-bold text-white">
              Dream<span className="text-purple-200">Estate</span>
            </span>
          </Link>
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Start your journey home today
          </h1>
          <p className="text-purple-200 text-lg mb-10 max-w-md">
            Join thousands of happy homeowners. Free forever, secure, with 24/7 support.
          </p>
          <div className="space-y-3 max-w-md">
            {[
              { title: "Save favorites", desc: "Build your shortlist across devices" },
              { title: "Direct agent contact", desc: "Message verified agents instantly" },
              { title: "Market alerts", desc: "Get notified of new matching listings" },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                <CheckCircle size={20} className="text-green-300 shrink-0" />
                <div>
                  <p className="font-semibold text-white text-sm">{b.title}</p>
                  <p className="text-xs text-purple-200">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-6 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-2xl">
                <Home size={26} />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                Dream<span className="text-blue-600 dark:text-blue-400">Estate</span>
              </span>
            </Link>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Create account</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Join DreamEstate in less than a minute.
          </p>

          <div className="card p-6 sm:p-8">
            <div className="mb-6">
              <label className="label mb-3 block">I want to register as</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role.value })}
                    aria-pressed={formData.role === role.value}
                    className={`relative p-4 rounded-2xl border-2 transition text-left ${
                      formData.role === role.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <role.icon size={18} className={formData.role === role.value ? "text-blue-600 dark:text-blue-400" : "text-gray-400"} />
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{role.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{role.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="label">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    className={`input input-icon-left ${errors.name ? "input-error" : ""}`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

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
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                  Min 6 characters with uppercase, lowercase &amp; number
                </p>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
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

                {formData.password && (
                  <div className="mt-3">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition ${
                            i <= strength.score ? strength.color : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Strength: <span className="font-medium">{strength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={`input input-icon-left input-icon-right ${errors.confirmPassword ? "input-error" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (e.target.checked && errors.terms)
                        setErrors((prev) => ({ ...prev, terms: "" }));
                    }}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => toast.info("Terms of Service coming soon")}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => toast.info("Privacy Policy coming soon")}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors.terms && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.terms}
                  </p>
                )}
              </div>

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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}