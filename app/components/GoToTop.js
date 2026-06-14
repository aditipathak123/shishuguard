"use client";

import React, {
  useState,
  useEffect,
} from "react";

import {
  ChevronUp,
  Sparkles,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

// --------------------------------------------------
// GO TO TOP BUTTON
// --------------------------------------------------

const GoToTop = () => {

  const [isVisible, setIsVisible] =
    useState(false);

  // ---------------- SCROLL VISIBILITY ----------------

  useEffect(() => {

    const toggleVisibility = () => {

      if (window.scrollY > 300) {

        setIsVisible(true);

      } else {

        setIsVisible(false);
      }
    };

    window.addEventListener(
      "scroll",
      toggleVisibility
    );

    return () => {

      window.removeEventListener(
        "scroll",
        toggleVisibility
      );
    };

  }, []);

  // ---------------- SCROLL TO TOP ----------------

  const scrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",
    });
  };

  // ---------------- JSX ----------------

  return (

    <AnimatePresence>

      {isVisible && (

        <motion.button

          initial={{
            opacity: 0,
            scale: 0.7,
            y: 40,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          exit={{
            opacity: 0,
            scale: 0.7,
            y: 40,
          }}

          transition={{
            duration: 0.35,
          }}

          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: 0.92,
          }}

          onClick={scrollToTop}

          aria-label="Go to top"

          title="Back to Top"

          className="
            group
            fixed
            bottom-6
            right-6
            z-50

            flex
            items-center
            justify-center

            w-16
            h-16

            rounded-3xl

            border
            border-cyan-500/20

            bg-gradient-to-br
            from-cyan-500
            via-blue-500
            to-violet-600

            shadow-[0_10px_40px_rgba(34,211,238,0.35)]

            backdrop-blur-xl

            transition-all
            duration-300

            hover:shadow-[0_10px_50px_rgba(139,92,246,0.45)]

            overflow-hidden
          "
        >

          {/* GLOW EFFECT */}

          <div
            className="
            absolute
            inset-0
            bg-white/10
            opacity-0
            group-hover:opacity-100
            transition
            duration-300
          "
          />

          {/* SPARKLE */}

          <Sparkles
            className="
            absolute
            top-2
            right-2
            w-3
            h-3
            text-white/70
            animate-pulse
          "
          />

          {/* ICON */}

          <ChevronUp
            size={28}
            className="
            relative
            z-10
            text-white
            group-hover:-translate-y-1
            transition-transform
            duration-300
          "
          />

          {/* RING */}

          <div
            className="
            absolute
            inset-0
            rounded-3xl
            border
            border-white/10
          "
          />

        </motion.button>
      )}

    </AnimatePresence>
  );
};

export default GoToTop;