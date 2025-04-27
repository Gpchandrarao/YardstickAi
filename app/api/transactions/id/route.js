import { connectDB } from "../../../../lib/mongodb";

import { Transaction } from "../../../../models/transaction";

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const transaction = await Transaction.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return Response.json(transaction);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);
  return Response.json({ message: "Transaction deleted" });
}
