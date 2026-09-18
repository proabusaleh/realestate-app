import { useState } from "react";
import { Send, CheckCircle, Mail, Sparkles, Star } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="section-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 md:p-16 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-300" />
          </div>

          {/* Floating Icons */}
          <div className="absolute top-20 right-20 opacity-5">
            <Star size={24} className="text-white animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div className="absolute bottom-20 left-20 opacity-5">
            <Star size={16} className="text-white animate-bounce delay-500" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
              <Mail size={32} className="text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with the Latest Insights
            </h2>
            <p className="text-blue-200 mb-8 text-lg max-w-xl mx-auto">
              Subscribe to our newsletter and get property listings, market trends,
              exclusive deals, and expert tips delivered weekly.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-400/30 text-green-300 px-6 py-4 rounded-2xl backdrop-blur-sm">
                <CheckCircle size={24} />
                <span className="font-medium">Subscribed successfully! Check your email.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <div className="relative flex-1">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold hover:shadow-xl hover:shadow-white/10 active:scale-95 transition-all duration-300"
                >
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <p className="text-blue-300 text-xs mt-4 flex items-center justify-center gap-1">
              <Sparkles size={12} />
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}