import React from 'react';

const Refund = () => {
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">Refund Policy</h1>
                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                    <p>Last updated: February 25, 2026</p>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. General Policy</h2>
                        <p>Typically, tickets purchased for YOYO FUN 'N' FOODS are non-refundable and non-transferable. Please double-check your dates and selection before finalizing your purchase.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Exceptions</h2>
                        <p>Refunds may be considered in extraordinary circumstances, such as park closure due to extreme weather or technical issues. In such cases, please contact our support team at hello@yoyofun.com.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Process</h2>
                        <p>Approved refunds will be processed back to the original payment method (via Razorpay) within 7-10 business days.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Refund;
