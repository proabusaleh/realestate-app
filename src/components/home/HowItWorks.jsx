import { Search, Home, FileCheck, Key, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Property",
    description:
      "Browse thousands of listings using our advanced search filters to find your perfect match.",
    gradient: "from-blue-500 to-indigo-500",
    soft: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Home,
    title: "Visit Property",
    description:
      "Schedule a viewing with our agents. Explore the property in person or take a virtual tour.",
    gradient: "from-green-500 to-emerald-500",
    soft: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: FileCheck,
    title: "Sign Documents",
    description:
      "Our team handles all the paperwork. We make the legal process smooth and hassle-free.",
    gradient: "from-purple-500 to-violet-500",
    soft: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Key,
    title: "Get Your Keys",
    description:
      "Congratulations! Move into your dream home and start making beautiful memories.",
    gradient: "from-amber-500 to-orange-500",
    soft: "bg-amber-50 dark:bg-amber-900/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="section bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
            <Sparkles size={14} />
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            Finding your dream property is easier than you think. Follow these four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-amber-200 dark:from-blue-800 dark:via-purple-800 dark:to-amber-800" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative z-10 mb-6 flex justify-center">
                  <div className="relative">
                    <div
                      className={`w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-br ${step.gradient}
                                  flex items-center justify-center
                                  group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xl`}
                    >
                      <step.icon size={36} className="text-white" />
                    </div>
                    <div
                      className={`absolute -top-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient}
                                  flex items-center justify-center text-white font-bold shadow-lg border-4 border-white dark:border-gray-900`}
                    >
                      {index + 1}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}