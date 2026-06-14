"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ExternalLink,
  Clock,
  Bookmark,
  Star,
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

const RESOURCES = [
  {
    id: 1,
    title: "Feeding Your Baby: The First Year",
    desc: "Guide for baby nutrition and feeding stages.",
    type: "article",
    category: "feeding",
    time: "10 min read",
    date: "2023-09-19",
    url: "https://my.clevelandclinic.org/health/articles/9693-feeding-your-baby-the-first-year",
    tags: ["nutrition"],
  },
  {
    id: 2,
    title: "Newborn Sleeping Tips",
    desc: "Learn how to build healthy sleep habits.",
    type: "video",
    category: "sleep",
    time: "6 min watch",
    date: "2021-07-09",
    url: "https://youtu.be/j0M4v24gSaw",
    tags: ["sleep"],
  },
  {
    id: 3,
    title: "Baby-Proofing Your Home",
    desc: "Safety checklist for your baby.",
    type: "video",
    category: "health",
    time: "12 min watch",
    date: "2023-01-23",
    url: "https://www.youtube.com/watch?v=d7fCLHVj3K8",
    tags: ["safety"],
  },
  {
    id: 4,
    title: "Breastfeeding Tips",
    desc: "Helpful tips for new mothers.",
    type: "article",
    category: "feeding",
    time: "6 min read",
    date: "2021-04-19",
    url: "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/breastfeeding-101-tips-for-new-moms",
    tags: ["breastfeeding"],
  },
  {
    id: 5,
    title: "Child Development Basics",
    desc: "Understand baby growth milestones.",
    type: "article",
    category: "development",
    time: "8 min read",
    date: "2025-03-04",
    url: "https://my.clevelandclinic.org/health/articles/21559-child-development",
    tags: ["growth"],
  },
];

// ---------------- COMPONENT ----------------

export default function ResourcesPage() {

  const [query, setQuery] = useState("");

  const [active, setActive] = useState("all");

  const [showFav, setShowFav] = useState(false);

  const [favorites, setFavorites] = useState([]);

  // --------------------------------------------------
  // LOAD FAVORITES
  // --------------------------------------------------

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "neo_favorites"
      );

    if (saved) {

      setFavorites(
        JSON.parse(saved)
      );
    }

  }, []);

  // --------------------------------------------------
  // SAVE FAVORITES
  // --------------------------------------------------

  useEffect(() => {

    localStorage.setItem(

      "neo_favorites",

      JSON.stringify(favorites)

    );

  }, [favorites]);

  // --------------------------------------------------
  // TOGGLE FAVORITE
  // --------------------------------------------------

  const toggleFavorite = (item) => {

    setFavorites((prev) => {

      const exists =
        prev.find(
          (f) => f.id === item.id
        );

      if (exists) {

        return prev.filter(
          (f) => f.id !== item.id
        );

      } else {

        return [...prev, item];
      }
    });
  };

  // --------------------------------------------------
  // FILTER LOGIC
  // --------------------------------------------------

  const filtered = useMemo(() => {

    let data =
      showFav
        ? favorites
        : RESOURCES;

    return data.filter((r) => {

      const text = (

        r.title +
        r.desc +
        r.tags.join(" ")

      ).toLowerCase();

      const matchSearch =
        text.includes(
          query.toLowerCase()
        );

      const matchCategory =

        active === "all" ||

        r.category === active;

      return (
        matchSearch &&
        matchCategory
      );
    });

  }, [

    query,
    active,
    favorites,
    showFav,

  ]);

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-10">

      {/* HEADER */}

      <div className="text-center relative overflow-hidden rounded-3xl py-10 bg-gradient-to-br from-[#020617] via-[#111827] to-[#0f172a] border border-cyan-900/30 shadow-2xl">

        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full animate-pulse"></div>

        <div className="relative z-10">

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">

            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-pulse">

              ShishuGuard

            </span>

            <span className="text-white ml-3">

              Resources ✨

            </span>

          </h1>

          <p className="text-gray-300 mt-4 text-lg font-medium">

            Smart parenting resources for modern families 👶💙

          </p>

        </div>
      </div>

      {/* SEARCH */}

      <div className="relative max-w-xl mx-auto">

        <Search className="absolute left-3 top-3 w-4 h-4 text-cyan-300" />

        <Input
          placeholder="Search resources..."
          className="pl-10 bg-[#0f172a] border border-cyan-500/20 text-white placeholder:text-gray-400 rounded-2xl shadow-xl"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />
      </div>

      {/* FILTERS */}

      <div className="flex flex-wrap justify-center gap-3">

        {[
          "all",
          "feeding",
          "sleep",
          "health",

        ].map((c) => (

          <Button
            key={c}
            size="sm"
            variant={
              active === c
                ? "primary"
                : "outline"
            }

            onClick={() =>
              setActive(c)
            }

            className={`px-5 py-2 rounded-2xl font-semibold capitalize transition-all duration-300 border

            ${
              active === c

                ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 text-white shadow-lg shadow-cyan-500/30 border-cyan-400"

                : "bg-[#0f172a] text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10 hover:text-white hover:shadow-md"
            }`}
          >

            {c}

          </Button>
        ))}

        <Button
          size="sm"

          variant={
            showFav
              ? "primary"
              : "outline"
          }

          onClick={() =>
            setShowFav(!showFav)
          }

          className={`px-5 py-2 rounded-2xl font-semibold transition-all duration-300 border

          ${
            showFav

              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg border-yellow-300"

              : "bg-[#0f172a] text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/10 hover:text-white"
          }`}
        >

          <Star className="w-4 h-4 mr-1" />

          Favorites

        </Button>
      </div>

      {/* GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((item) => {

          const isFav =
            favorites.find(
              (f) =>
                f.id === item.id
            );

          return (

            <Card
              key={item.id}

              className="group bg-gradient-to-br from-[#0f172a] via-[#111827] to-black border border-cyan-500/20 shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-500 flex flex-col rounded-3xl overflow-hidden"
            >

              {/* HEADER */}

              <CardHeader className="flex flex-row justify-between items-center">

                <CardTitle className="text-xl font-bold text-white">

                  {item.title}

                </CardTitle>

                <button
                  onClick={() =>
                    toggleFavorite(item)
                  }
                >

                  <Bookmark
                    className={`w-5 h-5 transition

                    ${
                      isFav

                        ? "text-pink-500 fill-pink-500"

                        : "text-gray-400"
                    }`}
                  />

                </button>
              </CardHeader>

              {/* BODY */}

              <CardContent className="space-y-4 flex flex-col justify-between h-full">

                <p className="text-gray-300 text-sm leading-relaxed">

                  {item.desc}

                </p>

                <div className="flex justify-between text-xs text-cyan-300">

                  <span className="flex items-center gap-1">

                    <Clock className="w-3 h-3" />

                    {item.time}

                  </span>

                  <span>

                    {new Date(
                      item.date
                    ).toLocaleDateString("en-IN")}

                  </span>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 text-white border-0 shadow-lg hover:scale-[1.02] transition-all"

                  onClick={() =>
                    window.open(
                      item.url,
                      "_blank"
                    )
                  }
                >

                  <ExternalLink className="w-4 h-4 mr-2" />

                  Open Resource

                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* EMPTY STATE */}

      {!filtered.length && (

        <div className="text-center py-16">

          <h3 className="text-2xl font-bold text-white">

            No resources found 😢

          </h3>

          <p className="text-gray-400 mb-4">

            Try changing search or filters

          </p>

          <Button
            onClick={() => {

              setQuery("");

              setActive("all");

              setShowFav(false);

            }}

            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 text-white border-0"
          >

            Reset Filters

          </Button>
        </div>
      )}
    </div>
  );
}