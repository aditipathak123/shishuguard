const DEFAULT_GEMINI_MODELS = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
];

export const getGeminiModelNames = () => {
  const configured = process.env.GEMINI_MODEL?.trim();
  const extra = process.env.GEMINI_MODEL_FALLBACKS?.split(",")
    .map((model) => model.trim())
    .filter(Boolean);

  return [...new Set([configured, ...(extra || []), ...DEFAULT_GEMINI_MODELS].filter(Boolean))];
};

export const isGeminiModelNotFoundError = (error) => {
  const message = error?.message || "";
  return (
    message.includes("[404 Not Found]") ||
    message.toLowerCase().includes("is not found") ||
    message.toLowerCase().includes("not supported for generatecontent")
  );
};

export const generateWithGeminiFallback = async (genAI, prompt) => {
  const modelNames = getGeminiModelNames();
  let lastError = null;

  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return { result, modelName };
    } catch (error) {
      lastError = error;

      if (!isGeminiModelNotFoundError(error)) {
        throw error;
      }
    }
  }

  throw lastError || new Error("No Gemini model could generate a response");
};
