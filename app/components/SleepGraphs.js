import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SleepGraphs = ({ logs }) => {
  const dataMap = {};

  logs.forEach(({ date, duration, type }) => {
    if (!date || !duration) return;
    const hrs = parseFloat(duration.replace(/[^0-9.]/g, ""));
    if (!dataMap[date]) dataMap[date] = { date, nap: 0, night: 0 };
    dataMap[date][type] += hrs;
  });

  const data = Object.values(dataMap).sort((a, b) => a.date.localeCompare(b.date));

  if (!data.length) return null;

  return (
    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
      <h3 className="font-semibold mb-4 text-purple-800">📊 Sleep Duration Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nap" fill="#fbbf24" name="Nap" />
          <Bar dataKey="night" fill="#6366f1" name="Night" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepGraphs;
