import React, { useEffect, useState } from 'react';
import { Check, Mail, Phone, MapPin, Send } from 'lucide-react';
import { settingsService } from '../services/settingsService';
import { apiRequest } from '../services/api';

const WhatsAppLogo = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.892-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.414 0 6.556-5.332 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.591 5.457 0 9.894-4.437 9.894-9.893 0-2.642-1.029-5.125-2.897-6.993-1.868-1.869-4.35-2.898-6.993-2.898-5.457 0-9.894 4.437-9.894 9.894 0 2.235.614 3.911 1.72 5.805l-1.11 4.053 4.223-1.106c1.332.812 2.723 1.293 4.153 1.293h.001zm11.233-1.43c-.242-.12-.141-.429-.484-.6s-2.046-1.006-2.363-1.123-.544-.177-.771.163-.878 1.102-1.077 1.331-.399.256-.812.057c-.413-.199-1.742-.643-3.32-2.051-1.228-1.096-2.058-2.45-2.299-2.863-.242-.413-.026-.637.174-.835.18-.178.413-.485.62-.727.206-.242.275-.413.413-.687.138-.275.069-.515-.034-.727-.104-.212-.878-2.115-1.203-2.898-.316-.762-.642-.659-.878-.671l-.746-.013c-.256 0-.672.096-1.025.485-.353.388-1.345 1.316-1.345 3.208 0 1.893 1.378 3.719 1.572 3.978.194.259 2.712 4.143 6.571 5.806.917.395 1.635.631 2.193.809.921.293 1.76.252 2.423.153.739-.11 2.274-.929 2.593-1.826.319-.896.319-1.662.224-1.826-.095-.164-.351-.263-.593-.383z" />
  </svg>
);

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [settings, setSettings] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let active = true;
        async function loadSettings() {
            try {
                const data = await settingsService.public();
                if (active) {
                    setSettings(data);
                }
            } catch {
                if (active) {
                    setSettings(null);
                }
            }
        }
        loadSettings();
        return () => {
            active = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await apiRequest('/contact', {
                method: 'POST',
                body: formData,
            });
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            setError(err.message || 'Unable to send message right now.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const phoneText = Array.isArray(settings?.phone_numbers) && settings.phone_numbers.length
        ? settings.phone_numbers.join(' / ')
        : '+91 9752586956 / 9589986956';

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase">Contact Us</span>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">Let's <span className="text-blue-600 italic">Connect</span></h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">Have a question about the park or your visit? We're here to help you create the perfect experience.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* INFO SIDE */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-10">
                            {[
                                {
                                    icon: <Mail size={24} />,
                                    title: "Email Us",
                                    info: settings?.contact_email || "hello@yoyofun.com",
                                    desc: "Our support team usually responds within 2 hours."
                                },
                                {
                                    icon: <Phone size={24} />,
                                    title: "Call Us",
                                    info: phoneText,
                                    desc: "Available daily from 9:00 AM to 8:00 PM."
                                },
                                {
                                    icon: <MapPin size={24} />,
                                    title: "Visit Us",
                                    info: settings?.address || "YOYO FUN N FOODS, Madhya Pradesh, India",
                                    desc: "Come visit our main park office for on-site assistance."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="bg-white p-5 rounded-[24px] text-blue-600 shadow-sm border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                                        <p className="text-blue-600 font-bold mb-1">{item.info}</p>
                                        <p className="text-sm text-gray-400 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SOCIAL PROOF / HELP BOX */}
                        <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] p-10 rounded-[40px] text-white space-y-4 shadow-xl shadow-green-500/20">
                            <WhatsAppLogo size={32} className="text-white mb-2" />
                            <h4 className="text-2xl font-black">Get Instant Replies</h4>
                            <p className="text-green-50 font-medium leading-relaxed">Need instant answers about ticket prices, group bookings, or park timings? We're on WhatsApp!</p>
                            <a href="https://wa.me/919752586956?text=Hi%20YOYO%2C%20I%20want%20to%20book%20tickets" target="_blank" rel="noopener noreferrer" className="inline-flex mt-4 text-[#25D366] font-black items-center gap-2 hover:scale-105 transition-transform bg-white px-6 py-3 rounded-full w-fit shadow-xl">
                                Chat on WhatsApp <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* FORM SIDE */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-10 md:p-14 rounded-[48px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Your Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Subject</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300"
                                            placeholder="Booking help"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">How can we help?</label>
                                    <textarea
                                        rows="6"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300 resize-none"
                                        placeholder="Tell us about your query..."
                                        required
                                    ></textarea>
                                </div>
                                {error && (
                                    <div className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitted || isSubmitting}
                                    className={`w-full py-6 rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${submitted
                                            ? 'bg-green-500 shadow-green-200'
                                            : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200 shadow-blue-500/20'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                                    ) : submitted ? (
                                        <><Check size={24} /> Sent Successfully!</>
                                    ) : (
                                        <><Send size={20} /> Request Call Back</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
