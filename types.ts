
export interface Agent {
    id: 'elara' | 'kairo' | 'riva' | 'orion';
    name: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    emoji: string;
}

export interface AgentMessage {
    agentId: Agent['id'];
    message: string;
}

export interface ConsensusSolution {
    hypothesis: string;
    implementation: string;
    expectedImpact: string;
    confidenceScore: string;
    risks: string;
    nextExperiments: string;
}

export interface OmegaResult {
    problem: string;
    analysis: string;
    debate: AgentMessage[];
    solution: ConsensusSolution;
}

export interface SolutionExample {
    problem: string;
    solution: OmegaResult;
}
