import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">Terms and Conditions</h1>
                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                    <p>Last updated: February 25, 2026</p>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Agreement to Terms</h2>
                        <p>By accessing or using YOYO FUN 'N' FOODS website or services, you agree to be bound by these Terms and Conditions.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Ticket Purchases</h2>
                        <p>All ticket sales are final. Tickets are valid only for the date and time specified. We reserve the right to refuse entry or remove persons from the park if these terms are violated.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Use of the Site</h2>
                        <p>You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Limitation of Liability</h2>
                        <p>YOYO FUN 'N' FOODS shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
