import React, { useState, useEffect } from 'react';
import { Ticket, Check, ShoppingCart, X, CreditCard, User, Phone, CalendarDays } from 'lucide-react';
import { ticketService } from '../services/ticketService';
import { bookingService } from '../services/bookingService';
import LoadingSpinner from '../components/common/LoadingSpinner';

function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [visitDate, setVisitDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [booked, setBooked] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutError, setCheckoutError] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    useEffect(() => {
        let active = true;
        async function loadTickets() {
            try {
                const data = await ticketService.list();
                if (active) {
                    setTickets(data);
                }
            } catch (err) {
                if (active) {
                    setLoadError(err.message || 'Unable to load tickets.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }
        loadTickets();
        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleRazorpayPayment = async (e) => {
        e.preventDefault();
        if (!selectedTicket || isProcessing) return;

        setIsProcessing(true);
        setCheckoutError('');

        try {
            if (!window.Razorpay) {
                throw new Error('Razorpay checkout did not load. Please refresh and try again.');
            }

            const order = await bookingService.createOrder({
                customer_name: name,
                customer_email: email,
                customer_phone: phone,
                ticket_id: selectedTicket.id,
                quantity: Number(quantity),
                visit_date: visitDate,
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || order.key_id,
                amount: order.razorpay_order.amount,
                currency: order.razorpay_order.currency,
                order_id: order.razorpay_order.id,
                name: "YOYO FUN 'N' FOODS",
                description: `Booking for ${selectedTicket.name}`,
                image: "/logo.png",
                handler: async function (response) {
                    try {
                        const verified = await bookingService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        setConfirmation(verified);
                        setBooked(true);
                        setTimeout(() => {
                            setBooked(false);
                            setSelectedTicket(null);
                            resetForm();
                        }, 3500);
                    } catch (err) {
                        setCheckoutError(err.message || 'Payment verification failed.');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phone,
                },
                theme: {
                    color: "#1d4ed8",
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            if (!options.key) {
                throw new Error('Razorpay key is missing. Please contact support.');
            }

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setCheckoutError(err.message || 'Unable to create payment order.');
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setVisitDate(new Date().toISOString().slice(0, 10));
        setQuantity(1);
        setConfirmation(null);
    };

    const maxQuantity = selectedTicket ? Math.max(1, Math.min(10, selectedTicket.stock)) : 10;

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase">Tickets & Passes</span>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">Unlock the <span className="text-blue-600 italic">Magic</span></h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Skip the line and dive straight into the fun. Select your pass below and start your adventure today.</p>
                </div>

                {loading && <LoadingSpinner label="Loading tickets" />}
                {loadError && (
                    <div className="max-w-2xl mx-auto rounded-3xl bg-red-50 px-6 py-5 text-center text-sm font-bold text-red-600">
                        {loadError}
                    </div>
                )}

                {!loading && !loadError && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 px-4">
                        {tickets.map((t) => {
                            const soldOut = t.stock <= 0;
                            const features = t.features?.length ? t.features : ['All Day Entry', 'Locker Access', 'Safety Gear Included'];
                            return (
                                <div
                                    key={t.id}
                                    className="group relative bg-white p-10 rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="relative z-10">
                                        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                            <Ticket size={32} />
                                        </div>
                                        <h3 className="text-3xl font-black text-gray-900 mb-2">{t.name}</h3>
                                        <p className="text-gray-500 mb-8 leading-relaxed font-medium">{t.description}</p>

                                        <div className="flex items-end gap-1 mb-8">
                                            <span className="text-5xl font-black text-gray-900">₹{t.price}</span>
                                            <span className="text-gray-400 font-bold mb-1">/ person</span>
                                        </div>

                                        <ul className="space-y-4 mb-10">
                                            {features.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                                    <div className="w-5 h-5 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                                                        <Check size={12} strokeWidth={3} />
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => { setSelectedTicket(t); setCheckoutError(''); }}
                                            disabled={soldOut}
                                            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 active:scale-95 shadow-lg ${soldOut ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-blue-600'}`}
                                        >
                                            {soldOut ? 'Sold Out' : 'Select Pass'}
                                        </button>

                                        <p className="mt-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            {soldOut ? 'Sold out' : `${t.stock} Available`}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* MODAL VIEW FOR BOOKING */}
            {selectedTicket && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => !isProcessing && setSelectedTicket(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-xl rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                        {/* Header Image/Background */}
                        <div className="h-40 bg-blue-600 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute bottom-0 right-0 w-80 h-80 bg-black rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                            </div>
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="absolute top-8 right-8 p-3 bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors z-10"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute bottom-8 left-10 text-white">
                                <h2 className="text-3xl font-black">Checkout</h2>
                                <p className="text-blue-100 font-semibold opacity-80">{selectedTicket.name}</p>
                            </div>
                        </div>

                        <div className="p-10 pt-12">
                            <form onSubmit={handleRazorpayPayment} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-wider">
                                            <User size={14} /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-wider">Quantity</label>
                                        <select
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                                        >
                                            {Array.from({ length: maxQuantity }, (_, index) => index + 1).map(n => (
                                                <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-wider">
                                            <Phone size={14} /> Phone
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold placeholder:text-gray-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-wider">
                                        <CalendarDays size={14} /> Visit Date
                                    </label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().slice(0, 10)}
                                        value={visitDate}
                                        onChange={(e) => setVisitDate(e.target.value)}
                                        className="w-full p-5 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                                        required
                                    />
                                </div>

                                <div className="p-8 bg-blue-50/50 rounded-3xl flex justify-between items-center border border-blue-100/50 shadow-inner">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-blue-600/60 uppercase tracking-widest">Grand Total</p>
                                        <p className="text-3xl font-black text-blue-600">
                                            ₹{selectedTicket.price * quantity}
                                        </p>
                                    </div>
                                    <ShoppingCart className="text-blue-100 h-12 w-12" />
                                </div>

                                {checkoutError && (
                                    <div className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
                                        {checkoutError}
                                    </div>
                                )}
                                {confirmation && (
                                    <div className="rounded-2xl bg-green-50 px-5 py-4 text-sm font-bold text-green-700">
                                        Booking confirmed: {confirmation.booking_id}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={booked || isProcessing}
                                    className={`w-full py-6 rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${booked
                                        ? 'bg-green-500 shadow-green-200'
                                        : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200'
                                        } disabled:opacity-70`}
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Redirecting to Razorpay...</span>
                                        </div>
                                    ) : booked ? (
                                        <>
                                            <Check size={24} />
                                            <span>Booking Confirmed!</span>
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard size={20} />
                                            <span>Pay Now via Razorpay</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest">
                                    Secure SSL encrypted payment
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tickets;
