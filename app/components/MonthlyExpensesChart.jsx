"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export default function MonthlyExpensesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const transactions = await res.json();
      const grouped = {};

      transactions.forEach(({ date, amount }) => {
        const month = format(new Date(date), "yyyy-MM");
        grouped[month] = (grouped[month] || 0) + amount;
      });

      const chartData = Object.keys(grouped).map((month) => ({
        month,
        amount: grouped[month],
      }));

      setData(chartData);
    };
    fetchTransactions();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
