import React from "react";

const Sleepbadge = ({ logs }) => {
  const hasBadge = logs
    .slice(-3)
    .every((log) => log.type === "night" && log.duration);

  if (!hasBadge) return null;

  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-yellow-800 shadow-md text-center">
      <h3 className="text-lg font-semibold">🏆 My Baby Slept Through the Night!</h3>
      <p className="text-sm">Great job logging 3 consecutive night sleeps! 🌙</p>
    </div>
  );
};

export default Sleepbadge;