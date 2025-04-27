"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const budgetSchema = z.object({
  category: z.string().min(1, "Select a category"),
  amount: z.number().min(1, "Amount must be greater than zero"),
  month: z.string().min(1, "Enter the month"),
});

export default function BudgetForm() {
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: "",
      amount: "",
      month: "",
    },
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        body: JSON.stringify({ ...data, amount: Number(data.amount) }),
      });
      if (res.ok) {
        toast.success("Budget saved!");
        reset();
      } else {
        toast.error("Failed to save budget");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Category</Label>
        <Select onValueChange={(val) => setValue("category", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Amount</Label>
        <Input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          placeholder="Enter amount"
        />
      </div>

      <div>
        <Label>Month</Label>
        <Input {...register("month")} placeholder="April 2025" />
      </div>

      <Button type="submit" className="w-full">
        Save Budget
      </Button>
    </form>
  );
}
