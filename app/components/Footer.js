"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  BellRing,
  CalendarHeart,
  Heart,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Stars,
} from "lucide-react";

const quickLinks = [
  { name: "Growth Tracker", href: "/Growth" },
  { name: "Feeding Logs", href: "/Feeding" },
  { name: "Sleep Monitor", href: "/Sleep" },
  { name: "Medical Records", href: "/Medical" },
  { name: "Baby Essentials", href: "/Essentials" },
  { name: "Memory Gallery", href: "/Memories" },
];

const insightItems = [
  {
    title: "Secure Health Records",
    status: "Protected",
    icon: ShieldCheck,
    accent: "text-cyan-300",
  },
  {
    title: "Smart Monitoring",
    status: "Enabled",
    icon: Stars,
    accent: "text-yellow-300",
  },
  {
    title: "CarePilot",
    status: "In Dashboard",
    icon: MoonStar,
    accent: "text-violet-300",
  },
];

const tags = ["Baby Wellness", "Smart Tracking", "Child Safety"];

export default function ShishuGuardFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(236,72,153,0.16),transparent_28%),linear-gradient(135deg,#020617,#0f172a_52%,#020617)]" />
      <div className="absolute left-8 top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-pink-400/10 blur-3xl animate-pulse" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mb-12 rounded-[36px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-cyan-400/30 blur-2xl" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 shadow-2xl">
                  <Image
                    src="/logoFooter.png"
                    alt="ShishuGuard"
                    width={46}
                    height={46}
                    className="object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-100">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-200" />
                  Smart baby care platform
                </div>
                <h2 className="bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
                  ShishuGuard
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                  Manage baby health, routines, feeding schedules, medical
                  records, growth tracking, and important memories in one
                  secure, intelligent space.
                </p>
              </div>
            </div>

            <Link
              href="/Dashboard"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(236,72,153,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            >
              Open CarePilot
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-gray-950/70 p-6 shadow-xl backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600">
                <Baby className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Care Promise</h3>
                <p className="text-sm text-gray-400">Built for calmer days</p>
              </div>
            </div>

            <p className="leading-7 text-gray-300">
              From everyday routines to milestone memories, ShishuGuard keeps
              the small details visible so parents can focus on care.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gray-950/70 p-6 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Quick Access</h3>
                <p className="text-sm text-gray-400">Explore parenting tools</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.09]"
                >
                  <span className="text-sm font-bold text-gray-200 group-hover:text-white">
                    {item.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gray-500 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gray-950/70 p-6 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600">
                <CalendarHeart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  Parenting Signals
                </h3>
                <p className="text-sm text-gray-400">Smart care tools</p>
              </div>
            </div>

            <div className="space-y-3">
              {insightItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon className={`h-5 w-5 shrink-0 ${item.accent}`} />
                      <span className="text-sm font-bold text-gray-200">
                        {item.title}
                      </span>
                    </div>
                    <span className={`shrink-0 text-xs font-black ${item.accent}`}>
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-pink-300/20 bg-pink-400/10 p-4">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-pink-200" />
                <p className="text-sm font-bold text-pink-100">
                  Reminders, records, and routines stay close at hand.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-5 rounded-[28px] border border-white/10 bg-white/[0.05] px-5 py-5 text-center backdrop-blur lg:flex-row lg:text-left">
          <div>
            <p className="text-sm font-bold text-gray-300">
              © 2026 ShishuGuard - Caring Beyond Parenting
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Protecting every little moment with smarter baby care.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full border border-pink-300/20 bg-pink-400/10 px-5 py-3 text-sm font-black text-pink-100">
            <Heart className="h-4 w-4 fill-current text-pink-300" />
            Smart Care for Growing Smiles
          </div>

          <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">
            ShishuGuard v1.0
          </div>
        </div>
      </div>
    </footer>
  );
}
