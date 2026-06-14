"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";

const toneStyles = {
  primary:
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 shadow-md",

  soft:
    "bg-[#111827] text-gray-200 border border-[#1f2937] hover:bg-[#1f2937]",

  outline:
    "border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white",

  text:
    "text-gray-400 hover:text-white hover:bg-[#1a1a2e]",
};

const sizeStyles = {
  md: "h-10 px-5 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-7 text-base",
  square: "h-10 w-10",
};

const baseStyle =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";

const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    const finalClass = [
      baseStyle,
      toneStyles[variant] || toneStyles.primary,
      sizeStyles[size] || sizeStyles.md,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref} className={finalClass} {...props}>
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;