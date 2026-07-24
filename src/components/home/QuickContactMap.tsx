import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const QuickContactMap: React.FC = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '', course: 'ADCA', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      addToast('error', 'Incomplete Form', 'Please enter your name and phone number.');
      return;
    }
    setSubmitted(true);
    addToast('success', 'Enquiry Sent!', 'Our admission counselor will call you within 2 hours.');
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Quick Enquiry Form */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Quick Admission Enquiry</h3>
            <p className="text-xs text-slate-500 mb-6">Have questions about fee discount or batch timings? Send us a message.</p>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Enquiry Received!</h4>
                <p className="text-xs text-slate-600">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our admission team will contact you shortly on {formData.phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-blue-600 hover:underline pt-2"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course of Interest</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="ADCA">ADCA (1 Year Master)</option>
                    <option value="CCC">CCC Govt Certification</option>
                    <option value="Tally">Tally Prime with GST</option>
                    <option value="Typing">Hindi / English Typing</option>
                    <option value="WebDev">Full-Stack Web Dev</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Query (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Ask about batch timings, fees, or demo class..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quick Enquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Campus Map View */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Visit Campus
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">Locate Vimal Tech Academy</h3>
              <p className="text-xs text-slate-600 mt-1">Conveniently situated in City Center Education Hub, accessible via main bus terminal and metro station.</p>
            </div>

            {/* Map Placeholder Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-72 flex items-center justify-center">
              <iframe
                title="Institute Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5620815183!2d77.2090213!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjhCsDM2JzUwLjIiTiA3N8KwMTInMzI0LjUiRQ!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Vimal Tech Academy Campus Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
