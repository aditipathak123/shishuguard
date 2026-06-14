
"use client";

import React, { useState } from "react";

import {
  Sparkles,
  Baby,
  Puzzle,
  Star,
  Rocket,
  Heart,
} from "lucide-react";

import ToysSection from "../components/ToysSection";

export default function ToysPage() {

  const [babyAgeMonths, setBabyAgeMonths] = useState("");

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-black overflow-hidden relative">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">

        {/* HERO SECTION */}

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-10 shadow-[0_0_60px_rgba(34,211,238,0.3)] mb-14 border border-cyan-300/20">

          {/* GLOW */}

          <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative z-10">

            {/* ICON */}

            <div className="flex justify-center mb-6">

              <div className="bg-white/20 backdrop-blur-xl p-6 rounded-[30px] border border-white/30 shadow-2xl hover:scale-105 transition-all duration-500">

                <Puzzle className="w-14 h-14 text-white animate-pulse" />

              </div>
            </div>

            {/* TITLE */}

            <h1 className="text-5xl md:text-7xl font-black text-center leading-tight tracking-tight">

              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">

                ShishuGuard

              </span>

              <span className="block mt-2 bg-gradient-to-r from-cyan-100 via-white to-emerald-100 bg-clip-text text-transparent animate-bounce">

                Smart Toy Explorer ✨

              </span>

            </h1>

            {/* SUBTITLE */}

            <p className="text-center text-xl md:text-2xl max-w-4xl mx-auto mt-7 leading-relaxed font-semibold tracking-wide bg-gradient-to-r from-pink-200 via-cyan-200 to-yellow-200 bg-clip-text text-transparent animate-pulse">

              Discover magical toys crafted for your baby&apos;s
              learning, imagination, happiness and healthy
              development journey 💙

            </p>

            {/* TAGS */}

            <div className="flex flex-wrap justify-center gap-4 mt-10">

              <div className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-cyan-200/10 text-white px-5 py-3 rounded-full backdrop-blur-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">

                <Sparkles className="w-4 h-4" />

                Brain Development

              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-pink-200/10 text-white px-5 py-3 rounded-full backdrop-blur-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">

                <Star className="w-4 h-4" />

                Age Appropriate

              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-emerald-200/10 text-white px-5 py-3 rounded-full backdrop-blur-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">

                <Baby className="w-4 h-4" />

                Safe & Fun

              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-purple-200/10 text-white px-5 py-3 rounded-full backdrop-blur-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">

                <Rocket className="w-4 h-4" />

                Smart Learning

              </div>

            </div>
          </div>
        </div>

        {/* AGE FILTER CARD */}

        <div className="max-w-3xl mx-auto mb-14">

          <div className="bg-gradient-to-br from-[#0f172a]/90 to-[#111827]/90 backdrop-blur-2xl border border-cyan-500/20 rounded-[35px] shadow-[0_0_40px_rgba(34,211,238,0.15)] p-8 hover:shadow-cyan-500/20 transition-all duration-500">

            <div className="flex flex-col md:flex-row items-center gap-6">

              {/* ICON */}

              <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 p-5 rounded-[28px] shadow-2xl hover:rotate-6 transition-all duration-500">

                <Baby className="w-9 h-9 text-white animate-pulse" />

              </div>

              {/* INPUT AREA */}

              <div className="flex-1 w-full">

                <label className="block text-xl font-black mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-pink-300 bg-clip-text text-transparent tracking-wide animate-pulse">

                  ✨ ENTER BABY AGE ✨

                </label>

                <div className="flex items-center gap-4">

                  <input
                    type="number"
                    placeholder="Enter age..."
                    value={babyAgeMonths}
                    onChange={(e) =>
                      setBabyAgeMonths(
                        e.target.value
                      )
                    }
                    min="0"
                    max="24"

                    className="w-full rounded-3xl border border-cyan-500/20 bg-[#020617] px-6 py-5 text-xl text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 shadow-inner"
                  />

                  <span className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent font-bold text-lg">

                    months

                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">

              Recommended Toys 🧸

            </h2>

            <p className="text-cyan-200 mt-3 text-lg font-medium">

              Personalized smart toy recommendations for your little superstar ✨

            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 text-cyan-300 px-5 py-3 rounded-full shadow-lg backdrop-blur-xl">

            <Heart className="w-5 h-5 animate-pulse" />

            Smart Suggestions

          </div>
        </div>

        {/* TOYS SECTION */}

        <div className="relative">

          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <ToysSection
              babyAgeMonths={babyAgeMonths}
              showAll={true}
            />

          </div>
        </div>

      </div>
    </div>
  );
}

