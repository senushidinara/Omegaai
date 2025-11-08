
import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Agents from './components/Agents';
import Features from './components/Features';
import Demo from './components/Demo';
import SolutionsGallery from './components/SolutionsGallery';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
    const demoRef = useRef<HTMLDivElement>(null);
    const solutionsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-brand-deep-blue min-h-screen font-sans">
            <Header
                onDemoClick={() => scrollTo(demoRef)}
                onSolutionsClick={() => scrollTo(solutionsRef)}
                onFeaturesClick={() => scrollTo(featuresRef)}
            />
            <main className="px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48">
                <Hero onPrimaryClick={() => scrollTo(demoRef)} onSecondaryClick={() => scrollTo(solutionsRef)} />
                <Agents />
                <div ref={featuresRef}>
                  <Features />
                </div>
                <div ref={demoRef}>
                    <Demo />
                </div>
                <div ref={solutionsRef}>
                    <SolutionsGallery />
                </div>
                <CTA onCtaClick={() => scrollTo(demoRef)} />
            </main>
            <Footer />
        </div>
    );
};

export default App;
