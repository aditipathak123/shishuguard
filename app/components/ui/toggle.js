"use client";

import React, {
  forwardRef,
} from "react";

import * as TogglePrimitive
  from "@radix-ui/react-toggle";

// ---------------- VARIANTS ----------------

const variantStyles = {

  default:
    `
    bg-gray-900
    border border-gray-800
    text-gray-300

    hover:bg-gray-800
    hover:border-cyan-500/30
    hover:text-white

    data-[state=on]:bg-gradient-to-r
    data-[state=on]:from-cyan-500
    data-[state=on]:to-violet-500

    data-[state=on]:text-white
    data-[state=on]:border-transparent
    data-[state=on]:shadow-lg
    data-[state=on]:shadow-cyan-500/20
  `,

  outline:
    `
    bg-transparent
    border border-gray-700
    text-gray-400

    hover:bg-gray-900
    hover:text-white
    hover:border-cyan-500/40

    data-[state=on]:bg-cyan-500/10
    data-[state=on]:text-cyan-300
    data-[state=on]:border-cyan-500/30
  `,

  neon:
    `
    bg-black
    border border-cyan-500/20
    text-cyan-300

    hover:bg-cyan-500/10
    hover:border-cyan-500/50

    data-[state=on]:bg-gradient-to-r
    data-[state=on]:from-cyan-500
    data-[state=on]:to-blue-500

    data-[state=on]:text-white
    data-[state=on]:shadow-[0_0_20px_rgba(34,211,238,0.35)]
  `,

  glass:
    `
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    text-gray-200

    hover:bg-white/10

    data-[state=on]:bg-white/15
    data-[state=on]:text-white
    data-[state=on]:border-white/20
  `,
};

// ---------------- SIZES ----------------

const sizeStyles = {

  sm:
    `
    h-9
    min-w-9
    px-3
    text-xs
    rounded-xl
  `,

  default:
    `
    h-11
    min-w-11
    px-4
    text-sm
    rounded-2xl
  `,

  lg:
    `
    h-14
    min-w-14
    px-6
    text-base
    rounded-2xl
  `,
};

// ---------------- COMPONENT ----------------

const Toggle = forwardRef(

  (
    {

      className = "",

      variant = "default",

      size = "default",

      children,

      ...props

    },

    ref

  ) => {

    const baseClasses = `

      inline-flex
      items-center
      justify-center
      gap-2

      font-semibold
      tracking-wide

      transition-all
      duration-300

      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-cyan-500/40

      disabled:pointer-events-none
      disabled:opacity-50

      hover:scale-105
      active:scale-95

      [&_svg]:pointer-events-none
      [&_svg]:size-4
      [&_svg]:shrink-0
    `;

    const variantClass =
      variantStyles[variant] ||
      variantStyles.default;

    const sizeClass =
      sizeStyles[size] ||
      sizeStyles.default;

    return (

      <TogglePrimitive.Root

        ref={ref}

        className={`
          ${baseClasses}
          ${variantClass}
          ${sizeClass}
          ${className}
        `}

        {...props}

      >

        {children}

      </TogglePrimitive.Root>

    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };