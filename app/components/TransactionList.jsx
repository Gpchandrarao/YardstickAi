"use client";
import { useEffect, useState } from "react";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-4 mt-6">
      {transactions.map((t) => (
        <div key={t._id} className="border p-4 rounded shadow">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">${t.amount}</p>
              <p className="text-gray-500">{t.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(t.date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm">{t.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
