import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithGeminiFallback } from "@/lib/geminiModel";
import Essentials from "@/app/models/Essentials.model";
import Feeding from "@/app/models/Feeding.model";
import Memory from "@/app/models/Memory.model";
import Sleep from "@/app/models/Sleep.model";
import Vaccine from "@/app/models/Vaccine.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";

const todayStart = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const parseAgentJson = (text) => {
  try {
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
};

const getGeminiErrorResponse = (error, signals) => {
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
          "Gemini quota is exhausted right now. CarePilot can run again after your Gemini quota resets or billing/quota is updated.",
        insight: `Retry after ${retryDelay}. This is a Gemini API quota limit, not a database or authentication bug.`,
        code: "GEMINI_QUOTA_EXCEEDED",
        retryAfter: retryDelay,
        signals,
      },
      { status: 429 }
    );
  }

  return null;
};

export async function GET(req) {
  try {
    await connectDB();

    const auth = await authenticateToken(req);
    const userId = auth?.user?.id;

    if (!userId) {
      return Response.json(
        { error: "Please login again to use the care agent" },
        { status: 401 }
      );
    }

    const start = todayStart();
    const now = new Date();
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "daily";

    const [feedings, sleepLogs, vaccines, essentials, memories] =
      await Promise.all([
        Feeding.find({ userId }).sort({ createdAt: -1 }).limit(30).lean(),
        Sleep.find({ userId }).sort({ createdAt: -1 }).limit(30).lean(),
        Vaccine.find({ userId }).sort({ scheduledDate: 1 }).limit(30).lean(),
        Essentials.find({ userId }).sort({ updatedAt: -1 }).limit(30).lean(),
        Memory.find({ user: userId }).sort({ createdAt: -1 }).limit(20).lean(),
      ]);

    const signals = {
      totalFeedings: feedings.length,
      todayFeedings: feedings.filter((item) => new Date(item.createdAt) >= start)
        .length,
      totalSleepLogs: sleepLogs.length,
      todaySleepLogs: sleepLogs.filter(
        (item) => new Date(item.createdAt || item.date) >= start
      ).length,
      completedVaccines: vaccines.filter(
        (item) => item.status === "completed"
      ).length,
      upcomingVaccines: vaccines.filter((item) => {
        const date = new Date(item.scheduledDate);
        return date >= now && date <= nextWeek && item.status !== "completed";
      }).length,
      lowEssentials: essentials.filter(
        (item) => Number(item.currentStock) <= Number(item.minThreshold)
      ).length,
      totalMemories: memories.length,
    };

    const apiKey = process.env.GEMINI_API?.trim();

    if (!apiKey) {
      return Response.json(
        {
          error: "GEMINI_API is missing. Add it in .env.local to run CarePilot.",
          signals,
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const prompt = `
You are ShishuGuard Daily Care Agent.
You observe baby-care app data, reason about gaps, and return next best actions.
Current CarePilot mode: ${mode}

Return ONLY valid JSON:
{
  "summary": "one short sentence",
  "insight": "one practical care insight",
  "actions": [
    {
      "title": "short action title",
      "reason": "why this matters",
      "href": "/Feeding or /Sleep or /Medical or /Essentials or /Memories or /Growth",
      "priority": "high | medium | low"
    }
  ]
}

Rules:
- Do not diagnose medical issues.
- Do not invent data.
- Use only these signals:
${JSON.stringify(signals)}
- If mode is feeding, prioritize feeding and routine actions.
- If mode is stock, prioritize low-stock essentials.
- If mode is medical, prioritize vaccine and medical-record actions.
- If mode is daily, balance all care signals.
- Prefer actions that map to missing logs, low stock, upcoming vaccines, or useful memories.
- Return 2 or 3 actions.
`;

    let result;
    try {
      const generated = await generateWithGeminiFallback(genAI, prompt);
      result = generated.result;
    } catch (error) {
      const quotaResponse = getGeminiErrorResponse(error, signals);
      if (quotaResponse) return quotaResponse;
      throw error;
    }
    const parsed = parseAgentJson(result.response.text());

    if (!parsed?.summary || !Array.isArray(parsed.actions)) {
      return Response.json(
        {
          error: "Gemini returned an invalid agent response",
          raw: result.response.text(),
          signals,
        },
        { status: 502 }
      );
    }

    return Response.json({
      mode: "gemini",
      careMode: mode,
      summary: parsed.summary,
      insight: parsed.insight || "",
      actions: parsed.actions.slice(0, 3),
      signals,
    });
  } catch (error) {
    console.error("Daily care agent failed:", error);

    return Response.json(
      {
        error: "Daily care agent failed. Please check Gemini API, auth token, and database connection.",
        details: error?.message || "",
      },
      { status: 500 }
    );
  }
}
