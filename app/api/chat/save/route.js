import connectDB from "@/lib/connectDB";

import { authenticateToken } from "@/lib/auth";

import Chat from "@/app/models/Chat.model";

// --------------------------------------------------
// SAVE CHAT API
// --------------------------------------------------

export async function POST(req) {

  try {

    // ---------------- CONNECT DB ----------------

    await connectDB();

    // ---------------- AUTH ----------------

    const auth =
      await authenticateToken(req);

    if (!auth?.user?.id) {

      return Response.json(

        {
          error: "Unauthorized",
        },

        {
          status: 401,
        }
      );
    }

    // ---------------- GET BODY ----------------

    const body =
      await req.json();

    const {
      messages,
      role,
    } = body;

    // ---------------- VALIDATION ----------------

    if (
      !messages ||
      !Array.isArray(messages) ||
      !role
    ) {

      return Response.json(

        {
          error:
            "Messages and role are required",
        },

        {
          status: 400,
        }
      );
    }

    // ---------------- VALID ROLE ----------------

    const validRoles = [

      "mother",

      "baby",

      "pediatrician",
    ];

    const finalRole =
      validRoles.includes(role)

        ? role

        : "mother";

    // ---------------- USER ID ----------------

    const userId =
      auth.user.id;

    // ---------------- FIND OLD CHAT ----------------

    let existingChat =
      await Chat.findOne({

        userId,

        role: finalRole,
      });

    // ---------------- CREATE NEW CHAT ----------------

    if (!existingChat) {

      existingChat =
        new Chat({

          userId,

          role: finalRole,

          messages: [],
        });
    }

    // ---------------- SAVE ALL MESSAGES ----------------

    existingChat.messages =
      messages;

    await existingChat.save();

    // ---------------- SUCCESS RESPONSE ----------------

    return Response.json(

      {
        success: true,

        message:
          "Chat saved successfully",

        chat: existingChat,
      },

      {
        status: 201,
      }
    );

  } catch (error) {

    console.log(
      "CHAT SAVE ERROR:",
      error
    );

    return Response.json(

      {
        error:
          "Failed to save chat",
      },

      {
        status: 500,
      }
    );
  }
}