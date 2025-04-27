"use client";

import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function BudgetComparisonChart() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then(setBudgets);
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  const data = budgets.map((budget) => {
    const actualSpent = transactions
      .filter(
        (tx) =>
          tx.category === budget.category &&
          tx.date.includes(budget.month.split(" ")[0])
      )
      .reduce((acc, tx) => acc + tx.amount, 0);
    return {
      category: budget.category,
      budgeted: budget.amount,
      spent: actualSpent,
    };
  });

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgeted" fill="#8884d8" />
          <Bar dataKey="spent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
