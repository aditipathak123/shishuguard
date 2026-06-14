import Essentials from "@/app/models/Essentials.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const connected = await connectDB();
    if (!connected) {
      return NextResponse.json(
        {
          error:
            "Database is unavailable. Check MongoDB Atlas IP whitelist or MONGO_URI.",
        },
        { status: 503 }
      );
    }

    const auth = await authenticateToken(req);
    const userId = auth?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await Essentials.find({ userId });

    return NextResponse.json(items);

  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const connected = await connectDB();
    if (!connected) {
      return NextResponse.json(
        {
          error:
            "Database is unavailable. Check MongoDB Atlas IP whitelist or MONGO_URI.",
        },
        { status: 503 }
      );
    }

    const auth = await authenticateToken(req);
    const userId = auth?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, category, currentStock, minThreshold, unit, notes } = body;

    if (!name || currentStock === "" || minThreshold === "") {
      return NextResponse.json(
        { error: "Name, current stock, and minimum threshold are required" },
        { status: 400 }
      );
    }

    const item = await Essentials.create({
      userId,
      name,
      category: category || "diapering",
      currentStock: Number(currentStock),
      minThreshold: Number(minThreshold),
      unit: unit || "pieces",
      notes: notes || "",
      lastUpdated: new Date(),
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to add inventory item" },
      { status: 500 }
    );
  }
}
