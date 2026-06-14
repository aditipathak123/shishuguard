"use client";

import {
  useState,
  useEffect,
} from "react";

// ---------------- BREAKPOINTS ----------------

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

// ---------------- HOOK ----------------

export function useIsMobile() {

  const [screenData, setScreenData] =
    useState({
      isMobile: false,
      isTablet: false,
      width: 0,
    });

  useEffect(() => {

    // update function
    const updateScreen = () => {

      const width = window.innerWidth;

      setScreenData({

        width,

        isMobile:
          width < BREAKPOINTS.mobile,

        isTablet:
          width >= BREAKPOINTS.mobile &&
          width < BREAKPOINTS.tablet,
      });
    };

    // initial run
    updateScreen();

    // listener
    window.addEventListener(
      "resize",
      updateScreen
    );

    // cleanup
    return () => {

      window.removeEventListener(
        "resize",
        updateScreen
      );
    };

  }, []);

  return screenData.isMobile;
}