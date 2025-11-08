
import React, { useState } from 'react';
import type { SolutionExample, OmegaResult } from '../types';
import { GALLERY_SOLUTIONS } from '../constants';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const SolutionCard: React.FC<{ item: SolutionExample }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const solution = item.solution;

    return (
        <div className="bg-brand-navy border border-brand-light-navy/50 rounded-lg overflow-hidden transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 text-left flex justify-between items-center"
            >
                <h4 className="text-xl font-bold text-brand-lightest-slate">{item.problem}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-brand-cyan transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-6 border-t border-brand-light-navy/50">
                    <div className="space-y-6 text-brand-slate">
                        <div>
                            <h5 className="font-bold text-brand-cyan mb-2">Analysis</h5>
                            <p>{solution.analysis}</p>
                        </div>
                         <div className="bg-brand-deep-blue p-4 rounded-md space-y-4">
                            <h5 className="font-bold text-brand-cyan mb-2">Consensus Solution</h5>
                            <p><strong>Hypothesis:</strong> {solution.solution.hypothesis}</p>
                            <p><strong>Expected Impact:</strong> {solution.solution.expectedImpact}</p>
                            <p><strong>Confidence Score:</strong> <span className="font-bold text-brand-cyan text-lg">{solution.solution.confidenceScore}</span></p>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SolutionsGallery: React.FC = () => {
    return (
        <section className="py-24">
            <h2 className="text-3xl font-bold text-center mb-4 text-brand-lightest-slate">Solutions Gallery</h2>
            <p className="text-center max-w-2xl mx-auto mb-12 text-brand-slate">
                Explore a curated collection of challenges already solved by OMEGA, showcasing the depth and breadth of its problem-solving capabilities.
            </p>
            <div className="max-w-4xl mx-auto space-y-4">
                {GALLERY_SOLUTIONS.map((item, index) => (
                    <SolutionCard key={index} item={item} />
                ))}
            </div>
        </section>
    );
};

export default SolutionsGallery;
