import Essentials from "@/app/models/Essentials.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

const dbUnavailable = () =>
  NextResponse.json(
    {
      error:
        "Database is unavailable. Check MongoDB Atlas IP whitelist or MONGO_URI.",
    },
    { status: 503 }
  );

export async function PUT(req, { params }) {
  try {
    const connected = await connectDB();
    if (!connected) return dbUnavailable();

    const auth = await authenticateToken(req);
    const userId = auth?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const update = {
      name: body.name,
      category: body.category,
      currentStock: Number(body.currentStock),
      minThreshold: Number(body.minThreshold),
      unit: body.unit,
      notes: body.notes || "",
      lastUpdated: new Date(),
    };

    const updatedItem = await Essentials.findOneAndUpdate(
      { _id: id, userId },
      update,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const connected = await connectDB();
    if (!connected) return dbUnavailable();

    const auth = await authenticateToken(req);
    const userId = auth?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const deletedItem = await Essentials.findOneAndDelete({ _id: id, userId });

    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete item" },
      { status: 500 }
    );
  }
}
