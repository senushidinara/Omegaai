import React, { useState, useEffect, useRef } from 'react';
import { solveProblem } from '../services/geminiService';
import type { OmegaResult, AgentMessage } from '../types';
import { EXAMPLE_PROBLEMS } from '../constants';
import { ScientistIcon, EngineerIcon, AnalystIcon, SimulationIcon } from './icons/AgentIcons';

const AGENT_MAP = {
    elara: { name: 'Dr. Elara', icon: ScientistIcon, color: 'text-green-400', emoji: '🧪' },
    kairo: { name: 'Engineer Kairo', icon: EngineerIcon, color: 'text-blue-400', emoji: '⚙️' },
    riva: { name: 'Analyst Riva', icon: AnalystIcon, color: 'text-yellow-400', emoji: '📈' },
    orion: { name: 'Dr. Orion', icon: SimulationIcon, color: 'text-purple-400', emoji: '💻' },
};

const parseOmegaResponse = (markdown: string): OmegaResult | null => {
    try {
        const problemMatch = markdown.match(/🌍 PROBLEM: (.*)/);
        const analysisMatch = markdown.match(/🔍 ANALYSIS PHASE\n([\s\S]*?)\n\n🎭 MULTI-AGENT DEBATE/);
        const debateMatch = markdown.match(/🎭 MULTI-AGENT DEBATE - LIVE SESSION\n([\s\S]*?)\n\n🏆 CONSENSUS SOLUTION/);
        const solutionMatch = markdown.match(/🏆 CONSENSUS SOLUTION\n([\s\S]*)/);

        if (!problemMatch || !analysisMatch || !debateMatch || !solutionMatch) {
            console.error("Parsing Error: Could not find all required sections in the AI response.");
            return null;
        }

        const debateMessages: AgentMessage[] = debateMatch[1]
            .trim()
            .split('\n')
            .map(line => {
                const trimmedLine = line.trim();
                // Skip empty lines or lines that don't look like agent messages
                if (!trimmedLine || !trimmedLine.includes(':')) return null;

                const agentEmojiMatch = trimmedLine.match(/^(🧪|⚙️|📈|💻)/);
                if (!agentEmojiMatch) return null;

                const message = trimmedLine.substring(trimmedLine.indexOf(':') + 1).trim().replace(/"/g, '');
                
                let agentId: 'elara' | 'kairo' | 'riva' | 'orion' | null = null;
                const emoji = agentEmojiMatch[0];
                if (emoji.includes('🧪')) agentId = 'elara';
                else if (emoji.includes('⚙️')) agentId = 'kairo';
                else if (emoji.includes('📈')) agentId = 'riva';
                else if (emoji.includes('💻')) agentId = 'orion';

                // Ensure both agentId and a non-empty message exist
                if (!agentId || !message) return null;

                return { agentId, message };
            })
            .filter((msg): msg is AgentMessage => msg !== null);


        const solutionText = solutionMatch[1].trim();
        const nextMarkerPattern = '(?=\\n\\s*(?:✅|🛠️|📊|🎯|⚠️|🔬)|$)';

        const hypothesis = (solutionText.match(new RegExp(`✅ HYPOTHESIS:\\s*([\\s\\S]*?)${nextMarkerPattern}`))?.[1] || '').trim();
        const implementation = (solutionText.match(new RegExp(`🛠️ IMPLEMENTATION:\\s*([\\s\\S]*?)${nextMarkerPattern}`))?.[1] || '').trim();
        const expectedImpact = (solutionText.match(new RegExp(`📊 EXPECTED IMPACT:\\s*([\\s\\S]*?)${nextMarkerPattern}`))?.[1] || '').trim();
        const confidenceScore = (solutionText.match(new RegExp(`🎯 CONFIDENCE SCORE:\\s*([\\s\\S]*?)${nextMarkerPattern}`))?.[1] || '').trim();
        const risks = (solutionText.match(new RegExp(`⚠️ RISKS & MITIGATIONS:\\s*([\\s\\S]*?)${nextMarkerPattern}`))?.[1] || '').trim();
        const nextExperiments = (solutionText.match(new RegExp(`🔬 NEXT EXPERIMENTS:\\s*([\\s\\S]*?)${nextMarkerPattern}`))?.[1] || '').trim();
        
        // Final check to make sure core components were parsed
        if (!hypothesis || !implementation) {
            console.error("Parsing Error: Could not parse core solution fields.");
            return null;
        }

        return {
            problem: problemMatch[1].trim(),
            analysis: analysisMatch[1].trim(),
            debate: debateMessages,
            solution: { hypothesis, implementation, expectedImpact, confidenceScore, risks, nextExperiments },
        };
    } catch (e) {
        console.error("Failed to parse AI response:", e);
        return null;
    }
};

const Demo: React.FC = () => {
    const [problem, setProblem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<OmegaResult | null>(null);
    const [displayedDebate, setDisplayedDebate] = useState<AgentMessage[]>([]);
    const [showSolution, setShowSolution] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!result) return;

        setDisplayedDebate([]);
        setShowSolution(false);

        let intervalId: number | undefined;

        const timeoutId = setTimeout(() => {
            let i = 0;
            intervalId = window.setInterval(() => {
                if (i < result.debate.length) {
                    setDisplayedDebate(prev => [...prev, result.debate[i]]);
                    i++;
                } else {
                    if (intervalId) clearInterval(intervalId);
                    setShowSolution(true);
                }
            }, 1500);
        }, 500);

        // This robust cleanup function is crucial.
        // It runs when the component unmounts or when `result` changes.
        // It ensures that any pending timeouts or intervals are cleared,
        // preventing race conditions and memory leaks.
        return () => {
            clearTimeout(timeoutId);
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [result]);

     useEffect(() => {
        if (displayedDebate.length > 0 || showSolution) {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [displayedDebate, showSolution]);


    const handleSubmit = async (currentProblem: string) => {
        if (!currentProblem.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResult(null);
        setDisplayedDebate([]);
        setShowSolution(false);

        try {
            const responseText = await solveProblem(currentProblem);
            const parsedResult = parseOmegaResponse(responseText);
            if (parsedResult) {
                setResult(parsedResult);
            } else {
                setError("The AI response was not in the expected format. Please try again.");
            }
        } catch (e: any) {
            setError(e.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExampleClick = (example: string) => {
        setProblem(example);
        handleSubmit(example);
    }
    
    return (
        <section className="py-24">
            <h2 className="text-3xl font-bold text-center mb-4 text-brand-lightest-slate">OMEGA Live Demo</h2>
            <p className="text-center max-w-2xl mx-auto mb-12 text-brand-slate">
                Pose a complex challenge and witness the multi-agent debate unfold in real-time.
            </p>

            <div className="max-w-4xl mx-auto bg-brand-navy p-8 rounded-lg border border-brand-light-navy/50">
                <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Enter a complex problem here, e.g., 'Design a sustainable method for atmospheric water generation in arid climates.'"
                    className="w-full h-32 p-4 bg-brand-deep-blue text-brand-lightest-slate rounded-md focus:ring-2 focus:ring-brand-cyan focus:outline-none resize-none"
                    disabled={isLoading}
                />
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0">
                        <span className="text-sm text-brand-slate mr-2">Or try an example:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                        {EXAMPLE_PROBLEMS.slice(0, 2).map((ex) => (
                             <button key={ex} onClick={() => handleExampleClick(ex)} disabled={isLoading} className="text-xs bg-brand-light-navy px-3 py-1 rounded-full hover:bg-brand-cyan hover:text-brand-deep-blue transition-colors">{ex.slice(0, 35)}...</button>
                        ))}
                        </div>
                    </div>
                    <button
                        onClick={() => handleSubmit(problem)}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-8 py-3 bg-brand-cyan text-brand-deep-blue font-bold rounded hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100"
                    >
                        {isLoading ? 'OMEGA is Thinking...' : 'Initiate Debate'}
                    </button>
                </div>
            </div>
            
            <div ref={resultsRef} className="mt-12 max-w-4xl mx-auto">
                {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
                
                {result && !error && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-brand-cyan mb-2">🔍 Analysis Phase</h3>
                            <p className="bg-brand-navy p-4 rounded-md border border-brand-light-navy/30">{result.analysis}</p>
                        </div>

                        <div>
                             <h3 className="text-2xl font-bold text-brand-cyan mb-4">🎭 Multi-Agent Debate</h3>
                             <div className="space-y-4">
                                {displayedDebate.map((msg, index) => {
                                    const agentInfo = AGENT_MAP[msg.agentId];
                                    const AgentIcon = agentInfo.icon;
                                    return (
                                        <div key={index} className="flex items-start space-x-4 p-4 bg-brand-navy rounded-md border border-brand-light-navy/30 animate-fade-in-up">
                                            <AgentIcon className={`w-8 h-8 ${agentInfo.color} flex-shrink-0 mt-1`} />
                                            <div>
                                                <p className={`font-bold ${agentInfo.color}`}>{agentInfo.name}</p>
                                                <p className="text-brand-light-slate">{msg.message}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                             </div>
                        </div>

                        {showSolution && (
                             <div className="animate-fade-in-up">
                                 <h3 className="text-2xl font-bold text-brand-cyan mb-4">🏆 Consensus Solution</h3>
                                 <div className="bg-brand-navy p-6 rounded-md border border-brand-cyan/50 space-y-4">
                                    <p><strong>✅ Hypothesis:</strong> {result.solution.hypothesis}</p>
                                    <p><strong>🛠️ Implementation:</strong> {result.solution.implementation}</p>
                                    <p><strong>📊 Expected Impact:</strong> {result.solution.expectedImpact}</p>
                                    <p><strong>🎯 Confidence Score:</strong> <span className="font-bold text-brand-cyan text-lg">{result.solution.confidenceScore}</span></p>
                                    <div>
                                      <strong>⚠️ Risks & Mitigations:</strong>
                                      <ul className="list-disc list-inside pl-4">
                                        {result.solution.risks.split('\n').map((risk, i) => risk.trim() && <li key={i}>{risk.replace(/^- /, '')}</li>)}
                                      </ul>
                                    </div>
                                    <p><strong>🔬 Next Experiments:</strong> {result.solution.nextExperiments}</p>
                                 </div>
                             </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Demo;