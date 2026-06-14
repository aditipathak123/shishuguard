"use client";

import React, { createContext, forwardRef, useContext } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

// Context to pass variant and size
const ToggleGroupContext = createContext({
  size: "default",
  variant: "default",
});

const ToggleGroup = forwardRef(
  ({ className = "", variant, size, type = "single", children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type={type}
      className={`flex items-center justify-center gap-1 ${className}`}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
);


ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = forwardRef(({ className = "", children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  const appliedVariant = context.variant || variant;
  const appliedSize = context.size || size;

  // You can define basic Tailwind styles for different variants/sizes here
  let baseClasses = "border rounded px-3 py-1 text-sm";
  let sizeClasses = "";
  let variantClasses = "";

  switch (appliedSize) {
    case "sm":
      sizeClasses = "text-xs px-2 py-1";
      break;
    case "lg":
      sizeClasses = "text-base px-4 py-2";
      break;
    default:
      sizeClasses = "text-sm px-3 py-1";
  }

  switch (appliedVariant) {
    case "outline":
      variantClasses = "border-gray-300 text-gray-700 hover:bg-gray-100";
      break;
    case "solid":
      variantClasses = "bg-gray-800 text-white hover:bg-gray-700";
      break;
    default:
      variantClasses = "border-gray-200 text-black hover:bg-gray-100";
  }

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
