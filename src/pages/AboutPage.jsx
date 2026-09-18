import { Link } from "react-router-dom";
import { Home, Users, Award, Heart, Star, TrendingUp, Shield, Globe, Zap, ArrowRight } from "lucide-react";

const values = [
  { icon: Heart, title: "Integrity", desc: "We do what's right, even when no one is watching. Honest advice, transparent pricing." },
  { icon: Star, title: "Excellence", desc: "We strive for perfection in every interaction. Your satisfaction is our success metric." },
  { icon: Users, title: "Client First", desc: "Your needs come first. We listen, understand, and deliver personalized solutions." },
  { icon: TrendingUp, title: "Innovation", desc: "We embrace technology to make real estate simpler, faster, and more accessible." },
];

const team = [
  { name: "Michael Roberts", role: "Founder & CEO", bio: "20+ years in real estate. Built DreamEstate from the ground up.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Jennifer Adams", role: "COO", bio: "Operations expert. Ensures every transaction runs smoothly.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "David Kim", role: "CTO", bio: "Tech visionary. Building the future of property search.", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
  { name: "Lisa Thompson", role: "Head of Sales", bio: "Top performer. Leads our agent network nationwide.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const milestones = [
  { year: "2018", title: "Founded", desc: "Started with a vision to transform real estate" },
  { year: "2019", title: "First 1K Users", desc: "Reached 1,000 registered users" },
  { year: "2020", title: "Mobile App Launch", desc: "Released iOS and Android apps" },
  { year: "2021", title: "Series A Funding", desc: "Raised $10M to accelerate growth" },
  { year: "2022", title: "National Expansion", desc: "Expanded to all 50 states" },
  { year: "2023", title: "15K Properties", desc: "Surpassed 15,000 active listings" },
];

const stats = [
  { icon: Home, value: "15K+", label: "Properties Listed", bg: "bg-blue-500" },
  { icon: Users, value: "10K+", label: "Happy Customers", bg: "bg-green-500" },
  { icon: Award, value: "500+", label: "Expert Agents", bg: "bg-purple-500" },
  { icon: Globe, value: "200+", label: "Cities Covered", bg: "bg-amber-500" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-float animation-delay-300" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-slide-up">
            <span className="inline-block px-4 py-1.5 bg-white/20 border border-white/30 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              About DreamEstate
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Making Real Estate
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                Simple & Transparent
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              We&apos;re on a mission to transform how people buy, sell, and rent properties.
              No hidden fees, no pressure — just honest guidance from experts who care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg">
                Work With Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/properties" className="px-8 py-3 bg-white/20 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition backdrop-blur-sm">
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="card-elevated p-6 sm:p-8 text-center animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl ${stat.bg} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                Empowering Everyone to Find Home
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed text-lg">
                We believe that finding a place to call home shouldn&apos;t be complicated,
                stressful, or expensive. Our platform was built to remove the friction
                from real estate transactions and put power back in the hands of people.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                Every feature we build, every policy we set, every decision we make
                starts with one question: &ldquo;Does this help our customers?&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
                  <Shield size={26} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Verified Listings</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Every property verified by our team</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.06%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
                <div className="text-center p-8 relative z-10">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap size={36} className="text-white" />
                  </div>
                  <p className="text-white font-semibold">Our Story in Numbers</p>
                  <p className="text-blue-200 text-sm">8 years • 50 states • 15K+ listings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value) => (
              <div key={value.title} className="card-hover p-8 group">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition">
                  <value.icon size={28} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Milestones That Matter
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-indigo-400 dark:from-blue-800 dark:via-blue-600 dark:to-indigo-600" />
            <div className="space-y-8 md:space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-center gap-6 md:gap-8 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shrink-0 z-10 shadow-lg shadow-blue-600/30 rotate-3">
                    {m.year}
                  </div>
                  <div className={`w-full md:w-1/2 p-6 card ${
                    i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{m.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Meet Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member) => (
              <div key={member.name} className="card-hover overflow-hidden group text-center">
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream home with DreamEstate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/properties" className="px-8 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg">
              Browse Properties
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-blue-800/60 border border-blue-400/40 text-white rounded-xl font-semibold hover:bg-blue-800 transition backdrop-blur-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}