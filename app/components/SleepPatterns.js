import React, { useMemo } from "react";

const SleepPatterns = ({ logs }) => {
  const napTimes = useMemo(() => {
    const map = {};
    logs.forEach(({ time, type }) => {
      if (type === "nap" && time) {
        const hour = parseInt(time.split(":")[0]);
        map[hour] = (map[hour] || 0) + 1;
      }
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  }, [logs]);

  if (!napTimes) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800">
      <h3 className="font-semibold">🔁 Recurring Nap Pattern</h3>
      <p className="text-sm">Your baby often naps around <strong>{napTimes}:00</strong> hrs.</p>
    </div>
  );
};

export default SleepPatterns;