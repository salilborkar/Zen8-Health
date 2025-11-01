
import { GoogleGenAI } from "@google/genai";
import type { HealthLog, FoodLog, WorkoutLog, MentalLog } from '../types';

export async function getHealthAdvice(logs: HealthLog[]): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const summary = logs.reduce((acc, log) => {
      switch (log.data.type) {
        case 'FOOD':
          acc.food.push(`${(log.data as FoodLog).name} (${(log.data as FoodLog).calories * (log.data as FoodLog).quantity} kcal)`);
          break;
        case 'WORKOUT':
          acc.workouts.push(`${(log.data as WorkoutLog).name} for ${(log.data as WorkoutLog).duration} mins`);
          break;
        case 'MENTAL':
          acc.mental.push(`${(log.data as MentalLog).activity} for ${(log.data as MentalLog).duration} mins`);
          break;
      }
      return acc;
  }, { food: [] as string[], workouts: [] as string[], mental: [] as string[] });

  const prompt = `
    You are a friendly and encouraging AI health coach named Zenith.
    Based on the following health data, provide actionable, concise, and positive recommendations.
    Organize your response in markdown format with clear headings for Nutrition, Fitness, and Mental Wellness.
    Keep each section to 2-3 bullet points.

    Here is the user's recent activity:
    - Food Eaten: ${summary.food.join(', ') || 'None logged.'}
    - Workouts Completed: ${summary.workouts.join(', ') || 'None logged.'}
    - Mental Wellness Activities: ${summary.mental.join(', ') || 'None logged.'}

    Provide personalized advice based on this data.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I'm having trouble providing advice right now. Please check your connection or API key and try again later.";
  }
}
