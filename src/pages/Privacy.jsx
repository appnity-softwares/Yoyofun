import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">Privacy Policy</h1>
                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                    <p>Last updated: February 25, 2026</p>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, such as when you create an account, purchase a ticket, or contact us. This may include your name, email address, phone number, and payment information.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, including processing your ticket bookings and communicating with you about your visit.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Sharing of Information</h2>
                        <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., payment processors like Razorpay) or as required by law.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Security</h2>
                        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
