"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#D53F8C",
  "#805AD5",
];

export default function PieChartByCategory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const transactions = await res.json();
      const grouped = {};

      transactions.forEach(({ category, amount }) => {
        if (!category) category = "Uncategorized";
        grouped[category] = (grouped[category] || 0) + amount;
      });

      const chartData = Object.keys(grouped).map((cat) => ({
        name: cat,
        value: grouped[cat],
      }));

      setData(chartData);
    };
    fetchTransactions();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
