import React, { useEffect, useState } from 'react';
import { Check, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { settingsService } from '../services/settingsService';
import { apiRequest } from '../services/api';

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
                        <div className="bg-gray-900 p-10 rounded-[40px] text-white space-y-4">
                            <MessageCircle className="text-blue-500 mb-2" size={32} />
                            <h4 className="text-2xl font-black">Live Support?</h4>
                            <p className="text-gray-400 font-medium leading-relaxed">Need instant answers? Our chat support is available 24/7 during the summer season.</p>
                            <button className="pt-2 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors">
                                Start a chat now <span>→</span>
                            </button>
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
                                        <><Send size={20} /> Send Message</>
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
