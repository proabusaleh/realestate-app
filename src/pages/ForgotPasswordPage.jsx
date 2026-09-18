import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Home, AlertCircle, CheckCircle, ArrowLeft, KeyRound, Send } from "lucide-react";
import { useToast } from "../context/ToastContext";

const steps = [
  { title: "Enter your email", desc: "Use the address linked to your account" },
  { title: "Check your inbox", desc: "We send a secure reset link instantly" },
  { title: "Set a new password", desc: "Pick something strong and unique" },
];

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSent(true);
    toast.success("Password reset link sent");
  };

  const handleResend = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    toast.info("Reset link sent again — check your inbox");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
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
            Locked out? Let&apos;s get you back in
          </h1>
          <p className="text-blue-200 text-lg mb-10 max-w-md">
            Resetting your password takes less than a minute. No support ticket needed.
          </p>
          <div className="space-y-4 max-w-md">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center shrink-0 font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="text-sm text-blue-200">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="w-full max-w-md animate-slide-up">
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

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition mb-6"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>

          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
            <KeyRound size={26} className="text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Forgot password?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
            Enter your account email and we&apos;ll send you a secure reset link.
          </p>

          <div className="card p-6 sm:p-8">
            {sent ? (
              <div className="text-center animate-scale-in">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Check your inbox
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  We sent a reset link to
                </p>
                <p className="font-semibold text-gray-900 dark:text-white mb-6">{email}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
                  Didn&apos;t get it? Check spam, or request a new link below.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleResend}
                    disabled={isLoading}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-50 shadow-lg shadow-blue-600/30"
                  >
                    {isLoading ? "Sending..." : "Resend Link"}
                  </button>
                  <button
                    onClick={() => setSent(false)}
                    className="w-full py-3.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    Use a Different Email
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="reset-email" className="label">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`input input-icon-left ${error ? "input-error" : ""}`}
                    />
                  </div>
                  {error && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending link...
                    </span>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6 text-sm">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}