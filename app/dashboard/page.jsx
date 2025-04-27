"use client";

import { useEffect, useState } from "react";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        const total = data.reduce((acc, tx) => acc + tx.amount, 0);
        setTotalSpent(total);

        const grouped = data.reduce((acc, tx) => {
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          return acc;
        }, {});

        const formattedData = Object.entries(grouped).map(
          ([category, amount]) => ({
            name: category,
            value: amount,
          })
        );

        setCategoryData(formattedData);
      });

    fetch("/api/budgets")
      .then((res) => res.json())
      .then((data) => setBudgets(data));
  }, []);

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#00c49f",
    "#ffbb28",
    "#ff8042",
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Expenses Card */}
        <Card className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white shadow-xl">
          <CardHeader>
            <CardTitle>Total Spent This Month</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            ₹ {totalSpent.toFixed(2)}
          </CardContent>
        </Card>

        {/* Category Breakdown Pie Chart */}
        <Card className="col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Expenses Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <BudgetComparisonChart />
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx._id}>
                  <td className="py-2 px-4 border-b">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{tx.description}</td>
                  <td className="py-2 px-4 border-b">{tx.category}</td>
                  <td className="py-2 px-4 border-b">
                    ₹ {tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
