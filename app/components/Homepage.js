"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BellRing,
  Camera,
  CheckCircle2,
  HelpCircle,
  Package,
  PlayCircle,
  Shield,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";

import Button from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import GoToTop from "./GoToTop";
import NewSections from "./Newsections";
import NotificationDemo from "./NotificationDemo";

const features = [
  {
    title: "Feeding Tracker",
    description: "Log feeding times, amounts, and notes with a clean daily view.",
    icon: Utensils,
    href: "/Feeding",
    accent: "from-pink-500 to-rose-500",
    image: "/features/feeding-tracker.png",
    imageAlt: "Feeding tracker app screen with daily feeding stats",
    imagePosition: "object-center",
  },
  {
    title: "Inventory Manager",
    description: "Keep diapers, wipes, medicines, and essentials organized.",
    icon: Package,
    href: "/Essentials",
    accent: "from-amber-500 to-orange-500",
    image: "/features/inventory-manager.png",
    imageAlt: "Inventory manager app screen with baby essentials",
    imagePosition: "object-center",
  },
  {
    title: "Memory Vault",
    description: "Save precious photos and moments in one warm timeline.",
    icon: Camera,
    href: "/Memories",
    accent: "from-violet-500 to-purple-600",
    image: "/features/memory-vault.png",
    imageAlt: "Memory vault app screen with baby photo keepsakes",
    imagePosition: "object-center",
  },
  {
    title: "Health Records",
    description: "Track vaccines, medical notes, and care reminders confidently.",
    icon: Shield,
    href: "/Medical",
    accent: "from-cyan-500 to-blue-600",
    image: "/features/health-records.png",
    imageAlt: "Health records app screen with vaccination and growth summary",
    imagePosition: "object-center",
  },
  {
    title: "Learning Hub",
    description: "Explore age-aware care tips, lullabies, resources, and guides.",
    icon: PlayCircle,
    href: "/Resources",
    accent: "from-emerald-500 to-teal-600",
    image: "/features/learning-hub.png",
    imageAlt: "Learning hub app screen with parenting articles and videos",
    imagePosition: "object-center",
  },
  {
    title: "Quick Help",
    description: "Ask questions and get support when parenting feels busy.",
    icon: HelpCircle,
    href: "/ShishuGuardAi",
    accent: "from-fuchsia-500 to-pink-600",
    image: "/features/quick-help.png",
    imageAlt: "Quick help app screen with popular baby care questions",
    imagePosition: "object-center",
  },
];

const highlights = [
  "Daily care routines",
  "Growth and milestone tracking",
  "Smart reminders",
  "Memories and essentials",
];

const stats = [
  { value: "24/7", label: "Care companion" },
  { value: "8+", label: "Parenting tools" },
  { value: "Simple", label: "Parent-first design" },
];

const parentBenefits = [
  {
    title: "Everything In One Place",
    description:
      "Feeding, sleep, health, inventory, memories, and reminders stay together instead of being scattered across notes and apps.",
    accent: "from-pink-500 to-rose-500",
    image: "/benefits/everything-in-one-place.png",
    imageAlt: "Parents using one baby care app for daily routines",
    imagePosition: "object-center",
  },
  {
    title: "Less Mental Load",
    description:
      "Quick daily views and smart reminders help parents remember what matters without carrying every detail in their head.",
    accent: "from-cyan-500 to-blue-600",
    image: "/benefits/less-mental-load.png",
    imageAlt: "Mother using baby care app while holding her sleeping baby",
    imagePosition: "object-center",
  },
  {
    title: "Built For Daily Use",
    description:
      "Simple flows make it easy to check, log, and continue care while life is already moving around the baby.",
    accent: "from-emerald-500 to-teal-600",
    image: "/benefits/built-for-daily-use.png",
    imageAlt: "Family using a baby care app as part of everyday routines",
    imagePosition: "object-center",
  },
];

const Homepage = () => {
  return (
    <main className="overflow-hidden bg-[#030712] text-white">
      <GoToTop />

      <section className="relative px-6 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.22),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(135deg,#020617,#111827_45%,#020617)]" />
        <div className="absolute left-8 top-12 h-24 w-24 rounded-full border border-pink-300/20 bg-pink-400/10 blur-sm animate-pulse" />
        <div className="absolute bottom-20 right-12 h-32 w-32 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-sm animate-pulse" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 text-center">
          <div className="flex max-w-5xl flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.16)] backdrop-blur">
              <Sparkles className="h-4 w-4 text-yellow-200" />
              Calm, connected baby care
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-pink-100 bg-clip-text text-transparent">
                Smarter Way to Manage Baby Care
              </span>
            </h1>

            <div className="relative mx-auto mt-10 w-full max-w-3xl">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-pink-500/25 via-cyan-400/20 to-purple-500/25 blur-2xl" />
              <div className="relative rounded-[36px] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <Image
                  src="/baby2.png"
                  alt="Parents smiling at their newborn baby"
                  width={1536}
                  height={1024}
                  priority
                  className="aspect-[16/9] w-full rounded-[28px] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                />

                <div className="absolute -bottom-5 left-6 right-6 rounded-3xl border border-white/15 bg-gray-950/90 p-4 shadow-2xl backdrop-blur">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600">
                      <BellRing className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-white">
                        Next care reminder
                      </p>
                      <p className="text-xs font-semibold text-cyan-200">
                        Feeding, sleep, growth, and memories in one flow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-12 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
              Track routines, manage essentials, preserve memories, and keep
              every care decision easier to follow from one polished dashboard.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-h-[48px] rounded-2xl font-black shadow-[0_14px_35px_rgba(236,72,153,0.32)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <Link href="/Growth">
                  Start Tracking
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="soft"
                size="lg"
                className="min-h-[48px] rounded-2xl border-white/15 bg-white/10 font-black text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <Link href="/Resources">Explore Resources</Link>
              </Button>
            </div>

            <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-gray-100 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-300/40 hover:bg-white/[0.09]"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.04] px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-gray-950/70 p-6 text-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <div className="bg-gradient-to-r from-cyan-300 via-pink-300 to-yellow-200 bg-clip-text text-4xl font-black text-transparent">
                {stat.value}
              </div>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-pink-500/10 px-4 py-2 text-sm font-bold text-pink-100">
              <Baby className="h-4 w-4" />
              Everything parents reach for daily
            </div>
            <h2 className="text-4xl font-black sm:text-5xl">
              Key Features
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.title} href={item.href} className="group">
                  <Card className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-gray-950/80 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/30 hover:shadow-[0_20px_55px_rgba(34,211,238,0.16)]">
                    <div
                      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
                    />
                    <div className="relative h-52 overflow-hidden sm:h-56">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={1240}
                        height={1024}
                        className={`h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-105 ${item.imagePosition}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                    </div>
                    <CardHeader>
                      <div
                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.accent} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-black text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-gray-300">
                        {item.description}
                      </p>
                      <div className="mt-5 inline-flex items-center text-sm font-black text-cyan-200">
                        Open feature
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-6 py-16 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(236,72,153,0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.12),transparent_28%)]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
            <Star className="h-4 w-4 fill-cyan-300 text-cyan-300" />
            Parent-first design
          </div>

          <h2 className="text-4xl font-black sm:text-5xl">
            Why Parents Will Like This
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {parentBenefits.map((benefit, index) => (
              <Card
                key={benefit.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-left text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-300/30 hover:shadow-[0_20px_55px_rgba(236,72,153,0.16)]"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${benefit.accent}`}
                />
                <div className="relative h-72 overflow-hidden sm:h-80 md:h-64">
                  <Image
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    width={1536}
                    height={1024}
                    className={`h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 ${benefit.imagePosition}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                </div>
                <CardHeader className="absolute bottom-0 left-0 right-0">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${benefit.accent} text-lg font-black text-white shadow-lg`}
                  >
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl font-black text-white">
                    {benefit.title}
                  </CardTitle>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-gray-200">
                    {benefit.description}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <NewSections />
      <NotificationDemo />

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 p-[1px] shadow-[0_24px_80px_rgba(236,72,153,0.24)]">
          <div className="rounded-[35px] bg-gray-950 px-6 py-10">
            <h2 className="text-3xl font-black sm:text-4xl">
              Ready to Simplify Baby Care?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-300">
              Start with the tools your family needs most, then explore the
              rest of ShishuGuard at your own pace.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-h-[48px] rounded-2xl bg-white font-black text-purple-700 transition hover:scale-105"
              >
                <Link href="/Growth">
                  Start Tracking
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="soft"
                size="lg"
                className="min-h-[48px] rounded-2xl border-white/20 bg-white/10 font-black text-white transition hover:scale-105 hover:bg-white/15"
              >
                <Link href="/Resources">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
