"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const carePilotModes = [
  { id: "daily", label: "Daily Plan" },
  { id: "feeding", label: "Feeding" },
  { id: "stock", label: "Stock" },
  { id: "medical", label: "Medical" },
];

const priorityStyles = {
  high: "border-rose-400/30 bg-rose-500/10 text-rose-100",
  medium: "border-cyan-400/30 bg-cyan-500/10 text-cyan-100",
  low: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
};

const defaultAgentState = {
  summary: "CarePilot is ready when you need it.",
  insight: "Choose a mode and press Refresh CarePilot to spend one Gemini request only when you want fresh suggestions.",
  actions: [
    {
      title: "Open feeding tracker",
      reason: "Start by saving one real care log.",
      href: "/Feeding",
      priority: "medium",
    },
  ],
  mode: "ready",
};

export default function AiCareAgent() {
  const { token, isAuth } = useAuth();
  const [agentPlan, setAgentPlan] = useState(defaultAgentState);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("daily");

  const loadAgentPlan = useCallback(async (selectedMode = mode) => {
    if (!isAuth || !token) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/agent/daily-care?mode=${selectedMode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const quotaMessage =
          response.status === 429 || errorData?.code === "GEMINI_QUOTA_EXCEEDED"
            ? errorData?.insight ||
              `Gemini quota limit hit. Retry after ${
                errorData?.retryAfter || "a short while"
              }.`
            : `HTTP ${response.status}. Check terminal/API logs, GEMINI_API, auth token, and database connection.`;

        setAgentPlan({
          ...defaultAgentState,
          summary:
            errorData?.error || "The care agent request failed.",
          insight: quotaMessage,
          mode: "error",
          actions: [],
        });
        return;
      }

      const data = await response.json();
      setAgentPlan(data);
    } catch (error) {
      setAgentPlan({
        ...defaultAgentState,
        summary: error?.message || "The care agent request failed.",
        insight:
          "Network or server request failed. Check the browser Network tab and Next.js terminal logs.",
        mode: "error",
        actions: [],
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuth, mode, token]);

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-cyan-400/20 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(236,72,153,0.14),transparent_30%)]" />
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />

      <div className="relative z-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">
              <Bot className="h-4 w-4" />
              AI Care Planner
            </div>

            <h2 className="text-3xl font-black text-white">
              CarePilot
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
              Reads saved care data, asks Gemini for reasoning, and suggests
              the next useful app actions for parents.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {carePilotModes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                    mode === item.id
                      ? "border-cyan-300 bg-cyan-400/20 text-cyan-100"
                      : "border-white/10 bg-white/[0.06] text-gray-300 hover:border-cyan-300/30"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => loadAgentPlan()}
            disabled={isLoading}
            className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh CarePilot
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Reasoning Summary
                </p>
                <p
                  className={`text-sm font-bold ${
                    agentPlan.mode === "error"
                      ? "text-rose-200"
                      : "text-cyan-100"
                  }`}
                >
                  {agentPlan.mode === "gemini"
                    ? "Generated by Gemini"
                    : agentPlan.mode === "error"
                      ? "Agent error"
                      : "Ready"}
                </p>
              </div>
            </div>

            <p className="text-lg font-bold leading-7 text-white">
              {agentPlan.summary}
            </p>

            <div className="mt-5 rounded-2xl border border-pink-300/20 bg-pink-400/10 p-4">
              <div className="mb-2 flex items-center gap-2 text-pink-100">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-black">CarePilot Insight</span>
              </div>
              <p className="text-sm leading-6 text-gray-200">
                {agentPlan.insight}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {agentPlan.actions?.length > 0 ? agentPlan.actions.map((action, index) => (
              <Link
                key={`${action.title}-${index}`}
                href={action.href || "/Dashboard"}
                className="group block"
              >
                <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.09]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-black text-white">
                          {action.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-300">
                          {action.reason}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-gray-500 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        priorityStyles[action.priority] || priorityStyles.medium
                      }`}
                    >
                      {action.priority || "medium"} priority
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500">
                      <Zap className="h-3.5 w-3.5" />
                      Next action
                    </span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="rounded-[24px] border border-rose-400/20 bg-rose-500/10 p-5">
                <h3 className="font-black text-rose-100">
                  No CarePilot actions generated
                </h3>
                <p className="mt-2 text-sm leading-6 text-rose-100/80">
                  This usually means Gemini, auth, or database failed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
