import jwt from "jsonwebtoken";

// --------------------------------------------------
// VERIFY AUTH TOKEN
// --------------------------------------------------

export const authenticateToken =
  async (req) => {

    try {

      // ---------------- GET AUTH HEADER ----------------

      const authHeader =

        req.headers.get(
          "authorization"
        );

      // ---------------- CHECK HEADER ----------------

      if (!authHeader) {

        console.log(
          "No Authorization Header"
        );

        return null;
      }

      // ---------------- CHECK BEARER ----------------

      if (
        !authHeader.startsWith(
          "Bearer "
        )
      ) {

        console.log(
          "Invalid Bearer Format"
        );

        return null;
      }

      // ---------------- EXTRACT TOKEN ----------------

      const token =
        authHeader.split(" ")[1];

      if (!token) {

        console.log(
          "Token Missing"
        );

        return null;
      }

      // ---------------- VERIFY TOKEN ----------------

      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET
        );

      // ---------------- RETURN USER ----------------

      return {

        user: {

          id: decoded.id,

          email:
            decoded.email,
        },
      };

    } catch (error) {

      console.log(
        "AUTH ERROR:",
        error.message
      );

      return null;
    }
  };