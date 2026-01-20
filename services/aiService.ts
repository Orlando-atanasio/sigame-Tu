
import { GoogleGenAI, Type } from "@google/genai";

export const getGeminiAnalysis = async (userAssets: any[], userProfile: string) => {
  const ai = new GoogleGenAI((import.meta as any).env.VITE_GEMINI_API_KEY || '');

  const prompt = `Analise esta carteira de investimentos (perfil ${userProfile}): ${JSON.stringify(userAssets)}.
  A carteira padrão base para comparação tem rendimento de 0.98% am.
  Retorne um JSON estritamente com:
  {
    "opportunityCost": number, // custo anual em reais
    "currentReturn": number, // yield mensal atual em %
    "potentialReturn": number, // meta de yield em %
    "delta": number, // diferença entre atual e meta
    "swaps": [
      { "from": string, "fromVal": string, "to": string, "toVal": string, "spread": string }
    ],
    "insight": string // resumo da tese
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            opportunityCost: { type: Type.NUMBER },
            currentReturn: { type: Type.NUMBER },
            potentialReturn: { type: Type.NUMBER },
            delta: { type: Type.NUMBER },
            swaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  from: { type: Type.STRING },
                  fromVal: { type: Type.STRING },
                  to: { type: Type.STRING },
                  toVal: { type: Type.STRING },
                  spread: { type: Type.STRING }
                }
              }
            },
            insight: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Erro na análise IA:", error);
    throw error;
  }
};
