
import React from 'react';

const features = [
    { title: "Multi-Agent Synergy", description: "Combines diverse AI perspectives for holistic and robust problem-solving." },
    { title: "Scientific Rigor", description: "Grounds all solutions in established scientific principles and data." },
    { title: "Scalable Engineering", description: "Ensures proposed solutions are practical, scalable, and cost-effective." },
    { title: "Quantifiable Impact", description: "Focuses on measurable outcomes like CO2 reduction and economic viability." },
    { title: "Computational Validation", description: "Uses simulations to predict outcomes and provide data-backed confidence scores." },
    { title: "Novel Innovation", description: "Specializes in combining existing technologies in innovative ways to create breakthrough solutions." },
];

const Features: React.FC = () => {
    return (
        <section className="py-24">
            <h2 className="text-3xl font-bold text-center mb-4 text-brand-lightest-slate">Why OMEGA Works</h2>
            <p className="text-center max-w-2xl mx-auto mb-12 text-brand-slate">
                Our unique approach ensures that every solution is not just a good idea, but a viable, impactful, and scientifically sound plan for the future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-brand-navy p-6 rounded-lg border border-transparent hover:border-brand-cyan/30 transition-colors">
                        <h3 className="text-xl font-bold text-brand-cyan mb-2">{feature.title}</h3>
                        <p className="text-brand-slate">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
