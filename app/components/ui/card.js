"use client";

import React from "react";

const cardBase =
  "rounded-2xl bg-[#020617] text-gray-200 border border-[#1e293b] transition-all duration-300";

const cardHover =
  "hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10";

const Card = React.forwardRef(({ className = "", ...props }, ref) => (
  <section
    ref={ref}
    className={`${cardBase} ${cardHover} ${className}`}
    {...props}
  />
));
Card.displayName = "UICard";

const CardHeader = React.forwardRef(({ className = "", ...props }, ref) => (
  <header
    ref={ref}
    className={`flex flex-col gap-1 px-5 pt-5 pb-3 ${className}`}
    {...props}
  />
));
CardHeader.displayName = "UICardHeader";

const CardTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg md:text-xl font-semibold text-white tracking-wide ${className}`}
    {...props}
  />
));
CardTitle.displayName = "UICardTitle";

const CardDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-gray-400 leading-relaxed ${className}`}
      {...props}
    />
  )
);
CardDescription.displayName = "UICardDescription";

const CardContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`px-5 pb-5 text-sm text-gray-300 ${className}`}
    {...props}
  />
));
CardContent.displayName = "UICardContent";

const CardFooter = React.forwardRef(({ className = "", ...props }, ref) => (
  <footer
    ref={ref}
    className={`flex items-center justify-between px-5 pb-5 pt-2 ${className}`}
    {...props}
  />
));
CardFooter.displayName = "UICardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};