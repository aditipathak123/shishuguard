"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Gamepad2,
  HeartPulse,
  HelpCircle,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  Milk,
  Moon,
  Music4,
  Package,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useAutoTask } from "../context/AutoTaskContext";
import { useChatStore } from "@/lib/store/chatStore";
import AutoTask from "./AutoTask";
import Button from "./ui/Button";
import Chatbot from "./Chatbot";
import NotificationBell from "./NotificationBell";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/Dashboard", icon: LayoutDashboard },
  { label: "Growth", path: "/Growth", icon: TrendingUp },
  { label: "Feeding", path: "/Feeding", icon: Milk },
  { label: "Sleep", path: "/Sleep", icon: Moon },
  { label: "Health", path: "/Medical", icon: HeartPulse },
  { label: "Inventory", path: "/Essentials", icon: Package },
  { label: "Memories", path: "/Memories", icon: ImageIcon },
  { label: "Play", path: "/Toys", icon: Gamepad2 },
  { label: "Learn", path: "/Resources", icon: BookOpen },
  { label: "Help", path: "/Faqs", icon: HelpCircle },
  { label: "Music", path: "/Lullaby", icon: Music4 },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuth, logout } = useAuth();
  const { setAutoTask, isAutoTask } = useAutoTask();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleLogout = () => {
    useChatStore.getState().clearChatHistory();
    logout();
    setShowModal(true);
    setProgress(100);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!showModal) return undefined;

    const timer = setInterval(() => {
      setProgress((p) => (p <= 0 ? 0 : p - 4));
    }, 100);

    return () => clearInterval(timer);
  }, [showModal]);

  useEffect(() => {
    if (progress <= 0 && showModal) {
      setShowModal(false);
      router.push("/");
    }
  }, [progress, router, showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="w-[320px] rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-[#0f172a] to-[#020617] px-6 py-5 text-center text-white shadow-2xl">
            <p className="mb-4 text-gray-300">Session ended successfully.</p>
            <Link
              href="/Login"
              className="text-cyan-400 underline transition hover:text-cyan-300"
            >
              Sign in again
            </Link>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 border-b border-cyan-900/20 bg-[#020617]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 transition hover:text-cyan-300"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/logoFooter.png"
                alt="logo"
                width={45}
                height={45}
                className="transition duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-105"
              />
              <div>
                <h1 className="nav-brand-text bg-gradient-to-r from-cyan-200 via-white to-emerald-200 bg-clip-text text-2xl font-extrabold tracking-wide text-transparent">
                  ShishuGuard
                </h1>
                <p className="nav-tagline mt-0.5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[2.4px] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.16)]">
                  AI Parenting Care
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuth ? (
              <>
                <NotificationBell />
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="nav-action border-cyan-700 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="minimal" className="nav-action">
                  <Link href="/Login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="nav-action border-0 bg-gradient-to-r from-cyan-500 to-green-500 text-white hover:from-cyan-600 hover:to-green-600"
                >
                  <Link href="/Signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="fixed right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
        <Chatbot />
        <AutoTask setAutoTask={setAutoTask} isAutoTask={isAutoTask} />
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <aside
          className={`fixed left-0 top-0 h-full w-80 overflow-y-auto border-r border-cyan-900/40 bg-gradient-to-b from-[#031525] via-[#0f172a] to-[#022c22] p-6 shadow-2xl shadow-cyan-900/20 transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logoFooter.png"
                  alt="logo"
                  width={52}
                  height={52}
                  className="drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                />
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl" />
              </div>
              <div>
                <h1 className="nav-brand-text bg-gradient-to-r from-cyan-200 via-white to-emerald-200 bg-clip-text text-2xl font-extrabold tracking-wide text-transparent">
                  ShishuGuard
                </h1>
                <p className="nav-tagline mt-0.5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[2.4px] text-cyan-100">
                  AI Parenting Assistant
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 transition hover:text-cyan-300"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          <div className="relative mb-8 overflow-hidden rounded-[28px] border border-cyan-300/20 bg-white/[0.07] p-5 shadow-[0_18px_45px_rgba(34,211,238,0.14)] backdrop-blur-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.18),transparent_42%)]" />
            <div className="relative flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-300 to-pink-300 text-xl font-black text-slate-950 shadow-lg shadow-cyan-500/20 animate-pulse">
                S
              </div>
              <div>
                <h3 className="bg-gradient-to-r from-white via-cyan-100 to-pink-100 bg-clip-text text-xl font-black text-transparent">
                  Welcome Back
                </h3>
                <p className="mt-1 text-sm font-semibold text-cyan-100">
                  Smart parenting made easy
                </p>
              </div>
            </div>

            <div className="relative mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-center">
                <p className="text-xs font-bold text-gray-400">Care Tools</p>
                <p className="text-sm font-black text-white">8+</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-center">
                <p className="text-xs font-bold text-gray-400">Status</p>
                <p className="text-sm font-black text-emerald-200">Ready</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            {navItems.map(({ label, path, icon: Icon }, index) => {
              const active = pathname === path;

              return (
                <Link key={label} href={path}>
                  <span
                    onClick={() => setMenuOpen(false)}
                    className={`nav-menu-item group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3 text-sm font-bold capitalize transition-all duration-300 ${
                      active
                        ? "scale-[1.02] border-cyan-300/60 bg-gradient-to-r from-cyan-500/30 via-blue-500/24 to-pink-500/28 text-white shadow-lg shadow-cyan-500/20"
                        : "border-white/10 bg-white/[0.075] text-white hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-white/[0.13]"
                    }`}
                    style={{ animationDelay: `${index * 0.035}s` }}
                  >
                    <span className="nav-menu-shine" />
                    <span
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition duration-300 ${
                        active
                          ? "border-cyan-200/50 bg-cyan-300/25"
                          : "border-cyan-200/20 bg-cyan-300/10 group-hover:border-pink-200/40 group-hover:bg-pink-300/15"
                      }`}
                    >
                    <Icon
                      size={20}
                      className={`transition duration-300 ${
                        active
                          ? "text-cyan-200"
                          : "text-cyan-100 group-hover:text-pink-100"
                      }`}
                    />
                    </span>
                    <span className="nav-menu-label relative tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
                      {label}
                    </span>
                    <span className="relative ml-auto text-[10px] font-black text-cyan-100/80 group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 border-t border-cyan-900/30 pt-6">
            <div className="nav-ai-card relative overflow-hidden rounded-[28px] border border-cyan-200/25 bg-gradient-to-br from-cyan-400/15 via-blue-500/12 to-pink-500/15 p-5 shadow-[0_18px_45px_rgba(236,72,153,0.14)]">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-300/25 blur-2xl" />
              <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-pink-400/20 blur-2xl" />
              <div className="relative">
                <div className="nav-ai-pill mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs font-black text-cyan-50">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-200 drop-shadow-[0_0_8px_rgba(253,224,71,0.65)]" />
                  Smart assistant
                </div>
                <h4 className="nav-ai-title mb-2 bg-gradient-to-r from-cyan-100 via-white to-pink-100 bg-clip-text text-xl font-black text-transparent">
                  ShishuGuard AI
                </h4>
                <p className="text-sm font-medium leading-relaxed text-slate-200">
                  Smart parenting companion for growth, health, memories, and
                  baby care.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
