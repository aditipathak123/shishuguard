import connectDB from "@/lib/connectDB";
import Baby from "@/app/models/Baby.model";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { noOfBabies, deliveryType, BabyDet } = body;

    // ✅ Authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ validation
    if (!noOfBabies || !deliveryType || !BabyDet) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ DB save
    const savedBabies = [];

    for (let baby of BabyDet) {
      const newBaby = await Baby.create({
        userId: decoded.id,
        name: baby.name,
        gender: baby.gender,
        dob: baby.dob,
        time: baby.time,
        weight: baby.weight,
        deliveryType,
      });

      savedBabies.push(newBaby);
    }

    return Response.json(
      {
        success: "Baby data saved in DB ✅",
        data: savedBabies,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Baby Save Error:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}