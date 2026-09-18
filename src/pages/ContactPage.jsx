import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, Map, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: MapPin, title: "Visit Our Office", details: "123 Real Estate Ave, Suite 100, New York, NY 10001", color: "bg-blue-500" },
    { icon: Phone, title: "Call Us", details: "+1 (555) 123-4567\nMon-Fri: 9am - 6pm EST", color: "bg-green-500" },
    { icon: Mail, title: "Email Us", details: "info@dreamestate.com\nsupport@dreamestate.com", color: "bg-purple-500" },
    { icon: Clock, title: "Business Hours", details: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed", color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Contact Us
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{item.details}</p>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: "Facebook", color: "bg-blue-600" },
                  { icon: "Twitter", color: "bg-sky-500" },
                  { icon: "Instagram", color: "bg-pink-500" },
                  { icon: "Linkedin", color: "bg-blue-700" },
                ].map((social) => (
                  <a
                    key={social.icon}
                    href="#"
                    className={`w-10 h-10 rounded-xl ${social.color} flex items-center justify-center hover:opacity-90 transition`}
                  >
                    <div className="text-white text-lg font-bold">{social.icon[0]}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-96 bg-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50" />
                <div className="relative z-10 text-center p-8">
                  <Map size={48} className="mx-auto text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Our Location</h3>
                  <p className="text-gray-500 mb-4">
                    123 Real Estate Ave, Suite 100<br />
                    New York, NY 10001
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1 mx-auto w-fit"
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
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do I schedule a property viewing?",
                a: "You can schedule a viewing by clicking the 'Schedule Viewing' button on any property listing, or by contacting the listing agent directly via phone or email."
              },
              {
                q: "What documents do I need to buy a property?",
                a: "Typically you'll need: government-issued ID, proof of income, bank statements, credit report, and pre-approval letter from a lender. Requirements vary by location."
              },
              {
                q: "How long does the buying process take?",
                a: "On average, 30-60 days from offer acceptance to closing. Cash purchases can close in 2-3 weeks. Timelines vary based on financing, inspections, and local regulations."
              },
              {
                q: "Do you charge fees for buyers?",
                a: "No! Our platform is free for buyers. The seller typically pays the agent commission. We believe in transparent pricing with no hidden fees."
              },
              {
                q: "Can I list my property on DreamEstate?",
                a: "Absolutely! We offer flexible listing packages for sellers and agents. Contact our partnerships team at partnerships@dreamestate.com for details."
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl border border-gray-100">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-gray-900 pr-8">{faq.q}</h3>
                  <MessageSquare size={20} className="text-blue-500 shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}