import React from "react";

const Input = React.forwardRef(

  (
    {

      className = "",

      type = "text",

      ...props

    },

    ref

  ) => {

    const baseClasses = `

      w-full

      rounded-2xl

      border
      border-gray-700

      bg-gradient-to-br
      from-gray-950
      via-gray-900
      to-black

      px-4
      py-3

      text-white
      text-sm
      sm:text-base

      placeholder:text-gray-500

      shadow-lg

      outline-none

      transition-all
      duration-300

      focus:border-cyan-500
      focus:ring-2
      focus:ring-cyan-500/20

      hover:border-cyan-500/30

      disabled:cursor-not-allowed
      disabled:opacity-50

      min-h-[46px]
    `;

    return (

      <input

        type={type}

        ref={ref}

        className={`
          ${baseClasses}
          ${className}
        `}

        {...props}

      />

    );
  }
);

Input.displayName = "Input";

export default Input;
