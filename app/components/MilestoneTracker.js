"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Gift,
  Lock,
  PartyPopper,
  PlusCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import Button from "../components/ui/Button";
import toysData from "../data/toys.json";
import { useMilestoneStore } from "../../lib/store/milestoneStore";

const defaultMilestones = {
  0: ["Lifts head", "Responds to sound"],
  1: ["Smiles at people", "Follows objects"],
  2: ["Rolls over", "Holds head steady"],
  3: ["Sits without support", "Pushes down on legs"],
};

const getMonthDiff = (dob) => {
  const now = new Date();
  const birth = new Date(dob);
  return Math.max(0, Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 30.44)));
};

const formatUnlockDate = (date) =>
  date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getUnlockDate = (dob, monthIndex) => {
  if (!dob) return null;

  const unlockDate = new Date(dob);
  unlockDate.setMonth(unlockDate.getMonth() + monthIndex);
  return unlockDate;
};

const getDaysUntilUnlock = (unlockDate) => {
  if (!unlockDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(unlockDate);
  targetDate.setHours(0, 0, 0, 0);

  return Math.max(
    0,
    Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))
  );
};

function getToysForMonth(month) {
  return toysData.filter((toy) => {
    const age = toy.age;
    if (age === "0-3m" && month >= 0 && month < 3) return true;
    if (age === "3-6m" && month >= 3 && month < 6) return true;
    if (age === "6-12m" && month >= 6 && month < 12) return true;
    if (age === "12-18m" && month >= 12 && month < 18) return true;
    if (age === "18-24m+" && month >= 18) return true;
    return false;
  });
}

export default function MilestoneTracker({ babyDOB }) {
  const [milestones, setMilestones] = useState(defaultMilestones);
  const { completed, toggleMilestone, completedMonths } = useMilestoneStore();
  const [visibleMonth, setVisibleMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [activeAddInput, setActiveAddInput] = useState(null);
  const [newMilestone, setNewMilestone] = useState("");

  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (babyDOB) {
      const month = Math.min(11, getMonthDiff(babyDOB));
      setCurrentMonth(month);
      setVisibleMonth(month);
    }
  }, [babyDOB]);

  useEffect(() => {
    scrollToCard(visibleMonth);
  }, [visibleMonth]);

  const handleAdd = (month) => {
    const trimmedMilestone = newMilestone.trim();

    if (!trimmedMilestone) return;

    setMilestones((prev) => ({
      ...prev,
      [month]: [...(prev[month] || []), trimmedMilestone],
    }));
    setNewMilestone("");
    setActiveAddInput(null);
  };

  const handleDelete = (month, milestone) => {
    setMilestones((prev) => ({
      ...prev,
      [month]: (prev[month] || []).filter((item) => item !== milestone),
    }));
  };

  const scrollToCard = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setVisibleMonth(index);
    }
  };

  const goToPreviousMonth = () => {
    scrollToCard(Math.max(0, visibleMonth - 1));
  };

  const goToNextMonth = () => {
    scrollToCard(Math.min(11, visibleMonth + 1));
  };

  return (
    <div className="min-h-screen w-full rounded-[32px] bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 p-4">
      <div className="mx-auto mb-6 max-w-4xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm">
          <PartyPopper className="h-4 w-4" />
          Baby milestone journey
        </div>
        <h2 className="text-3xl font-black text-gray-900 sm:text-4xl dark:text-white">
          Track Every Little Win
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
          Tap a milestone to mark it complete, add your own, or delete anything
          you no longer want to track.
        </p>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="absolute left-0 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-700 shadow-lg transition hover:scale-105 hover:bg-pink-50 md:flex"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={containerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 py-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {Array.from({ length: 12 }).map((_, i) => {
            const isCurrent = i === visibleMonth;
            const isPast = i < currentMonth;
            const monthMilestones = milestones[i] || [];
            const completedCount = monthMilestones.filter(
              (milestone) => completed[`${i}:${milestone}`]
            ).length;
            const completedAll =
              monthMilestones.length > 0 &&
              completedCount === monthMilestones.length;
            const showRedAlert = isPast && !completedAll;
            const unlockDate = getUnlockDate(babyDOB, i);
            const daysUntilUnlock = getDaysUntilUnlock(unlockDate);
            const progress =
              monthMilestones.length > 0
                ? Math.round((completedCount / monthMilestones.length) * 100)
                : 0;

            return (
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                key={i}
                onClick={() => {
                  if (visibleMonth !== i) scrollToCard(i);
                }}
                className={`
                  relative flex min-h-[430px] min-w-[280px] cursor-pointer
                  snap-start flex-col justify-between rounded-3xl p-6
                  shadow-lg backdrop-blur-sm transition-all duration-500
                  hover:shadow-2xl sm:min-w-[320px] md:min-w-[340px]
                  ${isCurrent ? "z-20 mx-4 scale-105" : "scale-95 hover:scale-100"}
                  ${
                    i === visibleMonth && i === currentMonth
                      ? "border-2 border-pink-400 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 ring-4 ring-pink-300/50"
                      : i === visibleMonth
                        ? "border-2 border-purple-300 bg-gradient-to-br from-white via-pink-50 to-purple-50 ring-2 ring-purple-200/50"
                        : showRedAlert
                          ? "border-2 border-red-300 bg-gradient-to-br from-red-100 via-pink-100 to-red-50"
                          : i === currentMonth
                            ? "border-2 border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-50"
                            : isPast
                              ? "border border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white opacity-90"
                              : "border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-70"
                  }
                `}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 bg-clip-text text-xl font-black tracking-wide text-transparent animate-pulse">
                        Month {i + 1}
                      </h3>
                      <p className="text-xs font-semibold text-purple-700">
                        {completedCount}/{monthMilestones.length} completed
                      </p>
                      {unlockDate && (
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-pink-700">
                          {i <= currentMonth
                            ? "Unlocked"
                            : `Unlocks ${formatUnlockDate(unlockDate)}`}
                        </p>
                      )}
                    </div>

                    {i < currentMonth && completedMonths.has(i) && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 shadow-sm">
                        <PartyPopper className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="space-y-3">
                    {monthMilestones.map((milestone) => (
                      <div
                        key={milestone}
                        className={`
                          flex items-center justify-between gap-3 rounded-2xl
                          p-3 transition-all duration-300 hover:-translate-y-0.5
                          hover:bg-white
                          ${
                            completed[`${i}:${milestone}`]
                              ? "border border-green-200 bg-gradient-to-r from-green-100 to-emerald-100"
                              : "border border-white/80 bg-white/75 shadow-sm"
                          }
                        `}
                      >
                        <button
                          type="button"
                          className="flex min-w-0 flex-1 items-center gap-3 text-left"
                          onClick={(event) => {
                            event.stopPropagation();
                            if (i <= currentMonth) toggleMilestone(i, milestone);
                          }}
                        >
                          <span
                            className={`
                              flex h-5 w-5 shrink-0 items-center justify-center
                              rounded-full transition-all duration-300
                              ${
                                completed[`${i}:${milestone}`]
                                  ? "bg-gradient-to-r from-green-400 to-emerald-400"
                                  : "bg-gradient-to-r from-pink-400 to-purple-400"
                              }
                            `}
                          >
                            {completed[`${i}:${milestone}`] && (
                              <Check className="h-2.5 w-2.5 text-white" />
                            )}
                          </span>

                          <span
                            className={`
                              min-w-0 break-words text-sm font-semibold
                              leading-5 transition-all duration-300
                              ${
                                completed[`${i}:${milestone}`]
                                  ? "text-green-800 line-through"
                                  : "text-gray-800"
                              }
                            `}
                          >
                            {milestone}
                          </span>
                        </button>

                        {i <= currentMonth && (
                          <button
                            type="button"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all duration-200 hover:scale-110 hover:bg-red-100 hover:text-red-700"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDelete(i, milestone);
                            }}
                            aria-label={`Delete ${milestone}`}
                            title="Delete milestone"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {activeAddInput === i && (
                    <div className="mt-4 rounded-2xl border border-white/70 bg-white/70 p-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter new milestone..."
                          className="flex-1 rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                          value={newMilestone}
                          onChange={(event) => setNewMilestone(event.target.value)}
                          onClick={(event) => event.stopPropagation()}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") handleAdd(i);
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAdd(i);
                          }}
                          className="rounded-full p-1 text-green-500 transition-all duration-200 hover:scale-110 hover:bg-green-50 hover:text-green-700"
                          aria-label="Save milestone"
                        >
                          <Check size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  {i === currentMonth && activeAddInput !== i && (
                    <div className="mb-4">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveAddInput(i);
                        }}
                        variant="ghost"
                        className="w-full border border-purple-200 text-purple-700 hover:border-purple-300 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-900"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Milestone
                      </Button>
                    </div>
                  )}

                  {i > currentMonth && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white/55 px-6 text-center backdrop-blur-sm">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-100 via-blue-100 to-pink-100 text-purple-700 shadow-lg animate-pulse">
                        <Lock className="h-8 w-8" />
                      </div>
                      <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 bg-clip-text text-base font-black tracking-wide text-transparent">
                        Month {i + 1} unlocks later
                      </span>
                      {unlockDate && (
                        <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                          Available on {formatUnlockDate(unlockDate)}
                          {daysUntilUnlock > 0
                            ? `, in ${daysUntilUnlock} day${
                                daysUntilUnlock === 1 ? "" : "s"
                              }`
                            : ""}
                        </p>
                      )}
                    </div>
                  )}

                  {i < currentMonth && completedMonths.has(i) && (
                    <div className="mt-2 rounded-xl border border-green-200 bg-gradient-to-r from-green-100 to-emerald-100 p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Gift className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          Suggested Toys for Month {i + 1}
                        </span>
                      </div>
                      <div className="mb-2 text-xs text-green-700">
                        {getToysForMonth(i)
                          .slice(0, 2)
                          .map((toy) => toy.name)
                          .join(", ")}
                      </div>
                      <Link
                        href="/Toys"
                        className="text-xs font-semibold text-green-800 hover:underline"
                      >
                        View all toys
                      </Link>
                    </div>
                  )}

                  {i < currentMonth && !completedMonths.has(i) && (
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-100 to-red-100 p-3">
                      <Link
                        href="/ShishuGuardAi"
                        className="text-sm font-semibold text-orange-800 transition-colors duration-200 hover:text-red-800 hover:underline"
                      >
                        Ask Chatbot about milestone delay?
                      </Link>
                    </div>
                  )}

                  <div className="mt-4 flex justify-center gap-2">
                    {monthMilestones.map((milestone, dotIndex) => (
                      <div
                        key={`${milestone}-${dotIndex}`}
                        title={`${milestone} - ${
                          completed[`${i}:${milestone}`] ? "Completed" : "Pending"
                        }`}
                        className={`
                          h-3 w-3 rounded-full transition-all duration-500
                          hover:scale-125
                          ${
                            completed[`${i}:${milestone}`]
                              ? "bg-gradient-to-r from-green-400 to-emerald-400 shadow-md"
                              : "bg-gradient-to-r from-gray-300 to-gray-400"
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goToNextMonth}
          className="absolute right-0 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-700 shadow-lg transition hover:scale-105 hover:bg-pink-50 md:flex"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`
              h-4 w-4 rounded-full transition-all duration-300 hover:scale-125
              ${
                i === visibleMonth
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg ring-2 ring-pink-300"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 hover:from-pink-300 hover:to-purple-300"
              }
            `}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to month ${i + 1}`}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <span className="inline-flex rounded-full border border-pink-300/80 bg-white px-6 py-3 text-sm font-black tracking-wide shadow-[0_0_28px_rgba(236,72,153,0.28)] animate-pulse dark:border-cyan-300/60 dark:bg-gray-950/90 dark:shadow-[0_0_34px_rgba(34,211,238,0.35)]">
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent dark:from-cyan-200 dark:via-pink-200 dark:to-yellow-100">
            Celebrating every little achievement
          </span>
        </span>
      </div>
    </div>
  );
}
