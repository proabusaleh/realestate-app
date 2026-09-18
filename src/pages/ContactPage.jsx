import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, ChevronDown } from "lucide-react";
import { useToast } from "../context/ToastContext";

const contactInfo = [
  { icon: MapPin, title: "Visit Our Office", details: "123 Real Estate Ave, Suite 100\nNew York, NY 10001", bg: "bg-blue-500" },
  { icon: Phone, title: "Call Us", details: "+1 (555) 123-4567\nMon–Fri: 9am – 6pm EST", bg: "bg-green-500" },
  { icon: Mail, title: "Email Us", details: "info@dreamestate.com\nsupport@dreamestate.com", bg: "bg-purple-500" },
  { icon: Clock, title: "Business Hours", details: "Mon – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 4:00 PM", bg: "bg-amber-500" },
];

const faqs = [
  {
    q: "How do I schedule a property viewing?",
    a: "You can schedule a viewing by clicking the 'Schedule Viewing' button on any property listing, or by contacting the listing agent directly via phone or email.",
  },
  {
    q: "What documents do I need to buy a property?",
    a: "Typically you'll need: government-issued ID, proof of income, bank statements, credit report, and pre-approval letter from a lender. Requirements vary by location.",
  },
  {
    q: "How long does the buying process take?",
    a: "On average, 30–60 days from offer acceptance to closing. Cash purchases can close in 2–3 weeks. Timelines vary based on financing, inspections, and local regulations.",
  },
  {
    q: "Do you charge fees for buyers?",
    a: "No! Our platform is free for buyers. The seller typically pays the agent commission. We believe in transparent pricing with no hidden fees.",
  },
  {
    q: "Can I list my property on DreamEstate?",
    a: "Absolutely! We offer flexible listing packages for sellers and agents. Contact our partnerships team at partnerships@dreamestate.com for details.",
  },
];

export default function ContactPage() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent! We'll reply within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Contact Us
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-5">
            {contactInfo.map((item, i) => (
              <div
                key={item.title}
                className="card-hover p-6 animate-slide-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line leading-relaxed">{item.details}</p>
              </div>
            ))}

            {/* Social */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: "F", label: "Facebook", bg: "bg-blue-600" },
                  { icon: "X", label: "X (Twitter)", bg: "bg-sky-500" },
                  { icon: "I", label: "Instagram", bg: "bg-pink-500" },
                  { icon: "L", label: "LinkedIn", bg: "bg-blue-700" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-xl ${social.bg} flex items-center justify-center hover:opacity-90 hover:scale-110 transition text-white font-bold`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form */}
            <div className="card p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="label">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        autoComplete="name"
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="label">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="label">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        autoComplete="tel"
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="label">Subject *</label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="buy">Buying a Property</option>
                        <option value="sell">Selling a Property</option>
                        <option value="rent">Renting</option>
                        <option value="agent">Agent Partnership</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="label">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="input resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.99] transition shadow-lg shadow-blue-600/30"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map card */}
            <div className="card overflow-hidden">
              <div className="h-80 sm:h-96 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.08%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
                <div className="relative z-10 text-center p-8">
                  <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4 animate-bounce-slow">
                    <MapPin size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Our Location</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                    123 Real Estate Ave, Suite 100<br />
                    New York, NY 10001
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=123+Real+Estate+Ave+New+York+NY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white text-sm rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    <MapPin size={16} />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    open
                      ? "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 shadow-soft"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex items-center justify-between gap-4 w-full p-5 sm:p-6 text-left"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">{faq.q}</h3>
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        open ? "bg-blue-600 text-white rotate-180" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}