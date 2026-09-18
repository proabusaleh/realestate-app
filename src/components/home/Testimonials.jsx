import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/properties";

export default function Testimonials() {
  return (
    <section className="section-sm bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 shadow-sm">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            Real stories from real people who found their dream homes
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className={`group card-hover p-8 ${
                index === 1 ? "md:-mt-4 md:mb-4 border-blue-100 dark:border-blue-900/50 shadow-soft-lg" : ""
              }`}
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:scale-110 transition">
                <Quote size={22} className="text-blue-500 dark:text-blue-400" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {t.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
