import React from "react";

// ---------------- VARIANTS ----------------

const variantClasses = {

  default:
    "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/20 shadow-lg shadow-cyan-500/20",

  secondary:
    "bg-gray-900 text-gray-200 border border-gray-700 hover:border-gray-600",

  success:
    "bg-gradient-to-r from-emerald-500 to-green-500 text-white border border-emerald-400/20 shadow-lg shadow-emerald-500/20",

  danger:
    "bg-gradient-to-r from-rose-500 to-red-500 text-white border border-rose-400/20 shadow-lg shadow-rose-500/20",

  warning:
    "bg-gradient-to-r from-orange-400 to-yellow-500 text-white border border-orange-300/20 shadow-lg shadow-orange-500/20",

  purple:
    "bg-gradient-to-r from-violet-500 to-purple-500 text-white border border-violet-400/20 shadow-lg shadow-violet-500/20",

  outline:
    "border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-900",

  glass:
    "bg-white/10 backdrop-blur-md border border-white/10 text-white",

  neon:
    "bg-black text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.35)]",
};

// ---------------- SIZES ----------------

const sizeClasses = {

  sm:
    "px-3 py-1 text-[10px]",

  md:
    "px-4 py-1.5 text-xs",

  lg:
    "px-5 py-2 text-sm",
};

// ---------------- COMPONENT ----------------

function Badge({

  children,

  className = "",

  variant = "default",

  size = "md",

  rounded = "full",

  icon = null,

  ...props

}) {

  const baseClasses =
    "inline-flex items-center gap-2 font-semibold tracking-wide transition-all duration-300 hover:scale-105";

  const roundedClass =
    rounded === "full"
      ? "rounded-full"
      : "rounded-2xl";

  const finalClasses = `
    ${baseClasses}
    ${roundedClass}
    ${variantClasses[variant] || variantClasses.default}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  return (

    <span
      className={finalClasses}
      {...props}
    >

      {icon && (
        <span className="flex items-center">
          {icon}
        </span>
      )}

      {children}

    </span>
  );
}

export default Badge;