
import React from 'react';

interface HeroProps {
    onPrimaryClick: () => void;
    onSecondaryClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onPrimaryClick, onSecondaryClick }) => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center -mx-6 sm:-mx-12 md:-mx-24 lg:-mx-32 xl:-mx-48 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-deep-blue to-brand-light-navy bg-[length:200%_200%] animate-gradient-bg z-0"></div>
            <div className="relative z-10 p-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-lightest-slate mb-4">
                    OMEGA
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-brand-cyan mb-8">
                    Your AI-Powered Universal Problem-Solving Engine
                </p>
                <p className="max-w-3xl mx-auto text-brand-slate mb-12">
                    Leveraging multi-agent debate, OMEGA tackles humanity's greatest challenges by synthesizing novel solutions from scientific, engineering, and impact-driven perspectives.
                </p>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={onPrimaryClick}
                        className="px-8 py-3 bg-brand-cyan text-brand-deep-blue font-bold rounded hover:bg-opacity-90 transition-all transform hover:scale-105"
                    >
                        Solve a Problem
                    </button>
                    <button
                        onClick={onSecondaryClick}
                        className="px-8 py-3 border border-brand-cyan text-brand-cyan font-bold rounded hover:bg-brand-cyan/10 transition-all transform hover:scale-105"
                    >
                        See Solutions
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
