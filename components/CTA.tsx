
import React from 'react';

interface CTAProps {
    onCtaClick: () => void;
}

const CTA: React.FC<CTAProps> = ({ onCtaClick }) => {
    return (
        <section className="py-24 text-center">
            <h2 className="text-3xl font-bold text-brand-lightest-slate mb-4">Ready to Solve the Unsolvable?</h2>
            <p className="max-w-2xl mx-auto text-brand-slate mb-8">
                Bring your most complex challenges to OMEGA and unlock the future of innovation. The next breakthrough is just a debate away.
            </p>
            <button
                onClick={onCtaClick}
                className="px-10 py-4 bg-brand-cyan text-brand-deep-blue font-bold rounded hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
                Start Your First Simulation
            </button>
        </section>
    );
};

export default CTA;
