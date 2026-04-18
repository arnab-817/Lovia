import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Rewrites a message using AI to match a specific romantic mood.
 */
export const getAIPolish = async (text: string, mood: string = 'romantic') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an emotional ghostwriter for Lovia, a Valentine's app. 
      Rewrite this message to be more ${mood}, poetic, and heartwarming. 
      Keep it personal and concise. 
      Message: "${text}"`,
    });
    return response.text || text;
  } catch (error) {
    console.error("AI polishing failed", error);
    return text;
  }
};

/**
 * Generates message suggestions based on mood and user status.
 */
export const getMessageSuggestions = async (mood: string, isPro: boolean) => {
  try {
    const proInstruction = isPro 
      ? "Use sophisticated, deeply moving, and highly poetic language. Create masterpieces of expression." 
      : "Use sweet, friendly, and relatable language.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert romantic writer for Lovia. 
      Generate 3 unique message starters for a Valentine's page.
      Mood: ${mood}.
      Target Audience: Young lovers (13-25).
      Instruction: ${proInstruction}
      Keep each suggestion under 60 words.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 3 string suggestions."
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI suggestions failed", error);
    return [];
  }
};

/**
 * Generates creative and sweet titles for the Valentine page.
 */
export const getTitleSuggestions = async (day: string, message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a creative copywriter for Lovia. 
      Generate 4 short, sweet, and catchy titles for a ${day} page.
      Context: ${message || 'A romantic surprise'}.
      Instruction: Titles should be max 5 words.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 4 title strings."
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI title suggestions failed", error);
    return [];
  }
};

/**
 * Generates a cinematic image for a romantic milestone.
 */
export const generateMilestoneImage = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-end, cinematic, romantic photography style: ${prompt}. Soft lighting, 8k resolution, dreamy bokeh.` }],
      },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed", error);
    return null;
  }
};
