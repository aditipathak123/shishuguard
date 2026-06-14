"use client";

import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { Lock, Baby, Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPrompt({ sectionName = "this section" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNav = (path) => {
    setLoading(true);
    router.push(path);
  };

  if (!mounted) return null;

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-4 bg-[#020617] overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-indigo-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      {/* CARD */}
      <div className="relative w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02]">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg shadow-indigo-500/30 animate-bounce">
            <Lock className="text-white" size={26} />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Unlock Smart Parenting Tools
        </h2>

        <p className="text-center text-gray-300 text-sm mb-6">
          Sign in to access your baby&apos;s <span className="text-indigo-400">{sectionName}</span> and manage everything effortlessly.
        </p>

        {/* FEATURES */}
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition">
            <Baby size={18} className="text-indigo-400" />
            Track growth, feeding & routines
          </div>

          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition">
            <Heart size={18} className="text-pink-400" />
            Save memories & milestones
          </div>

          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition">
            <Sparkles size={18} className="text-purple-400" />
            AI-powered insights & reminders
          </div>
        </div>

        {/* BUTTONS */}
        <div className="space-y-4">
          <Button
            onClick={() => handleNav("/Login")}
            disabled={loading}
            className="w-full text-base"
          >
            {loading ? "Redirecting..." : "Continue to Login"}
          </Button>

          <button
            onClick={() => handleNav("/Signup")}
            disabled={loading}
            className="w-full text-sm text-gray-400 hover:text-white transition"
          >
            New here? <span className="text-indigo-400">Create account →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
