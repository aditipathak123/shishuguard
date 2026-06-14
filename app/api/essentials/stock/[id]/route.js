import Essentials from "@/app/models/Essentials.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const auth = await authenticateToken(req);
    const userId = auth?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await req.json();

    if (body.currentStock === undefined) {
      return NextResponse.json(
        { error: "Stock is required" },
        { status: 400 }
      );
    }

    const updatedItem = await Essentials.findOneAndUpdate(
      { _id: id, userId },
      {
        currentStock: Number(body.currentStock),
        lastUpdated: new Date()
      },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem);

  } catch (err) {
    console.log("Stock update error:", err);

    return NextResponse.json(
      { error: "Could not update stock" },
      { status: 500 }
    );
  }
}