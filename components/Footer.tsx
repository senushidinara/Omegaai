
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 border-t border-brand-light-navy/30">
            <div className="container mx-auto px-6 text-center text-brand-slate">
                <p>&copy; {new Date().getFullYear()} OMEGA Project. An AI Experiment.</p>
                <p className="text-sm">Powered by Google Gemini & Deployed on Cloud Run.</p>
            </div>
        </footer>
    );
};

export default Footer;
