
import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const liveInstructions = `
You are the Creative Director for Lovia, a high-end boutique Valentine's expresser.
Your goal is to help the user build a legendary, cinematic Valentine's page via conversation.
1. Greet the user with a warm, sophisticated, human-like voice.
2. Guide them through: choosing a Day, writing a Letter, adding Milestones (Timeline), and selecting a Theme.
3. As they speak, use tools to update the draft in real-time.
4. If they describe a memory, use 'generateImage' to create a high-end visual for that milestone.
5. Be encouraging, poetic, and world-class in your suggestions.
`;

export const builderTools: FunctionDeclaration[] = [
  {
    name: "updateBasicInfo",
    description: "Update the title or message of the Valentine page.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        message: { type: Type.STRING },
        day: { type: Type.STRING }
      }
    }
  },
  {
    name: "addTimelineMilestone",
    description: "Add a milestone to the romantic timeline.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        date: { type: Type.STRING }
      },
      required: ["title", "description"]
    }
  },
  {
    name: "generateMilestoneImage",
    description: "Generate a high-end cinematic image for a specific milestone description.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        milestoneId: { type: Type.STRING },
        prompt: { type: Type.STRING, description: "Detailed poetic prompt for image generation." }
      },
      required: ["milestoneId", "prompt"]
    }
  }
];

export const setupLiveSession = (callbacks: any) => {
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
      systemInstruction: liveInstructions,
      tools: [{ functionDeclarations: builderTools }]
    }
  });
};

export function decodeAudio(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function encodeAudio(data: Float32Array): string {
  const int16 = new Int16Array(data.length);
  for (let i = 0; i < data.length; i++) {
    int16[i] = data[i] * 32768;
  }
  const bytes = new Uint8Array(int16.buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
