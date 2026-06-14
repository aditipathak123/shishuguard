import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Memory from "@/app/models/Memory.model";
import "@/app/models/User.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import { hasCloudinaryConfig, uploadImage } from "@/lib/cloudinary";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const allowedTypes = ["image/"];

// GET - Get public memories
export async function GET(request) {
  try {
    const isConnected = await connectDB();

    if (!isConnected) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 503 }
      );
    }

    const user = await authenticateToken(request);
    const userId = user?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user session. Please login again." },
        { status: 401 }
      );
    }

    const privateMemories = await Memory.find({ user: userId, isPublic: false })
      .sort({ createdAt: -1 })
      .lean();
    const publicMemories = await Memory.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ privateMemories, publicMemories });
  } catch (err) {
    console.error("Memory fetch error:", err);
    return NextResponse.json(
      {
        message: "Error fetching memories",
        error: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const isConnected = await connectDB();

    if (!isConnected) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const user = await authenticateToken(request);
    const userId = user?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user session. Please login again." },
        { status: 401 }
      );
    }

    const file = formData.get("file");
    const title = formData.get("title") || "";
    const description = formData.get("description") || "";
    const isPublic = formData.get("isPublic") === "true";
    const tags = String(formData.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    if (!hasCloudinaryConfig) {
      return NextResponse.json(
        { message: "Cloudinary upload is not configured" },
        { status: 500 }
      );
    }

    if (
      file.size > MAX_UPLOAD_SIZE ||
      !allowedTypes.some((type) => file.type?.startsWith(type))
    ) {
      return NextResponse.json(
        { message: "Only image uploads up to 10MB are allowed" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;
    const imageUrl = await uploadImage(dataUri);

    // Create and save memory
    const newMemory = new Memory({
      user: userId,
      title,
      description,
      isPublic,
      type: "image",
      file: imageUrl,
      tags,
      likes: [],
      comments: [],
    });

    await newMemory.save();

    return NextResponse.json(newMemory);
  } catch (err) {
    console.error("Memory upload error:", err);
    return NextResponse.json(
      { message: "Error uploading memory", error: err.message },
      { status: 500 }
    );
  }
}
