import User from "@/app/models/User.model";
import connectDB from "@/lib/connectDB";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // ✅ DB connect
    await connectDB();

    // ✅ get body
    const body = await req.json();
    const { name, email, password } = body;

    // ✅ validation
    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // ✅ check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return Response.json(
        { error: "User already exists. Please login." },
        { status: 409 }
      );
    }

    // ✅ hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // ✅ create user
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // ✅ generate token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ safe response (no password)
    return Response.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
