"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";

// icons
import {
  Bot,
  Send,
  Loader2,
  Mic,
} from "lucide-react";

// UI
// TEMP SAFE FIX
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={className}>{children}</h2>
);
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

// extra
import ReactMarkdown from "react-markdown";
import SpeechRecognition from "../components/SpeechRecognition";
import TextToSpeech from "../components/TextToSpeech";

// services
import { fetchChatHistory } from "@/lib/chatService";

// auth + store
import { useAuth } from "../context/AuthContext";
import { useChatStore } from "@/lib/store/chatStore";

// ------------------------------

export default function ShishuGuardAi() {
  const { token } = useAuth();

  const [role, setRole] = useState("pediatrician");

  const {
    chatHistory = {},
    setChatHistory = () => {},
    historyLoaded = {},
    resetChatHistoryForRole = () => {},
  } = useChatStore((state) => state || {});

  const messages = useMemo(() => chatHistory[role] || [], [chatHistory, role]);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [babyData, setBabyData] = useState(null);

  const chatContainerRef = useRef(null);

  // 🔥 Fetch baby data
  useEffect(() => {
    const fetchBaby = async () => {
      try {
        const res = await axios.get("/api/baby");
        setBabyData(res.data);
      } catch (err) {
        console.log("Baby fetch error");
      }
    };

    fetchBaby();
  }, []);
  // 🔥 SCROLL FUNCTION
const scrollToBottom = () => {
  const el = chatContainerRef.current;
  if (el) {
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }
};

// 🔥 USER NEAR BOTTOM CHECK
const isUserNearBottom = () => {
  const el = chatContainerRef.current;
  if (!el) return true;

  const threshold = 100;
  return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
};

// 🔥 LOAD CHAT HISTORY
useEffect(() => {
  if (!token || historyLoaded[role]) return;

  const loadHistory = async () => {
    setIsHistoryLoading(true);

    try {
      const data = await fetchChatHistory(role, token);
      setChatHistory(role, data || []);
    } catch (err) {
      console.log("History error:", err);
      setChatHistory(role, []);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  loadHistory();
}, [role, token, historyLoaded, setChatHistory]);

// 🔥 AUTO SCROLL WHEN NEW MESSAGE
useEffect(() => {
  if (messages.length === 0 || isUserNearBottom()) {
    scrollToBottom();
  }
}, [messages]);

// 🔥 ROLE CHANGE (RESET CHAT)
const handleRoleChange = (newRole) => {
  resetChatHistoryForRole(newRole);

  setRole(newRole);
  setInput("");
  setIsSending(false);

  scrollToBottom();
};
// 🔥 VOICE AUTO SEND
const handleSpeechTranscript = (transcript) => {
  setInput(transcript);

  setTimeout(() => {
    handleSubmit(null, transcript);
  }, 500);
};

// 🔥 MAIN SUBMIT FUNCTION
const handleSubmit = async (e = null, customInput = null) => {
  if (e) e.preventDefault();

  // ❗ double click protection
  if (isSending) return;

  const finalInput = customInput ?? input;

  if (!finalInput.trim()) return;

  setIsListening(false);

  const userMessage = {
    id: Date.now(),
    role: "user",
    content: finalInput,
    createdAt: new Date().toISOString(),
  };

  const updatedMessages = [...messages, userMessage];

  setChatHistory(role, updatedMessages);
  setInput("");
  setIsSending(true);

  try {
    // 🟢 AI CALL
    const aiRes = await axios.post("/api/chat/ai", {
      messages: updatedMessages,
      role,
      babyData,
    });

    if (!aiRes?.data?.content) {
      throw new Error("Invalid AI response");
    }

    const aiText = aiRes.data.content;

    // 🟢 typing animation
    let tempMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
    };

    setChatHistory(role, [...updatedMessages, tempMessage]);

    let i = 0;

    const interval = setInterval(() => {
      tempMessage.content += aiText[i];

      setChatHistory(role, [
        ...updatedMessages,
        { ...tempMessage },
      ]);

      i++;

      if (i >= aiText.length) {
        clearInterval(interval);
      }
    }, 15);

    // 🟢 final message
    const finalMessages = [
      ...updatedMessages,
      {
        ...tempMessage,
        content: aiText,
      },
    ];

    // ensure full message set
    setTimeout(() => {
      setChatHistory(role, finalMessages);
    }, aiText.length * 15 + 100);

    // 🟢 SAVE TO DB
    if (token) {
      setTimeout(async () => {
        await axios.post(
          "/api/chat/save",
          {
            messages: finalMessages,
            role,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }, aiText.length * 15);
    }

  } catch (err) {
    const isQuotaError =
      err?.response?.status === 429 ||
      err?.response?.data?.code === "GEMINI_QUOTA_EXCEEDED";

    if (!isQuotaError) {
      console.error("Chat error:", err);
    }

    const retryText = err?.response?.data?.retryAfter
      ? ` Retry after ${err.response.data.retryAfter}.`
      : "";
    const serverMessage =
      err?.response?.data?.error ||
      "ShishuGuard AI is unavailable. Please try again.";
    const detailText = err?.response?.data?.details
      ? `\n\nDetails: ${err.response.data.details}`
      : "";

    const errorMsg = {
      id: Date.now(),
      role: "system",
      content: "⚠️ Server busy... try again",
      createdAt: new Date().toISOString(),
    };

    errorMsg.content = isQuotaError
      ? `${serverMessage}${retryText}`
      : `${serverMessage}${detailText}`;
    setChatHistory(role, [...messages, errorMsg]);
  } finally {
    setIsSending(false);
  }
};
return (
  <div className="min-h-screen bg-[#020617] p-6 text-white">
    <Card className="max-w-4xl mx-auto dark:bg-gray-700">

      {/* HEADER */}
      <CardHeader className="flex justify-between items-center bg-pink-100 dark:bg-pink-500 rounded-t-lg px-6 py-4">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-pink-500 dark:text-white" />
          <CardTitle className="dark:text-gray-200">
            ShishuGuard AI Chatbot
          </CardTitle>
        </div>

        <select
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="border px-3 py-1 rounded-md text-sm"
        >
          <option value="pediatrician">Pediatrician</option>
          <option value="baby">Baby</option>
          <option value="mother">Mother</option>
        </select>
      </CardHeader>

      {/* CHAT AREA */}
      <CardContent className="p-6">

        <div
          ref={chatContainerRef}
          className="space-y-4 max-h-[600px] overflow-y-auto pr-2 pb-4"
        >
          {messages.length === 0 && (
            <p className="text-center text-gray-400">
              Start chatting with AI 💬
            </p>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-xl px-4 py-3 max-w-[75%] ${
                  m.role === "user"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>

                <span className="text-xs block mt-1 opacity-70">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {/* COPY + VOICE */}
                {m.role === "assistant" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(m.content);
                        } catch {
                          alert("Copy failed");
                        }
                      }}
                      className="text-xs text-blue-500"
                    >
                      Copy
                    </button>

                    <TextToSpeech text={m.content} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* LOADER */}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-2 rounded-xl flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Typing...</span>
              </div>
            </div>
          )}
        </div>
        {/* INPUT AREA */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 pt-4 items-center"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isListening
                ? "Listening..."
                : "Ask me about baby care..."
            }
            className="flex-1"
            disabled={isSending}
          />

          {/* MIC BUTTON */}
          <button
            type="button"
            onClick={() => setIsListening(!isListening)}
            className={`p-2 rounded ${
              isListening ? "bg-red-300" : "bg-gray-200"
            }`}
          >
            {isListening ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* SEND BUTTON */}
          <Button type="submit" disabled={isSending || !input.trim()}>
            {isSending ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>

        {/* VOICE COMPONENT */}
        <SpeechRecognition
          isListening={isListening}
          setIsListening={setIsListening}
          onResult={handleSpeechTranscript}
        />
      </CardContent>
    </Card>
  </div>
);
}
