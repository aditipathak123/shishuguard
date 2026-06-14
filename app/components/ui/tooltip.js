"use client";

import React, { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Tooltip Provider and Primitives
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

// Tooltip Content
const TooltipContent = forwardRef((props, ref) => {
  const { className = "", sideOffset = 6, side = "top", ...rest } = props;

  return (
    <TooltipPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      className={`
        z-50 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 shadow-md max-w-xs
        ${className}
      `}
    >
      {props.children}
      <TooltipPrimitive.Arrow className="fill-white stroke-gray-300" width={10} height={5} />
    </TooltipPrimitive.Content>
  );
});

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
