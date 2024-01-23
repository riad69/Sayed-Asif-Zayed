import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Chart = ({ data }) => {
  const stepSize = 25;

  const customXAxisTicks = Array.from(
    { length: Math.ceil(data.length / stepSize) },
    (_, index) => {
      const start = index * stepSize + 1;
      const end = Math.min((index + 1) * stepSize, data.length);
      return `${start}-${end}`;
    }
  );

  const dealStatusCounts = Array.from(
    { length: Math.ceil(data.length / stepSize) },
    (_, index) => {
      const start = index * stepSize;
      const end = Math.min((index + 1) * stepSize, data.length);
      return data
        .slice(start, end)
        .reduce((count, item) => count + (item.deal_status === 1 ? 1 : 0), 0);
    }
  );

  const customYAxisTicks = [5, 10, 15, 20, 25];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={dealStatusCounts.map((count, index) => ({
          name: customXAxisTicks[index],
          count,
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis ticks={customYAxisTicks} />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
