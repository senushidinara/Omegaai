
import { GoogleGenAI } from "@google/genai";
import { OMEGA_SYSTEM_PROMPT } from '../constants';

// Assume process.env.API_KEY is available in the environment
const getGenAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const solveProblem = async (problem: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = getGenAI();
    
    const fullPrompt = `${OMEGA_SYSTEM_PROMPT}\n\n${problem}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a response from the AI. Please check your API key and network connection.");
    }
};
