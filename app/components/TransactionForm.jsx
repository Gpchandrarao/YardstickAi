"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

const schema = z.object({
  amount: z.number().positive(),
  date: z.string().nonempty(),
  description: z.string().nonempty(),
  category: z.string().nonempty(),
});

export default function TransactionForm({ onAdd }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    reset();
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("amount", { valueAsNumber: true })}
        placeholder="Amount"
        className="input"
      />
      <input {...register("date")} type="date" className="input" />
      <input
        {...register("description")}
        placeholder="Description"
        className="input"
      />

      <select {...register("category")} className="input">
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit" className="btn">
        Add Transaction
      </button>
    </form>
  );
}
