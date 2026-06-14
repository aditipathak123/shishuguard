import Feeding from "@/app/models/Feeding.model";

import connectDB from "@/lib/connectDB";

import { authenticateToken }
from "@/lib/auth";

// --------------------------------------------------
// GET FEEDINGS
// --------------------------------------------------

export async function GET(req) {

  try {

    await connectDB();

    const auth =
      await authenticateToken(req);

    console.log(
      "AUTH:",
      auth
    );

    if (
      !auth ||
      !auth.user ||
      !auth.user.id
    ) {

      return Response.json(

        {
          error:
            "Unauthorized",
        },

        {
          status: 401,
        }
      );
    }

    const userId =
      auth.user.id;

    const feeds =
      await Feeding.find({

        userId,
      })

      .sort({
        createdAt: -1,
      });

    return Response.json(

      {
        success: true,

        data: feeds,
      },

      {
        status: 200,
      }
    );

  } catch (error) {

    console.log(
      "GET FEED ERROR:"
    );

    console.log(error);

    return Response.json(

      {
        error:
          error.message,
      },

      {
        status: 500,
      }
    );
  }
}

// --------------------------------------------------
// ADD FEEDING
// --------------------------------------------------

export async function POST(req) {

  try {

    await connectDB();

    const auth =
      await authenticateToken(req);

    if (
      !auth ||
      !auth.user ||
      !auth.user.id
    ) {

      return Response.json(

        {
          error:
            "Unauthorized",
        },

        {
          status: 401,
        }
      );
    }

    const userId =
      auth.user.id;

    const body =
      await req.json();

    const {

      time,

      type,

      amount,

      notes,

    } = body;

    if (
      !time ||
      !type ||
      !amount
    ) {

      return Response.json(

        {
          error:
            "Missing fields",
        },

        {
          status: 400,
        }
      );
    }

    const newFeed =
      await Feeding.create({

        userId,

        time,

        type,

        amount:
          Number(amount),

        notes:
          notes || "",
      });

    return Response.json(

      {
        success: true,

        data: newFeed,
      },

      {
        status: 201,
      }
    );

  } catch (error) {

    console.log(
      "POST FEED ERROR:"
    );

    console.log(error);

    return Response.json(

      {
        error:
          error.message,
      },

      {
        status: 500,
      }
    );
  }
}