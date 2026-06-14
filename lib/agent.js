import { GoogleGenerativeAI } from "@google/generative-ai";

class Agent {
  constructor({
    prompt = "You are a helpful AI assistant",
    model = new GoogleGenerativeAI(process.env.GEMINI_API),
    examples = [],
  }) {
    this.prompt = prompt;
    this.model = model.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    });
    this.examples = examples;
  }

  async generate(text) {
    try {
      const result = await this.model.generateContent({
        contents: [
          ...this.examples,
          {
            role: "user",
            parts: [{ text }],
          },
        ],
        systemInstruction: {
          parts: [{ text: this.prompt }],
        },
      });

      return await result.response.text();
    } catch (err) {
      console.log("Agent Error:", err);
      return null;
    }
  }
}

class JSONAgent extends Agent {
  constructor({ prompt, model, examples }) {
    super({ prompt, model, examples });
  }

  extractJSON(rawText) {
    try {
      if (!rawText) return null;

      const cleaned = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);
    } catch (err) {
      console.log("JSON Parse Error:", err);
      return null;
    }
  }

  async getResponse(text) {
    try {
      const raw = await this.generate(text);
      const parsed = this.extractJSON(raw);

      if (!parsed) {
        return {
          isAction: false,
          actionName: "Invalid JSON",
          request: "failed",
        };
      }

      return parsed;
    } catch (err) {
      console.log("JSONAgent Error:", err);
      return {
        isAction: false,
        actionName: "Agent Error",
        request: "failed",
      };
    }
  }
}

export default JSONAgent;
