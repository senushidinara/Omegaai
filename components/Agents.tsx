
import React from 'react';
import type { Agent } from '../types';
import { ScientistIcon, EngineerIcon, AnalystIcon, SimulationIcon } from './icons/AgentIcons';

const AGENTS_DATA: Agent[] = [
    {
        id: 'elara',
        name: 'Dr. Elara',
        title: 'The Scientist',
        icon: ScientistIcon,
        description: 'Focuses on scientific validity, chemical principles, and peer-reviewed research to ensure solutions are grounded in reality.',
        emoji: '🧪'
    },
    {
        id: 'kairo',
        name: 'Engineer Kairo',
        title: 'The Engineer',
        icon: EngineerIcon,
        description: 'Analyzes manufacturing scalability, material costs, and energy requirements to guarantee practical, buildable outcomes.',
        emoji: '⚙️'
    },
    {
        id: 'riva',
        name: 'Analyst Riva',
        title: 'The Impact Analyst',
        icon: AnalystIcon,
        description: 'Quantifies CO2 reduction, cost-benefits, and social impact to ensure solutions create meaningful, positive change.',
        emoji: '📈'
    },
    {
        id: 'orion',
        name: 'Dr. Orion',
        title: 'The Simulator',
        icon: SimulationIcon,
        description: 'Provides validation through predictive modeling and data analysis, offering confidence scores and refining success probability.',
        emoji: '💻'
    }
];

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => (
    <div className="bg-brand-navy p-6 rounded-lg border border-brand-light-navy/50 hover:border-brand-cyan/50 transition-all transform hover:-translate-y-2">
        <div className="flex items-center mb-4">
            <agent.icon className="w-10 h-10 text-brand-cyan mr-4" />
            <div>
                <h3 className="text-xl font-bold text-brand-lightest-slate">{agent.name}</h3>
                <p className="text-brand-cyan">{agent.title}</p>
            </div>
        </div>
        <p className="text-brand-slate">{agent.description}</p>
    </div>
);

const Agents: React.FC = () => {
    return (
        <section className="py-24">
            <h2 className="text-3xl font-bold text-center mb-4 text-brand-lightest-slate">Meet the OMEGA Agents</h2>
            <p className="text-center max-w-2xl mx-auto mb-12 text-brand-slate">
                Four distinct AI personas collaborate in a structured debate, each bringing a unique perspective to forge comprehensive and robust solutions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {AGENTS_DATA.map(agent => <AgentCard key={agent.id} agent={agent} />)}
            </div>
        </section>
    );
};

export default Agents;

