"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Baby,
  Clock3,
  Heart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import AiCareAgent from "./AiCareAgent";
import BabyInfoCard from "./BabyInfoCard";
import QuickActionsGrid from "./QuickActionsGrid";
import RecentActivities from "./RecentActivities";
import StatsOverview from "./StatsOverview";
import WelcomeBanner from "./WelcomeBanner";

const emptyDashboardData = {
  feedings: [],
  sleepLogs: [],
  vaccines: [],
  essentials: [],
  memories: [],
};

const getGreeting = (date) => {
  const hour = date.getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const parseDurationHours = (duration) => {
  if (!duration) return 0;

  const value = Number.parseFloat(String(duration).replace(/[^\d.]/g, ""));
  return Number.isNaN(value) ? 0 : value;
};

const formatRelativeTime = (dateValue) => {
  if (!dateValue) return "Recently";

  const date = new Date(dateValue);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.floor(diffMs / 60000));

  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

const fetchJson = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;
  return response.json();
};

export default function DashboardLayout() {
  const { user, token, isAuth } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(emptyDashboardData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!isAuth || !token) {
        setDashboardData(emptyDashboardData);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const [feedingRes, sleepRes, vaccineRes, essentialsRes, memoriesRes] =
          await Promise.all([
            fetchJson("/api/feeding", token),
            fetchJson("/api/sleep", token),
            fetchJson("/api/vaccine", token),
            fetchJson("/api/essentials", token),
            fetchJson("/api/memories", token),
          ]);

        setDashboardData({
          feedings: feedingRes?.data || [],
          sleepLogs: Array.isArray(sleepRes) ? sleepRes : [],
          vaccines: Array.isArray(vaccineRes) ? vaccineRes : [],
          essentials: Array.isArray(essentialsRes) ? essentialsRes : [],
          memories: [
            ...(memoriesRes?.privateMemories || []),
            ...(memoriesRes?.publicMemories || []),
          ],
        });
      } catch (error) {
        console.error("Dashboard load error:", error);
        setDashboardData(emptyDashboardData);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [isAuth, token]);

  const babies = user?.BabyDet?.length > 0 ? user.BabyDet : [];
  const userName = user?.name || "Caregiver";
  const greeting = getGreeting(currentTime);

  const stats = useMemo(() => {
    const completedVaccines = dashboardData.vaccines.filter(
      (vaccine) => vaccine.status === "completed"
    ).length;
    const totalSleepHours = dashboardData.sleepLogs.reduce(
      (sum, log) => sum + parseDurationHours(log.duration),
      0
    );
    const avgSleepHours =
      dashboardData.sleepLogs.length > 0
        ? Number((totalSleepHours / dashboardData.sleepLogs.length).toFixed(1))
        : 0;
    const checkedMilestones =
      typeof window !== "undefined"
        ? Object.values(JSON.parse(localStorage.getItem("checkedMilestones") || "{}")).filter(Boolean).length
        : 0;

    return {
      totalFeedings: dashboardData.feedings.length,
      avgSleepHours,
      vaccinesCompleted: completedVaccines,
      totalVaccines: dashboardData.vaccines.length,
      milestones: checkedMilestones,
      lowEssentials: dashboardData.essentials.filter(
        (item) => Number(item.currentStock) <= Number(item.minThreshold)
      ).length,
      memories: dashboardData.memories.length,
      sleepLogs: dashboardData.sleepLogs.length,
      essentials: dashboardData.essentials.length,
    };
  }, [dashboardData]);

  const activities = useMemo(() => {
    const feedingActivities = dashboardData.feedings.map((feed) => ({
      id: `feeding-${feed._id}`,
      type: "feeding",
      title: `${feed.type} logged`,
      description: `${feed.amount || 0} ${feed.type === "Breastfeeding" ? "min" : "unit"} at ${feed.time}`,
      time: formatRelativeTime(feed.createdAt),
      icon: "utensils",
      sortDate: feed.createdAt,
    }));

    const sleepActivities = dashboardData.sleepLogs.map((sleep) => ({
      id: `sleep-${sleep._id}`,
      type: "sleep",
      title: `${sleep.type === "night" ? "Night sleep" : "Nap"} logged`,
      description: `${sleep.duration} sleep entry for ${sleep.babyName || "baby"}`,
      time: formatRelativeTime(sleep.createdAt || sleep.date),
      icon: "moon",
      sortDate: sleep.createdAt || sleep.date,
    }));

    const vaccineActivities = dashboardData.vaccines.map((vaccine) => ({
      id: `vaccine-${vaccine._id}`,
      type: "medical",
      title: vaccine.status === "completed" ? "Vaccine completed" : "Vaccine scheduled",
      description: vaccine.name,
      time: formatRelativeTime(vaccine.updatedAt || vaccine.scheduledDate),
      icon: "syringe",
      sortDate: vaccine.updatedAt || vaccine.scheduledDate,
    }));

    const memoryActivities = dashboardData.memories.map((memory) => ({
      id: `memory-${memory._id}`,
      type: "milestone",
      title: "Memory saved",
      description: memory.title || "New baby memory",
      time: formatRelativeTime(memory.createdAt),
      icon: "star",
      sortDate: memory.createdAt,
    }));

    return [
      ...feedingActivities,
      ...sleepActivities,
      ...vaccineActivities,
      ...memoryActivities,
    ]
      .sort((a, b) => new Date(b.sortDate || 0) - new Date(a.sortDate || 0))
      .slice(0, 6);
  }, [dashboardData]);

  const wellnessScore = Math.min(
    100,
    Math.round(
      (stats.totalFeedings > 0 ? 25 : 0) +
        (stats.sleepLogs > 0 ? 25 : 0) +
        (stats.vaccinesCompleted > 0 ? 25 : 0) +
        (stats.milestones > 0 ? 25 : 0)
    )
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8 shadow-2xl lg:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-4 py-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">
                  Real care dashboard
                </span>
              </div>

              <h2 className="mb-3 text-lg font-medium text-cyan-400">
                {greeting}
              </h2>

              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                Welcome back,
                <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {userName}
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                Your dashboard now reflects saved feeding, sleep, vaccine,
                inventory, memory, and milestone data from this account.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="min-w-[150px] rounded-2xl border border-gray-800 bg-gray-900 px-5 py-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-400" />
                    <span className="text-sm text-gray-400">Wellness</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {wellnessScore}%
                  </h3>
                </div>

                <div className="min-w-[150px] rounded-2xl border border-gray-800 bg-gray-900 px-5 py-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-gray-400">Avg Sleep</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {stats.avgSleepHours}h
                  </h3>
                </div>

                <div className="min-w-[150px] rounded-2xl border border-gray-800 bg-gray-900 px-5 py-4">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-400">Milestones</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {stats.milestones}
                  </h3>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 opacity-30 blur-2xl" />
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-500 shadow-2xl">
                  <Baby className="h-28 w-28 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <WelcomeBanner
          userName={userName}
          stats={stats}
          wellnessScore={wellnessScore}
        />

        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Baby Profiles</h2>
              <p className="mt-1 text-gray-400">
                Saved baby information from your account
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300 md:flex">
              <ShieldCheck className="h-4 w-4" />
              Secure Tracking
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {babies.length > 0 ? (
              babies.map((baby, index) => (
                <div
                  key={baby.id || baby._id || index}
                  className="rounded-3xl border border-gray-800 bg-gray-950 p-4 shadow-xl transition hover:border-cyan-500/30"
                >
                  <BabyInfoCard baby={baby} />
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-gray-800 bg-gray-950 p-10 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 shadow-xl">
                  <Baby className="h-12 w-12 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">No Baby Profile Added</h3>
                <p className="mx-auto mb-6 max-w-md text-gray-400">
                  Add your baby profile from signup or profile flow to unlock
                  personalized dashboard details.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <Activity className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">Analytics Overview</h2>
          </div>
          {isLoading ? (
            <p className="text-gray-400">Loading dashboard data...</p>
          ) : (
            <StatsOverview stats={stats} />
          )}
        </section>

        <section className="rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-violet-400" />
            <h2 className="text-2xl font-bold">Quick Actions</h2>
          </div>
          <QuickActionsGrid stats={stats} />
        </section>

        <AiCareAgent />

        <section className="rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <Clock3 className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">Recent Activities</h2>
          </div>
          <RecentActivities activities={activities} />
        </section>
      </div>
    </div>
  );
}
