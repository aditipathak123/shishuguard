import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithGeminiFallback } from "@/lib/geminiModel";

const roleInstructions = {
  pediatrician:
    "Answer like a careful pediatric care assistant. Give practical, safe guidance. Do not diagnose. Recommend urgent medical care for red flags.",
  baby:
    "Answer in a warm, simple baby-perspective style, but still keep guidance safe and practical for parents.",
  mother:
    "Answer like a supportive parenting companion focused on the mother's routine, recovery, stress, and baby care.",
};

const getGeminiErrorResponse = (error) => {
  const message = error?.message || "";
  const retryMatch = message.match(/retry in\s+([\d.]+s)/i);
  const retryDelay = retryMatch?.[1] || "a short while";

  if (
    message.includes("[429 Too Many Requests]") ||
    message.toLowerCase().includes("quota exceeded")
  ) {
    return Response.json(
      {
        error:
          "Gemini quota is exhausted right now. Please retry after the quota resets or update Gemini billing/quota.",
        code: "GEMINI_QUOTA_EXCEEDED",
        retryAfter: retryDelay,
      },
      { status: 429 }
    );
  }

  return null;
};

export async function POST(req) {
  try {
    const { messages = [], role = "pediatrician", babyData = null } =
      await req.json();

    const lastMessage = messages[messages.length - 1]?.content || "";

    const apiKey = process.env.GEMINI_API?.trim();

    if (!apiKey) {
      return Response.json(
        {
          error: "GEMINI_API is missing. Add it in .env.local to use ShishuGuard AI.",
        },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const historyText = messages
      .slice(-8)
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n");

    const babyContext = babyData
      ? `Baby/profile context: ${JSON.stringify(babyData).slice(0, 1200)}`
      : "No baby profile context was provided.";

    const prompt = `
You are ShishuGuard AI, a baby-care assistant inside a parenting app.
${roleInstructions[role] || roleInstructions.pediatrician}

Rules:
- Keep answers concise and parent-friendly.
- Use the app context when useful: feeding, sleep, growth, vaccines, essentials, memories.
- Do not claim certainty for medical issues.
- Mention seeing a pediatrician or emergency care for danger signs.
- Do not invent saved user data.

${babyContext}

Recent conversation:
${historyText}

Parent's latest question:
${lastMessage}
`;

    let result;
    try {
      const generated = await generateWithGeminiFallback(genAI, prompt);
      result = generated.result;
    } catch (error) {
      const quotaResponse = getGeminiErrorResponse(error);
      if (quotaResponse) return quotaResponse;
      throw error;
    }
    const content = result.response.text();

    if (!content) {
      return Response.json(
        {
          error: "Gemini returned an empty response. Please try again.",
        },
        { status: 502 }
      );
    }

    return Response.json({
      content,
      source: "gemini",
    });
  } catch (err) {
    console.error("AI failed:", err);

    return Response.json(
      {
        error: "ShishuGuard AI failed. Please check Gemini API configuration and try again.",
        details: err?.message || "",
      },
      { status: 500 }
    );
  }
}
