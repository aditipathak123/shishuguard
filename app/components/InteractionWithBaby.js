"use client";

import React, { useEffect, useState } from "react";
import { Baby, Heart, Music, Sparkles, Star } from "lucide-react";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/Carousel";

const interactionStages = [
  {
    title: "0-3 Months",
    icon: Baby,
    accent: "from-cyan-500 to-blue-600",
    tips: [
      "Talk softly and maintain eye contact",
      "Use gentle lullabies and calming sounds",
      "Encourage tummy time every day",
      "Respond to baby coos and reactions",
      "Use high contrast toys and visuals",
      "Hold baby close during feeding",
      "Create a calm and warm environment",
    ],
  },
  {
    title: "4-6 Months",
    icon: Heart,
    accent: "from-pink-500 to-rose-500",
    tips: [
      "Play peekaboo games",
      "Use mirrors for playful interaction",
      "Introduce colorful rattles",
      "Encourage rolling and reaching",
      "Read simple picture books",
      "Use cheerful sounds and expressions",
      "Allow safe toy exploration",
    ],
  },
  {
    title: "7-9 Months",
    icon: Music,
    accent: "from-violet-500 to-purple-600",
    tips: [
      "Encourage crawling activities",
      "Play music and action songs",
      "Explore different textures safely",
      "Practice object permanence games",
      "Use simple repetitive words",
      "Allow independent toy play",
      "Create a safe exploration space",
    ],
  },
  {
    title: "10-12 Months",
    icon: Star,
    accent: "from-emerald-500 to-teal-600",
    tips: [
      "Encourage standing and walking",
      "Practice clapping and waving",
      "Introduce simple stacking games",
      "Read interactive story books",
      "Teach object names regularly",
      "Use musical toys and sounds",
      "Promote imitation and gestures",
    ],
  },
];

const InteractionWithBaby = () => {
  const [selectedAge, setSelectedAge] = useState(interactionStages[0].title);
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [selectedAge, api]);

  const currentStage =
    interactionStages.find((stage) => stage.title === selectedAge) ??
    interactionStages[0];
  const CurrentIcon = currentStage.icon;

  return (
    <section
      id="interaction-tips"
      className="
        relative overflow-hidden rounded-[40px] border border-cyan-500/10
        bg-gradient-to-br from-black via-[#050816] to-[#0b1120]
        px-6 py-14 shadow-2xl
      "
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div
            className="
              mb-6 inline-flex items-center gap-3 rounded-full border
              border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-300
            "
          >
            <Sparkles className="h-5 w-5" />
            Smart Baby Interaction Guide
          </div>

          <h2
            className="
              mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400
              bg-clip-text text-4xl font-black text-transparent sm:text-5xl
            "
          >
            Interaction Tips by Age
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Explore meaningful and engaging ways to connect with your baby at
            every stage of growth and development.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {interactionStages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedAge === stage.title;

            return (
              <button
                key={stage.title}
                type="button"
                onClick={() => setSelectedAge(stage.title)}
                className={`
                  relative overflow-hidden rounded-3xl border p-5 transition-all
                  duration-300 hover:scale-[1.03]
                  ${
                    isSelected
                      ? `
                        border-cyan-500/30 bg-gradient-to-r ${stage.accent}
                        text-white shadow-[0_10px_35px_rgba(34,211,238,0.35)]
                      `
                      : `
                        border-gray-800 bg-gray-950 text-gray-300
                        hover:border-cyan-500/20 hover:bg-gray-900
                      `
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="font-semibold">{stage.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[320px_1fr]">
          <div
            className="
              rounded-[32px] border border-gray-800 bg-gradient-to-br
              from-gray-950 via-gray-900 to-black p-8 shadow-2xl
            "
          >
            <div
              className={`
                mb-6 flex h-20 w-20 items-center justify-center rounded-3xl
                bg-gradient-to-r ${currentStage.accent} shadow-xl
              `}
            >
              <CurrentIcon className="h-10 w-10 text-white" />
            </div>

            <h3 className="mb-4 text-3xl font-black text-white">
              {currentStage.title}
            </h3>

            <p className="leading-relaxed text-gray-400">
              Personalized interaction activities designed to strengthen
              emotional bonding, learning, and healthy development during this
              stage.
            </p>
          </div>

          <div className="min-w-0">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent className="items-stretch">
                {currentStage.tips.map((tip) => (
                  <CarouselItem key={tip} className="flex justify-center">
                    <Card
                      className="
                        relative w-full max-w-3xl overflow-hidden rounded-[32px] border
                        border-cyan-500/10 bg-gradient-to-br from-gray-950
                        via-gray-900 to-black
                        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                      "
                    >
                      <div
                        className={`
                          absolute inset-0 bg-gradient-to-r
                          ${currentStage.accent} opacity-[0.06]
                        `}
                      />

                      <CardContent className="relative z-10 flex min-h-[280px] flex-col items-center justify-center px-5 py-8 text-center sm:px-8">
                        <div
                          className={`
                            mb-8 flex h-20 w-20 items-center justify-center
                            rounded-3xl bg-gradient-to-r
                            ${currentStage.accent} shadow-xl
                          `}
                        >
                          <CurrentIcon className="h-10 w-10 text-white" />
                        </div>

                        <p className="mx-auto w-full max-w-xl break-words text-center text-lg font-semibold leading-relaxed text-gray-200 sm:text-xl">
                          {tip}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-8 flex justify-center gap-6">
                <CarouselPrevious
                  className="
                    static translate-y-0 border border-gray-800 bg-gray-950
                    text-white hover:border-cyan-500/30 hover:bg-cyan-500/10
                  "
                />

                <CarouselNext
                  className="
                    static translate-y-0 border border-gray-800 bg-gray-950
                    text-white hover:border-cyan-500/30 hover:bg-cyan-500/10
                  "
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractionWithBaby;
