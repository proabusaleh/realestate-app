import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageSquare,
  Camera,
  Briefcase,
  ArrowRight,
  Send,
  CheckCircle,
  Clock,
} from "lucide-react";

const socials = [
  { icon: Globe, label: "Website" },
  { icon: MessageSquare, label: "Chat" },
  { icon: Camera, label: "Instagram" },
  { icon: Briefcase, label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-2xl group-hover:scale-110 transition-transform">
                <Home size={24} />
              </div>
              <span className="text-2xl font-bold text-white">
                Dream<span className="text-blue-400">Estate</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Your trusted partner in finding the perfect property.
              We make real estate simple, transparent, and accessible for everyone.
            </p>
            {/* Newsletter mini */}
            <div>
              <p className="text-white font-semibold text-sm mb-3">Get market updates in your inbox</p>
              {done ? (
                <div className="flex items-center gap-2 text-green-400 text-sm animate-scale-in">
                  <CheckCircle size={18} />
                  You're subscribed. Welcome aboard!
                </div>
              ) : (
                <form onSubmit={subscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 min-w-0 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition flex items-center gap-1.5 text-sm font-semibold"
                    aria-label="Subscribe"
                  >
                    <Send size={16} />
                    <span className="hidden sm:inline">Join</span>
                  </button>
                </form>
              )}
            </div>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-r from-blue-600 to-indigo-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-base mb-6 relative pb-3">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Properties", to: "/properties" },
                { label: "Agents", to: "/agents" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Blog", to: "/blog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm"
                  >
                    <ArrowRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-base mb-6 relative pb-3">
              Property Types
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Houses", to: "/properties?type=house" },
                { label: "Apartments", to: "/properties?type=apartment" },
                { label: "Villas", to: "/properties?type=villa" },
                { label: "Commercial", to: "/properties?type=commercial" },
                { label: "For Sale", to: "/properties?listingType=sale" },
                { label: "For Rent", to: "/properties?listingType=rent" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm"
                  >
                    <ArrowRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-base mb-6 relative pb-3">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-blue-500" />
                </div>
                <span className="text-sm text-gray-400">123 Real Estate Ave, Suite 100, New York, NY 10001</span>
              </li>
              <li>
                <a href="tel:+15551234567" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0 transition">
                    <Phone size={16} className="text-blue-500" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition">+1 (555) 123-4567</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@dreamestate.com" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0 transition">
                    <Mail size={16} className="text-blue-500" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition">info@dreamestate.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-blue-500" />
                </div>
                <span className="text-sm text-gray-400">Mon – Sat: 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} DreamEstate. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}