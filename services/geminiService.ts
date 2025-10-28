
import { GoogleGenAI } from "@google/genai";
import { CategoryInfo } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateCardContent = async (category: CategoryInfo): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: category.prompt,
    });
    
    // Using .text for direct access to the generated string
    const text = response.text;
    if (!text) {
        throw new Error("No text content returned from API.");
    }

    // Clean the response to remove potential quotes and extra whitespace.
    return text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("No se pudo generar la pregunta. Inténtalo de nuevo.");
  }
};