import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        category: "General Information",
        questions: [
            {
                q: "What are the park's operating hours?",
                a: "YOYO Fun 'N' Foods is open daily from 10:00 AM to 7:00 PM. Water park attractions typically start closing 30 minutes before the main park closure."
            },
            {
                q: "Where is the park located?",
                a: "We are located at YOYO FUN N FOODS, Madhya Pradesh, India. You can find detailed directions on our Contact page."
            },
            {
                q: "Is there an age limit for the park?",
                a: "We welcome guests of all ages! However, certain rides and attractions have height and age restrictions for safety reasons. Please check the signage at each attraction."
            }
        ]
    },
    {
        category: "Ticketing & Payments",
        questions: [
            {
                q: "How do I book tickets online?",
                a: "You can book tickets directly through our website by clicking the 'Book Tickets' button. We use Razorpay for secure and seamless payments."
            },
            {
                q: "Do I need to print my online ticket?",
                a: "No, you don't need to print it. Just show the digital ticket/confirmation email on your smartphone at the entrance gate."
            },
            {
                q: "What is your refund policy?",
                a: "Tickets are generally non-refundable. However, in cases of park-wide closure due to extreme weather, we may offer rescheduling or refunds. Please see our Refund Policy page for details."
            }
        ]
    },
    {
        category: "Park Rules & Safety",
        questions: [
            {
                q: "Is outside food allowed?",
                a: "Outside food and beverages are not permitted inside the park. We have a wide variety of food stalls and multi-cuisine restaurants offering delicious meals."
            },
            {
                q: "Are swimwear and costumes mandatory?",
                a: "For the water park area, proper nylon or poly-nylon swimwear is mandatory for hygiene and safety. We have swimwear available for purchase or rent at our merchandise stores."
            },
            {
                q: "Is parking available?",
                a: "Yes, we have a large dedicated parking area for both two-wheelers and four-wheelers. Parking is free for our guests."
            }
        ]
    }
];

const FAQ = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-gray-50/50">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase">Support Center</span>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">How can we <span className="text-blue-600 italic">help?</span></h1>
                    <p className="text-lg text-gray-500 font-medium">Find answers to common questions about your visit and ticket bookings.</p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-12">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for a question..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-16 pr-8 py-6 bg-white rounded-[24px] border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-lg"
                    />
                </div>

                {/* FAQ List */}
                <div className="space-y-12">
                    {filteredFaqs.length > 0 ? filteredFaqs.map((category, catIdx) => (
                        <div key={catIdx} className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest pl-2 border-l-4 border-blue-600">{category.category}</h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, qIdx) => {
                                    const index = `${catIdx}-${qIdx}`;
                                    const isOpen = openIndex === index;
                                    return (
                                        <div
                                            key={qIdx}
                                            className={`bg-white rounded-[32px] border border-gray-100 transition-all duration-300 ${isOpen ? 'shadow-xl ring-1 ring-blue-600/10' : 'hover:shadow-md'}`}
                                        >
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className="w-full flex items-center justify-between p-8 text-left"
                                            >
                                                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-800'}`}>
                                                    {faq.q}
                                                </span>
                                                {isOpen ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-gray-400" />}
                                            </button>
                                            {isOpen && (
                                                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="h-[1px] bg-gray-50 mb-6" />
                                                    <p className="text-gray-500 leading-relaxed font-medium">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-white rounded-[48px] border border-dashed border-gray-200">
                            <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-xl font-bold text-gray-400">No questions found matching your search.</p>
                            <button onClick={() => setSearchTerm("")} className="mt-4 text-blue-600 font-bold hover:underline">Clear search</button>
                        </div>
                    )}
                </div>

                {/* Contact CTA */}
                <div className="mt-24 bg-gray-900 rounded-[48px] p-12 text-center text-white space-y-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black">Still have questions?</h2>
                        <p className="text-gray-400 max-w-xl mx-auto font-medium">If you couldn't find what you were looking for, our friendly team is ready to assist you personally.</p>
                        <div className="flex flex-wrap justify-center gap-6 pt-6">
                            <Link to="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all hover:scale-105 flex items-center gap-2">
                                <MessageCircle size={20} /> Contact Support
                            </Link>
                            <a href="tel:+919752586956" className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all flex items-center gap-2 border border-white/10">
                                <Phone size={20} /> Call Us Direct
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
