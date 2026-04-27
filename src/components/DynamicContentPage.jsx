import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const DynamicContentPage = ({ slug, fallbackTitle }) => {
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const data = await contentService.getBySlug(slug);
                setPage(data);
            } catch (err) {
                console.error(`Failed to load ${slug}:`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Loading content...</p>
                </div>
            </div>
        );
    }

    const title = page?.title || fallbackTitle;
    const content = page?.content || "Content coming soon...";
    const htmlContent = DOMPurify.sanitize(marked.parse(content));

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        {title}
                    </h1>
                    {page?.updated_at && (
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                            Last Updated: {new Date(page.updated_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    )}
                </div>
                
                <div 
                    className="prose prose-lg prose-slate max-w-none 
                               prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                               prose-p:text-gray-600 prose-p:leading-relaxed
                               prose-li:text-gray-600 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: htmlContent }} 
                />
            </div>
        </div>
    );
};

export default DynamicContentPage;
