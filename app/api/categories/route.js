// app/api/budgets/route.js

import { connectDB } from "../../../lib/mongodb";
import Budget from "../../../models/budget";

export async function POST(req) {
  await connectDB();
  try {
    const { category, amount, month } = await req.json();
    const existingBudget = await Budget.findOne({ category, month });

    if (existingBudget) {
      existingBudget.amount = amount;
      await existingBudget.save();
      return Response.json(existingBudget);
    }

    const newBudget = await Budget.create({ category, amount, month });
    return Response.json(newBudget);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to save budget." }), {
      status: 500,
    });
  }
}

export async function GET() {
  await connectDB();
  try {
    const budgets = await Budget.find();
    return Response.json(budgets);
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch budgets." }),
      { status: 500 }
    );
  }
}
