import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import Image from "@/app/models/Image.model";

export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();

    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { error: "No image found" },
        { status: 400 }
      );
    }

    // upload to cloudinary
    const imageUrl = await uploadImage(image);

    // save in mongodb
    const savedImage = await Image.create({
      imageUrl,
    });

    return NextResponse.json({
      success: true,
      url: savedImage.imageUrl,
    });

  } catch (error) {

    console.log("Upload Error:", error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}