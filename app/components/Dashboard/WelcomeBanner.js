"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Brain,
  HeartHandshake,
  Moon,
  Sparkles,
  Stars,
  Sun,
} from "lucide-react";

const getTimeGreeting = (date) => {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: "Good Morning",
      message: "Start the day by checking feeding, sleep, and care logs.",
      isDaytime: true,
    };
  }

  if (hour < 18) {
    return {
      greeting: "Good Afternoon",
      message: "Review today's care progress and add any missing updates.",
      isDaytime: true,
    };
  }

  if (hour < 22) {
    return {
      greeting: "Good Evening",
      message: "Wind down with sleep tracking, lullabies, and tomorrow's plan.",
      isDaytime: false,
    };
  }

  return {
    greeting: "Good Night",
    message: "Keep the night calm with sleep notes and tomorrow's care plan.",
    isDaytime: false,
  };
};

const formatLiveTime = (date) =>
  (date || new Date()).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const getProgressLabel = (stats) => {
  const completedSignals = [
    stats.totalFeedings > 0,
    stats.sleepLogs > 0,
    stats.vaccinesCompleted > 0,
    stats.milestones > 0,
  ].filter(Boolean).length;

  if (completedSignals >= 3) return "Well tracked";
  if (completedSignals >= 1) return "In progress";
  return "Needs first log";
};

const getInsight = (stats, wellnessScore) => {
  if (wellnessScore >= 75) {
    return "Care routine has strong coverage today";
  }

  if (!stats.totalFeedings) {
    return "Add feeding logs to improve care visibility";
  }

  if (!stats.sleepLogs) {
    return "Add sleep logs for better routine insights";
  }

  if (!stats.vaccinesCompleted && stats.totalVaccines > 0) {
    return "Review vaccine records for upcoming care";
  }

  return "Keep adding routine data for smarter insights";
};

export default function WelcomeBanner({
  userName,
  stats = {},
  wellnessScore = 0,
}) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const timeState = useMemo(
    () => getTimeGreeting(now || new Date()),
    [now]
  );
  const progressLabel = getProgressLabel(stats);
  const aiInsight = getInsight(stats, wellnessScore);
  const careMode = stats.totalFeedings || stats.sleepLogs ? "Tracking" : "Ready";
  const liveTime = formatLiveTime(now);

  if (!now) return null;

  return (
    <section className="relative overflow-hidden rounded-[35px] border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black shadow-2xl">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 p-8 lg:p-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)]">
              <Sparkles className="h-4 w-4" />
              Real-time Parenting Assistant • {liveTime}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 shadow-xl">
                {timeState.isDaytime ? (
                  <Sun className="h-8 w-8 animate-pulse text-white" />
                ) : (
                  <Moon className="h-8 w-8 animate-pulse text-white" />
                )}
              </div>

              <div>
                <h1 className="dashboard-greeting text-4xl font-black leading-tight lg:text-5xl">
                  {timeState.greeting}
                  <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    {userName}
                  </span>
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              {timeState.message}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/80 px-5 py-4 backdrop-blur-md">
                <div className="mb-1 flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-pink-400" />
                  <span className="text-sm text-gray-400">Parenting Mode</span>
                </div>
                <h3 className="text-xl font-bold text-white">{careMode}</h3>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900/80 px-5 py-4 backdrop-blur-md">
                <div className="mb-1 flex items-center gap-2">
                  <Stars className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">Daily Progress</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {progressLabel}
                </h3>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 opacity-30 blur-3xl" />

              <div className="relative rounded-[30px] border border-gray-800 bg-gray-900/80 p-6 shadow-2xl backdrop-blur-xl lg:w-[300px]">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">AI Insight</p>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Care Readiness
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="mb-6">
                  <h1 className="text-5xl font-black text-white">
                    {wellnessScore}%
                  </h1>
                  <p className="mt-2 text-cyan-300">{aiInsight}</p>
                </div>

                <Link
                  href="/ShishuGuardAi"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
                >
                  Ask AI About This
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
