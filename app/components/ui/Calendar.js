"use client";

import React, {
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

export function Calendar({

  className = "",

  classNames = {},

  selected,

  onSelect,

  ...props

}) {

  // ---------------- INPUT STATE ----------------

  const [inputValue, setInputValue] =
    useState(
      selected
        ? formatDate(selected)
        : ""
    );

  // ---------------- FORMAT DATE ----------------

  function formatDate(date) {

    if (!date) return "";

    return new Date(date)
      .toISOString()
      .split("T")[0];
  }

  // ---------------- HANDLE INPUT ----------------

  const handleInputChange = (e) => {

    const value = e.target.value;

    setInputValue(value);

    const parsedDate =
      new Date(value);

    if (
      !isNaN(parsedDate)
    ) {

      onSelect?.(parsedDate);
    }
  };

  // ---------------- HANDLE CALENDAR SELECT ----------------

  const handleSelect = (date) => {

    onSelect?.(date);

    setInputValue(
      formatDate(date)
    );
  };

  // ---------------- JSX ----------------

  return (

    <div className="rounded-[32px] border border-gray-800 bg-gradient-to-br from-black via-gray-950 to-gray-900 p-6 shadow-2xl">

      {/* TOP INPUT */}

      <div className="mb-6">

        <label className="block text-sm font-medium text-gray-400 mb-3">

          Select or type date

        </label>

        <div className="relative">

          <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />

          <input
            type="date"
            value={inputValue}
            onChange={handleInputChange}
            className="
              w-full
              rounded-2xl
              border
              border-gray-700
              bg-gray-950
              py-3
              pl-12
              pr-4
              text-white
              outline-none
              transition-all
              duration-300
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
            "
          />

        </div>

      </div>

      {/* CALENDAR */}

      <DayPicker

        mode="single"

        selected={selected}

        onSelect={handleSelect}

        className={`text-white ${className}`}

        classNames={{

          // MONTH WRAPPER

          months:
            "flex flex-col gap-8",

          month:
            "space-y-6",

          // HEADER

          caption:
            "flex items-center justify-center relative",

          caption_label:
            "text-xl font-bold text-white",

          // NAV

          nav:
            "flex items-center gap-2",

          nav_button:
            `
            w-10
            h-10
            rounded-2xl
            border
            border-gray-700
            bg-gray-900
            hover:bg-cyan-500/10
            hover:border-cyan-500/30
            flex
            items-center
            justify-center
            transition-all
            duration-300
            `,

          nav_button_previous:
            "absolute left-0",

          nav_button_next:
            "absolute right-0",

          // TABLE

          table:
            "w-full border-collapse",

          head_row:
            "flex justify-between mb-4",

          head_cell:
            `
            w-10
            text-center
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-gray-500
            `,

          // ROW

          row:
            "flex justify-between mt-3",

          // CELL

          cell:
            "relative w-10 h-10 text-center",

          // DAY

          day:
            `
            w-10
            h-10
            rounded-2xl
            flex
            items-center
            justify-center
            text-sm
            font-medium
            transition-all
            duration-300
            hover:bg-cyan-500/20
            hover:text-cyan-300
            cursor-pointer
            `,

          // SELECTED

          day_selected:
            `
            bg-gradient-to-r
            from-cyan-500
            to-violet-500
            text-white
            shadow-lg
            shadow-cyan-500/30
            hover:opacity-90
            `,

          // TODAY

          day_today:
            `
            border
            border-cyan-500/40
            bg-cyan-500/10
            text-cyan-300
            `,

          // OUTSIDE

          day_outside:
            "text-gray-700 opacity-40",

          // DISABLED

          day_disabled:
            `
            text-gray-700
            opacity-30
            cursor-not-allowed
            `,

          // HIDDEN

          day_hidden:
            "invisible",

          ...classNames,
        }}

        components={{

          IconLeft: () => (

            <ChevronLeft className="w-5 h-5 text-gray-300" />

          ),

          IconRight: () => (

            <ChevronRight className="w-5 h-5 text-gray-300" />

          ),
        }}

        {...props}

      />

    </div>
  );
}