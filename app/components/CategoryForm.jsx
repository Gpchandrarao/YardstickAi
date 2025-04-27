"use client";
import { useForm } from "react-hook-form";

export default function CategoryForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name")}
        placeholder="New Category"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        Add Category
      </button>
    </form>
  );
}
