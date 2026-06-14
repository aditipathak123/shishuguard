"use client";

import Link from "next/link";

import {
  Utensils,
  Moon,
  Activity,
  Shield,
  Package,
  Camera,
  Blocks,
  Music,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

// ---------------- ACTION DATA ----------------

const quickActions = [
  {
    title: "Feeding Tracker",
    subtitle: "Monitor feeding schedules",
    icon: Utensils,
    href: "/Feeding",
    accent: "cyan",
    stats: "Open",
  },

  {
    title: "Sleep Monitor",
    subtitle: "Analyze sleep patterns",
    icon: Moon,
    href: "/Sleep",
    accent: "indigo",
    stats: "Open",
  },

  {
    title: "Growth Insights",
    subtitle: "Track milestones & growth",
    icon: Activity,
    href: "/Growth",
    accent: "emerald",
    stats: "Open",
  },

  {
    title: "Medical Records",
    subtitle: "Vaccines & appointments",
    icon: Shield,
    href: "/Medical",
    accent: "rose",
    stats: "Open",
  },

  {
    title: "Baby Essentials",
    subtitle: "Inventory & stock tracking",
    icon: Package,
    href: "/Essentials",
    accent: "orange",
    stats: "Open",
  },

  {
    title: "Memory Gallery",
    subtitle: "Save baby moments",
    icon: Camera,
    href: "/Memories",
    accent: "pink",
    stats: "Open",
  },

  {
    title: "Toy Explorer",
    subtitle: "Smart toy recommendations",
    icon: Blocks,
    href: "/Toys",
    accent: "violet",
    stats: "Open",
  },

  {
    title: "Lullaby Studio",
    subtitle: "Relaxing sleep sounds",
    icon: Music,
    href: "/Lullaby",
    accent: "sky",
    stats: "Open",
  },
];

// ---------------- COLOR SYSTEM ----------------

const accentStyles = {
  cyan: {
    glow: "from-cyan-500/20 to-blue-500/10",
    icon: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    line: "from-cyan-400 to-blue-400",
  },

  indigo: {
    glow: "from-indigo-500/20 to-violet-500/10",
    icon: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    line: "from-indigo-400 to-violet-400",
  },

  emerald: {
    glow: "from-emerald-500/20 to-green-500/10",
    icon: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    line: "from-emerald-400 to-green-400",
  },

  rose: {
    glow: "from-rose-500/20 to-pink-500/10",
    icon: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    line: "from-rose-400 to-pink-400",
  },

  orange: {
    glow: "from-orange-500/20 to-yellow-500/10",
    icon: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    line: "from-orange-400 to-yellow-400",
  },

  pink: {
    glow: "from-pink-500/20 to-fuchsia-500/10",
    icon: "text-pink-400",
    badge: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    line: "from-pink-400 to-fuchsia-400",
  },

  violet: {
    glow: "from-violet-500/20 to-purple-500/10",
    icon: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    line: "from-violet-400 to-purple-400",
  },

  sky: {
    glow: "from-sky-500/20 to-cyan-500/10",
    icon: "text-sky-400",
    badge: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    line: "from-sky-400 to-cyan-400",
  },
};

// ---------------- COMPONENT ----------------

export default function QuickActionsGrid({
  stats = {},
}) {

  const actionStats = {
    "/Feeding": `${stats.totalFeedings || 0} saved`,
    "/Sleep": `${stats.sleepLogs || 0} logs`,
    "/Growth": `${stats.milestones || 0} checked`,
    "/Medical": `${stats.vaccinesCompleted || 0}/${stats.totalVaccines || 0} done`,
    "/Essentials": `${stats.lowEssentials || 0} low`,
    "/Memories": `${stats.memories || 0} saved`,
    "/Toys": "Open guide",
    "/Lullaby": "Open music",
  };

  return (

    <section className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

        <div>

          <div className="flex items-center gap-3 mb-3">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg">

              <Sparkles className="w-7 h-7 text-white" />

            </div>

            <div>

              <h2 className="text-4xl font-black text-white">

                Parenting Hub

              </h2>

              <p className="text-gray-400 mt-1">

                Everything you need in one place

              </p>

            </div>

          </div>

        </div>

        {/* STATUS */}

        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-sm text-gray-300">

            Smart systems active

          </span>

        </div>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">

        {quickActions.map((action, index) => {

          const Icon = action.icon;

          const styles =
            accentStyles[action.accent];

          return (

            <Link
              href={action.href}
              key={index}
              className="group"
            >

              <div className="relative overflow-hidden rounded-[30px] border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 min-h-[260px] shadow-2xl hover:border-gray-700 transition-all duration-500 hover:-translate-y-2">

                {/* animated glow */}

                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${styles.glow} transition duration-500`} />

                {/* floating blur */}

                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />

                {/* top */}

                <div className="relative z-10 flex items-start justify-between">

                  {/* icon */}

                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center shadow-xl backdrop-blur-md group-hover:scale-110 transition duration-500">

                    <Icon className={`w-8 h-8 ${styles.icon}`} />

                  </div>

                  {/* arrow */}

                  <div className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500">

                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white" />

                  </div>

                </div>

                {/* content */}

                <div className="relative z-10 mt-8">

                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-cyan-300 transition">

                    {action.title}

                  </h3>

                  <p className="text-gray-400 mt-3 leading-relaxed text-sm">

                    {action.subtitle}

                  </p>

                </div>

                {/* stats */}

                <div className="relative z-10 mt-8 flex items-center justify-between">

                  <div className={`px-4 py-2 rounded-full border text-sm ${styles.badge}`}>

                    {actionStats[action.href] || action.stats}

                  </div>

                  <div className="flex items-center gap-1 text-gray-500 group-hover:text-white transition">

                    <TrendingUp className="w-4 h-4" />

                    <ChevronRight className="w-4 h-4" />
                  </div>

                </div>

                {/* bottom line */}

                <div className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r ${styles.line} group-hover:w-full transition-all duration-700`} />

              </div>

            </Link>

          );
        })}

      </div>

    </section>
  );
}
