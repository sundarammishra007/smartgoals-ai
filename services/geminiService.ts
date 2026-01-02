import { GoogleGenAI, Type } from "@google/genai";
import { SmartGoalBreakdown } from "../types";

// NOTE: This assumes process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartGoal = async (
  rawGoal: string
): Promise<SmartGoalBreakdown | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform the following vague goal into a structured SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound). 
      
      User Goal: "${rawGoal}"
      
      Ensure the output is concise but inspiring.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specific: { type: Type.STRING, description: "The Specific aspect of the goal" },
            measurable: { type: Type.STRING, description: "The Measurable aspect of the goal" },
            achievable: { type: Type.STRING, description: "The Achievable aspect of the goal" },
            relevant: { type: Type.STRING, description: "The Relevant aspect of the goal" },
            timeBound: { type: Type.STRING, description: "The Time-bound aspect of the goal" },
          },
          required: ["specific", "measurable", "achievable", "relevant", "timeBound"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as SmartGoalBreakdown;
  } catch (error) {
    console.error("Error generating SMART goal:", error);
    return null;
  }
};
