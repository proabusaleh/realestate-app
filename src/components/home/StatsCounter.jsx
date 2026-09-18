import { useState, useEffect, useRef } from "react";
import { Home, Users, Award, MapPin, Sparkles } from "lucide-react";

const stats = [
  { icon: Home, value: 15000, suffix: "+", label: "Properties Listed", text: "text-blue-300" },
  { icon: Users, value: 10000, suffix: "+", label: "Happy Customers", text: "text-green-300" },
  { icon: Award, value: 500, suffix: "+", label: "Award Winning", text: "text-purple-300" },
  { icon: MapPin, value: 200, suffix: "+", label: "Cities Covered", text: "text-amber-300" },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="section-sm relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-float animation-delay-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles size={16} />
            Our Achievements
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Numbers That Speak
          </h2>
          <p className="text-blue-200 mt-3 max-w-xl mx-auto">
            We're proud of what we've built through dedication and excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <stat.icon size={30} className={stat.text} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-blue-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}