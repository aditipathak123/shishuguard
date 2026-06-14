"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Baby,
  Utensils,
  Moon,
  Shield,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

// ---------------- DATA ----------------

const DATA = [
  {
    key: "feeding",
    title: "Nutrition & Feeding",
    icon: Utensils,
    color: "from-pink-500 to-rose-400",
    items: [
      {
        q: "When should I start feeding solids to my baby?",
        a: "Most babies are ready for solid foods around 6 months when they can sit with support and show interest in food.",
      },
      {
        q: "How often should I feed a newborn?",
        a: "Newborns usually need feeding every 2–3 hours. Always follow hunger cues instead of strict schedules.",
      },
      {
        q: "Is formula feeding safe?",
        a: "Yes, formula feeding is safe if prepared correctly and recommended by your pediatrician.",
      },
      {
        q: "Can babies drink water?",
        a: "Babies should not drink water before 6 months. After that, small amounts can be introduced.",
      },
      {
        q: "How should I store breast milk?",
        a: "Breast milk can be stored in the refrigerator for up to 4 days and in the freezer for several months.",
      },
      {
        q: "What foods should I avoid giving my baby?",
        a: "Avoid honey, whole nuts, and foods that can cause choking. Introduce new foods gradually.",
      },
    ],
  },
  {
    key: "sleep",
    title: "Sleep & Routine",
    icon: Moon,
    color: "from-purple-500 to-indigo-500",
    items: [
      {
        q: "How much sleep does a newborn need?",
        a: "Newborns typically need 14–17 hours of sleep in a 24-hour period.",
      },
      {
        q: "What is the safest sleeping position?",
        a: "Babies should always sleep on their back to reduce the risk of SIDS.",
      },
      {
        q: "When do babies start sleeping longer at night?",
        a: "Many babies begin sleeping longer stretches after 3–6 months, but it varies.",
      },
      {
        q: "What is sleep regression?",
        a: "Sleep regression is a temporary phase where a baby’s sleep pattern is disrupted due to growth or development.",
      },
      {
        q: "When should I stop swaddling my baby?",
        a: "Stop swaddling when your baby starts rolling over, usually around 2–4 months.",
      },
      {
        q: "What is a good bedtime routine?",
        a: "A calming routine like a bath, feeding, and soft music helps babies sleep better.",
      },
    ],
  },
  {
    key: "development",
    title: "Growth & Development",
    icon: Baby,
    color: "from-blue-500 to-cyan-400",
    items: [
      {
        q: "When do babies start crawling?",
        a: "Most babies start crawling between 6 to 10 months, though some may skip crawling.",
      },
      {
        q: "Why is tummy time important?",
        a: "Tummy time helps strengthen neck and shoulder muscles and improves motor skills.",
      },
      {
        q: "How can I help with teething pain?",
        a: "Use a cold teether or gently massage the baby’s gums to relieve discomfort.",
      },
      {
        q: "When do babies start speaking?",
        a: "Babies typically say their first words between 10 to 14 months.",
      },
      {
        q: "What if my baby misses milestones?",
        a: "Some variation is normal, but consult a doctor if delays are significant.",
      },
      {
        q: "How can I support my baby’s development?",
        a: "Talk, play, read, and respond to your baby regularly to encourage development.",
      },
    ],
  },
  {
    key: "health",
    title: "Health & Safety",
    icon: Shield,
    color: "from-green-500 to-emerald-400",
    items: [
      {
        q: "When should I call a doctor?",
        a: "Call a doctor if your baby has a fever above 100.4°F, breathing issues, or unusual behavior.",
      },
      {
        q: "How often should I bathe my baby?",
        a: "Bathing 2–3 times a week is sufficient for most babies.",
      },
      {
        q: "How can I treat diaper rash?",
        a: "Keep the area clean and dry and use a zinc-based diaper cream.",
      },
      {
        q: "How do I care for the umbilical cord?",
        a: "Keep it clean and dry. It will fall off naturally within a few weeks.",
      },
      {
        q: "What about vaccination schedules?",
        a: "Follow your pediatrician’s recommended vaccination schedule strictly.",
      },
      {
        q: "How often should baby checkups happen?",
        a: "Regular checkups are important, especially monthly during the first year.",
      },
    ],
  },
];
// ---------------- COMPONENT ----------------

export default function FAQsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);

  const results = useMemo(() => {
    return DATA.map((cat) => {
      if (active !== "all" && cat.key !== active) return null;

      const filtered = cat.items.filter((f) =>
        (f.q + f.a).toLowerCase().includes(query.toLowerCase())
      );

      return filtered.length ? { ...cat, items: filtered } : null;
    }).filter(Boolean);
  }, [query, active]);

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-8 text-white">
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* HEADER */}
      {/* HEADER */}

<div className="text-center relative overflow-hidden rounded-3xl py-10 bg-gradient-to-br from-[#020617] via-[#111827] to-[#0f172a] border border-cyan-900/30 shadow-2xl">

  {/* GLOW EFFECT */}

  <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

  <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full animate-pulse"></div>

  {/* CONTENT */}

  <div className="relative z-10">

    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">

      <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-pulse">

        ShishuGuard

      </span>

      <span className="text-white ml-3">

        FAQ Hub ✨

      </span>

    </h1>

    <p className="text-gray-300 mt-4 text-lg font-medium">

      Smart answers for modern parenting 👶💙

    </p>

    <div className="flex justify-center gap-3 mt-6 flex-wrap">

      <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm shadow-lg shadow-cyan-500/10 animate-bounce">

        Baby Care

      </span>

      <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm shadow-lg shadow-pink-500/10 animate-bounce">

        Parenting AI

      </span>

      <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm shadow-lg shadow-green-500/10 animate-bounce">

        Smart Guidance

      </span>

    </div>

  </div>
</div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search anything about baby..."
          className="pl-10 border-white/10 bg-gray-950 text-white placeholder:text-gray-500 shadow-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          size="sm"
          variant={active === "all" ? "primary" : "outline"}
          onClick={() => setActive("all")}
        >
          All
        </Button>

        {DATA.map((c) => (
          <Button
            key={c.key}
            size="sm"
            variant={active === c.key ? "primary" : "outline"}
            onClick={() => setActive(c.key)}
          >
            {c.title}
          </Button>
        ))}
      </div>

      {/* LIST */}
      {results.map((cat) => (
        <Card
          key={cat.key}
          className="border border-white/10 bg-white/[0.06] text-white shadow-xl backdrop-blur-lg"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className={`p-2 rounded-full bg-gradient-to-r ${cat.color}`}>
                <cat.icon className="w-5 h-5 text-white" />
              </div>
              {cat.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {cat.items.map((item, i) => {
              const id = cat.key + i;
              const isOpen = open === id;

              return (
                <div
                  key={id}
                  className="rounded-xl border border-white/10 bg-gray-950/70 transition hover:border-cyan-300/30 hover:bg-white/[0.08] hover:shadow-md"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    className="w-full flex justify-between p-4 text-left"
                  >
                   <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-pink-300 bg-clip-text text-lg">

  {item.q}

</span>
                    {isOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  {isOpen && (
                    
                      <div className="mx-4 mb-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-pink-500/10 border border-cyan-500/20 text-gray-200 leading-relaxed shadow-lg backdrop-blur-md">

  <span className="text-cyan-300 font-semibold">

    Answer:

  </span>

  <span className="ml-2 text-gray-100">

    {item.a}

  </span>

</div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      {!results.length && (
        <p className="text-center text-gray-400">
          No results found 
        </p>
      )}
    </div>
    </div>
  );
}
