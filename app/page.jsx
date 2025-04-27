"use client";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyExpensesChart from "./components/MonthlyExpensesChart";
import PieChartByCategory from "./components/PieChartByCategory";

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
      <TransactionForm onAdd={() => location.reload()} />
      <TransactionList />
      <MonthlyExpensesChart />
      <h2 className="text-xl font-semibold">Category Breakdown</h2>
      <PieChartByCategory />
    </div>
  );
}
