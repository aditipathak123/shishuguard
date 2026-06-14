import User from "@/app/models/User.model";
import connectDB from "@/lib/connectDB";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Validate input fields
const checkCredentials = (email, password) => {
  if (!email || !password) {
    return "Email and password are required";
  }
  return null;
};

// 🔹 Create JWT token
const createAuthToken = (userData) => {
  return jwt.sign(
    {
      id: userData._id,
      email: userData.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export async function POST(req) {
  await connectDB();

  try {
    const requestData = await req.json();
    const email = requestData.email?.toLowerCase();
    const password = requestData.password;

    // ✅ Step 1: Validation
    const errorMsg = checkCredentials(email, password);
    if (errorMsg) {
      return Response.json(
        { error: errorMsg },
        { status: 400 }
      );
    }

    // ✅ Step 2: Find user
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return Response.json(
        { error: "User not found. Please signup first." },
        { status: 404 }
      );
    }

    // ✅ Step 3: Verify password
    const passwordMatch = await bcryptjs.compare(
      password,
      foundUser.password
    );

    if (!passwordMatch) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Step 4: Generate token
    const token = createAuthToken(foundUser);

    // ✅ Step 5: Safe user object
    const safeUser = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    // ⚠️ SAME RESPONSE STRUCTURE (important)
    return Response.json(
      {
        success: true,
        message: "Login successful",
        user: safeUser,
        token,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}