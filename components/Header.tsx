
import React from 'react';

interface HeaderProps {
    onDemoClick: () => void;
    onSolutionsClick: () => void;
    onFeaturesClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDemoClick, onSolutionsClick, onFeaturesClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-deep-blue/80 backdrop-blur-sm shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-brand-cyan">
                    OMEGA
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <button onClick={onFeaturesClick} className="text-brand-lightest-slate hover:text-brand-cyan transition-colors">Features</button>
                    <button onClick={onDemoClick} className="text-brand-lightest-slate hover:text-brand-cyan transition-colors">Demo</button>
                    <button onClick={onSolutionsClick} className="text-brand-lightest-slate hover:text-brand-cyan transition-colors">Solutions</button>
                    <button onClick={onDemoClick} className="px-4 py-2 border border-brand-cyan text-brand-cyan rounded hover:bg-brand-cyan/10 transition-colors">
                        Try OMEGA
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
