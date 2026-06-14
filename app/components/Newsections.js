"use client";

import React from "react";
import { Baby, BellRing, Bot, ShieldCheck } from "lucide-react";

const AppStatsContent = () => {
  const stats = [
    { icon: Baby, label: "Care Categories", value: "8+" },
    { icon: BellRing, label: "Smart Reminders", value: "24/7" },
    { icon: ShieldCheck, label: "Organized Records", value: "Secure" },
    { icon: Bot, label: "AI Support", value: "Ready" },
  ];

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-black text-white sm:text-4xl">
          Built for Everyday Baby Care
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300">
          Practical tools for routines, reminders, records, and parenting
          support without needing a newsletter signup.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-[28px] border border-white/10 bg-gray-950/80 p-6 text-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-2xl font-black text-transparent">
                {stat.value}
              </h3>
              <p className="mt-2 text-sm font-bold text-gray-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NewSections = () => {
  return (
    <div className="container mx-auto mb-10 max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <AppStatsContent />
    </div>
  );
};

export default NewSections;
