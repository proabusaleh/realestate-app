import { Home, Users, Award, Heart, Star, TrendingUp, Shield, Globe, Zap } from "lucide-react";

const values = [
  { icon: Heart, title: "Integrity", desc: "We do what's right, even when no one is watching. Honest advice, transparent pricing." },
  { icon: Star, title: "Excellence", desc: "We strive for perfection in every interaction. Your satisfaction is our success metric." },
  { icon: Users, title: "Client First", desc: "Your needs come first. We listen, understand, and deliver personalized solutions." },
  { icon: TrendingUp, title: "Innovation", desc: "We embrace technology to make real estate simpler, faster, and more accessible." },
];

const team = [
  { name: "Michael Roberts", role: "Founder & CEO", bio: "20+ years in real estate. Built DreamEstate from the ground up.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Jennifer Adams", role: "COO", bio: "Operations expert. Ensures every transaction runs smoothly.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "David Kim", role: "CTO", bio: "Tech visionary. Building the future of property search.", avatar: "randomuser.me/api/portraits/men/67.jpg" },
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/20 border border-white/30 text-white rounded-full text-sm font-medium mb-6">
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
              We're on a mission to transform how people buy, sell, and rent properties.
              No hidden fees, no pressure—just honest guidance from experts who care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="px-8 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg">
                Work With Us
              </a>
              <a href="/properties" className="px-8 py-3 bg-white/20 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition">
                Browse Properties
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Home, value: "15K+", label: "Properties Listed", color: "bg-blue-500" },
              { icon: Users, value: "10K+", label: "Happy Customers", color: "bg-green-500" },
              { icon: Award, value: "500+", label: "Expert Agents", color: "bg-purple-500" },
              { icon: Globe, value: "200+", label: "Cities Covered", color: "bg-amber-500" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className={`w-16 h-16 mx-auto rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Empowering Everyone to Find Home
              </h2>
              <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                We believe that finding a place to call home shouldn't be complicated,
                stressful, or expensive. Our platform was built to remove the friction
                from real estate transactions and put power back in the hands of people.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Every feature we build, every policy we set, every decision we make
                starts with one question: "Does this help our customers?"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Shield size={28} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Verified Listings</h3>
                  <p className="text-gray-500 text-sm">Every property verified by our team</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap size={36} className="text-white" />
                  </div>
                  <p className="text-blue-800 font-medium">Video Presentation</p>
                  <p className="text-blue-500 text-sm">Click to watch our story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <value.icon size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Milestones That Matter
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-center gap-8 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 z-10">
                    {m.year}
                  </div>
                  <div className={`w-full md:w-1/2 p-6 bg-gray-50 rounded-2xl ${
                    i % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  }`}>
                    <h3 className="text-lg font-bold text-gray-900">{m.title}</h3>
                    <p className="text-gray-600 mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Meet Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream home with DreamEstate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/properties" className="px-8 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg">
              Browse Properties
            </a>
            <a href="/contact" className="px-8 py-3 bg-blue-700 border border-blue-500 text-white rounded-xl font-semibold hover:bg-blue-800 transition">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}