import { connectDB } from "../../../lib/mongodb";
import Budget from "../../../models/budget";

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return Response.json(budgets);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const budget = await Budget.create(data);
  return Response.json(budget);
}
