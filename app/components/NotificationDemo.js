"use client";

import React, { useState } from "react";
import {
  Bell,
  Calendar,
  CheckCircle2,
  Cloud,
  Gift,
  Loader2,
  Moon,
  Package,
  Play,
  Sparkles,
  Syringe,
  Utensils,
  Zap,
} from "lucide-react";

import { useNotifications } from "../context/NotificationContext";
import { notificationService } from "../utils/notificationService";
import Button from "./ui/Button";

const items = [
  {
    type: "feeding",
    title: "Feeding Alert",
    desc: "Set a reminder for the next feeding cycle.",
    icon: Utensils,
    offsetMs: 5 * 60 * 1000,
    accent: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
  },
  {
    type: "sleep",
    title: "Sleep Cycle",
    desc: "Schedule a nap or sleep reminder.",
    icon: Moon,
    offsetMs: 10 * 60 * 1000,
    accent: "from-indigo-500 to-blue-600",
    glow: "shadow-indigo-500/20",
  },
  {
    type: "vaccine",
    title: "Vaccination",
    desc: "Track upcoming vaccine schedules.",
    icon: Syringe,
    offsetMs: 24 * 60 * 60 * 1000,
    accent: "from-red-500 to-orange-500",
    glow: "shadow-red-500/20",
  },
  {
    type: "milestone",
    title: "Milestone",
    desc: "Celebrate small achievements.",
    icon: Gift,
    offsetMs: 0,
    accent: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    type: "essentials",
    title: "Stock Alert",
    desc: "Notify when items run low.",
    icon: Package,
    offsetMs: 0,
    accent: "from-amber-500 to-yellow-500",
    glow: "shadow-amber-500/20",
  },
  {
    type: "weather",
    title: "Weather Note",
    desc: "Stay aware of daily conditions.",
    icon: Cloud,
    offsetMs: 0,
    accent: "from-cyan-500 to-sky-600",
    glow: "shadow-cyan-500/20",
  },
  {
    type: "appointment",
    title: "Appointments",
    desc: "Doctor or checkup reminders.",
    icon: Calendar,
    offsetMs: 2 * 24 * 60 * 60 * 1000,
    accent: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
];

const getScheduledDate = (item) => new Date(Date.now() + item.offsetMs);

const NotificationDemo = () => {
  const [loadingType, setLoadingType] = useState(null);
  const [activeType, setActiveType] = useState("feeding");
  const [lastTriggered, setLastTriggered] = useState(null);
  const { fetchNotifications } = useNotifications();

  const activeItem =
    items.find((item) => item.type === activeType) ?? items[0];
  const ActiveIcon = activeItem.icon;

  const triggerNotification = async (type) => {
    setLoadingType(type);
    setActiveType(type);

    try {
      let res;
      const selectedItem = items.find((item) => item.type === type);
      const scheduledDate = getScheduledDate(selectedItem || items[0]);

      if (type === "feeding") {
        res = await notificationService.createFeedingReminder(
          scheduledDate,
          "Baby",
          "formula"
        );
      } else if (type === "sleep") {
        res = await notificationService.createSleepReminder(
          scheduledDate,
          "Baby"
        );
      } else if (type === "vaccine") {
        res = await notificationService.createVaccineReminder(
          "DTaP Dose",
          scheduledDate,
          "Baby"
        );
      } else if (type === "milestone") {
        res = await notificationService.createMilestoneCelebration(
          "First Giggle",
          "Baby"
        );
      } else if (type === "essentials") {
        res = await notificationService.createEssentialsAlert(
          "Diapers",
          "Baby"
        );
      } else if (type === "weather") {
        res = await notificationService.createWeatherReminder(
          { message: "Rain expected today" },
          "Baby"
        );
      } else if (type === "appointment") {
        res = await notificationService.createAppointmentReminder(
          "Doctor Visit",
          scheduledDate,
          "Baby"
        );
      }

      if (res) {
        setLastTriggered(type);
        notificationService.showToast("Notification added", "success");
        await fetchNotifications();
      } else {
        setLastTriggered(null);
      }
    } catch (err) {
      notificationService.showToast("Something went wrong", "error");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#020617] p-5 text-gray-200 shadow-2xl sm:p-6 lg:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.16),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,1))]" />
      <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-pink-400/10 blur-2xl animate-pulse" />
      <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl animate-pulse" />

      <div className="relative z-10">
        <div className="mb-8 flex flex-col items-center gap-6 text-center">
          <div className="flex max-w-4xl flex-col items-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.14)] backdrop-blur">
              <Sparkles className="h-4 w-4 text-yellow-200" />
              Live alert simulator
            </div>

            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Notification Playground
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300 sm:text-base">
              Test reminders for feeding, sleep, vaccines, essentials, weather,
              and appointments. Each trigger creates a real notification in the
              bell menu.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Status
                </p>
                <p className="text-sm font-black text-white">
                  {loadingType ? "Creating alert..." : "Ready to trigger"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="mx-auto w-full max-w-4xl rounded-[28px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-wide text-gray-300">
                Preview
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gray-950 p-5 shadow-xl">
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${activeItem.accent}`}
              />
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${activeItem.accent} shadow-lg ${activeItem.glow} animate-pulse`}
                >
                  <ActiveIcon className="h-7 w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-white">
                    {activeItem.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    {activeItem.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-pink-100">
                      Baby care
                    </span>
                  </div>
                </div>
              </div>

              {lastTriggered && (
                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm font-bold text-emerald-100">
                  <CheckCircle2 className="h-4 w-4" />
                  Last notification added successfully
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeType === item.type;
              const isLoading = loadingType === item.type;
              const wasTriggered = lastTriggered === item.type;

              return (
                <button
                  key={item.type}
                  type="button"
                  onMouseEnter={() => setActiveType(item.type)}
                  onFocus={() => setActiveType(item.type)}
                  onClick={() => triggerNotification(item.type)}
                  disabled={Boolean(loadingType)}
                  className={`
                    group relative overflow-hidden rounded-[24px] border p-4
                    text-left shadow-xl transition-all duration-300
                    hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed
                    disabled:opacity-70
                    ${
                      isActive
                        ? "border-cyan-300/40 bg-white/[0.10]"
                        : "border-white/10 bg-white/[0.055] hover:border-pink-300/30"
                    }
                  `}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${item.accent} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {wasTriggered && !isLoading && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    )}
                  </div>

                  <h3 className="mt-4 text-base font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 min-h-[40px] text-sm leading-5 text-gray-300">
                    {item.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-950 transition-transform duration-300 group-hover:scale-110">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 fill-current" />
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm leading-6 text-gray-300">
                Use this panel to create alert notifications. New alerts appear
                directly on the bell icon and can be managed anytime.
              </p>
            </div>

            <Button
              size="sm"
              onClick={() => triggerNotification(activeItem.type)}
              disabled={Boolean(loadingType)}
              className="min-h-[44px] rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 font-black text-white shadow-lg transition-all duration-300 hover:scale-105"
            >
              {loadingType === activeItem.type ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Trigger Selected
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationDemo;
