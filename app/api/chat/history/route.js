import connectDB from "@/lib/connectDB";
import { authenticateToken } from "@/lib/auth";
import Chat from "@/app/models/Chat.model";

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const role = url.searchParams.get("role");

    const auth = await authenticateToken(req);

    if (!auth?.user?.id || !role) {
      return Response.json(
        { error: "Unauthorized or missing role" },
        { status: 401 }
      );
    }

    const userId = auth.user.id;

    const chat = await Chat.findOne({ userId, role });

    return Response.json({
      messages: chat?.messages || [],
    });

  } catch (err) {
    console.log("Chat History Error:", err);

    return Response.json(
      { error: "Server error while fetching chat history" },
      { status: 500 }
    );
  }
}