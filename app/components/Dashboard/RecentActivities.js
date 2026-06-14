"use client";

import {
  Clock3,
  Utensils,
  Moon,
  Star,
  Syringe,
  Activity,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// ---------------- ICON MAP ----------------

const iconMap = {
  utensils: Utensils,
  moon: Moon,
  star: Star,
  syringe: Syringe,
  activity: Activity,
};

// ---------------- COLOR STYLES ----------------

const activityStyles = {
  feeding: {
    glow: "from-cyan-500/20 to-blue-500/10",
    iconBg: "bg-cyan-500/10",
    icon: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },

  sleep: {
    glow: "from-indigo-500/20 to-violet-500/10",
    iconBg: "bg-indigo-500/10",
    icon: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  },

  milestone: {
    glow: "from-yellow-500/20 to-orange-500/10",
    iconBg: "bg-yellow-500/10",
    icon: "text-yellow-400",
    badge: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  },

  medical: {
    glow: "from-rose-500/20 to-red-500/10",
    iconBg: "bg-rose-500/10",
    icon: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  },

  default: {
    glow: "from-violet-500/20 to-purple-500/10",
    iconBg: "bg-violet-500/10",
    icon: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  },
};

// ---------------- COMPONENT ----------------

export default function RecentActivities({
  activities,
}) {

  return (

    <section className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center shadow-xl">

              <Sparkles className="w-7 h-7 text-white" />

            </div>

            <div>

              <h2 className="text-4xl font-black text-white">

                Activity Feed

              </h2>

              <p className="text-gray-400 mt-1">

                Latest baby care updates & events

              </p>

            </div>

          </div>

        </div>

        {/* VIEW BUTTON */}

        <button className="group flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-800 bg-gray-950 text-gray-300 hover:text-white hover:border-cyan-500/30 transition-all duration-300">

          View Full Timeline

          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300" />

        </button>

      </div>

      {/* ACTIVITIES */}

      {activities.length > 0 ? (

        <div className="relative">

          {/* vertical line */}

          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/30 via-violet-500/20 to-transparent" />

          <div className="space-y-6">

            {activities.map((activity) => {

              const Icon =
                iconMap[activity.icon] || Activity;

              const styles =
                activityStyles[activity.type] ||
                activityStyles.default;

              return (

                <div
                  key={activity.id}
                  className="group relative flex gap-5"
                >

                  {/* timeline icon */}

                  <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-xl ${styles.iconBg}`}>

                    <Icon
                      className={`w-7 h-7 ${styles.icon}`}
                    />

                  </div>

                  {/* card */}

                  <div className="relative overflow-hidden flex-1 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 shadow-xl hover:border-cyan-500/20 transition-all duration-500">

                    {/* glow */}

                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${styles.glow} transition duration-500`} />

                    {/* top row */}

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>

                        <h3 className="text-xl font-bold text-white mb-2">

                          {activity.title}

                        </h3>

                        <p className="text-gray-400 leading-relaxed">

                          {activity.description}

                        </p>

                      </div>

                      {/* badge */}

                      <div className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${styles.badge}`}>

                        {activity.type}

                      </div>

                    </div>

                    {/* footer */}

                    <div className="relative z-10 flex items-center justify-between mt-6">

                      <div className="flex items-center gap-2 text-gray-500">

                        <Clock3 className="w-4 h-4" />

                        <span className="text-sm">

                          {activity.time}

                        </span>

                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition duration-300">

                        <ArrowUpRight className="w-5 h-5 text-cyan-400" />

                      </div>

                    </div>

                    {/* bottom line */}

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-full transition-all duration-700" />

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      ) : (

        // EMPTY STATE

        <div className="rounded-[35px] border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-12 text-center shadow-2xl">

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center shadow-xl mb-6">

            <Activity className="w-12 h-12 text-white" />

          </div>

          <h3 className="text-3xl font-bold text-white mb-3">

            No Activities Yet

          </h3>

          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">

            Start tracking feeding, sleep, milestones,
            and medical events to build your baby&apos;s
            personalized activity timeline.

          </p>

        </div>

      )}

    </section>
  );
}