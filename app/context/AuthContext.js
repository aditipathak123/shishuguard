"use client";

import {

  createContext,

  useContext,

  useEffect,

  useState,

} from "react";

import { useRouter }
from "next/navigation";

// --------------------------------------------------
// CONTEXT
// --------------------------------------------------

const AuthContext =
  createContext();

// --------------------------------------------------
// PROVIDER
// --------------------------------------------------

export const AuthProvider = ({
  children,
}) => {

  // ---------------- STATES ----------------

  const [token, setToken] =
    useState("");

  const [user, setUser] =
    useState(null);

  const [isAuth, setIsAuth] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isMounted, setIsMounted] =
    useState(false);

  const router =
    useRouter();

  // --------------------------------------------------
  // LOAD USER + TOKEN
  // --------------------------------------------------

  useEffect(() => {

    setIsMounted(true);

    try {

      const storedToken =

        localStorage.getItem(
          "token"
        );

      const storedUser =

        localStorage.getItem(
          "user"
        );

      // ---------------- TOKEN ----------------

      if (
        storedToken &&
        storedToken !== "undefined"
      ) {

        setToken(storedToken);

        setIsAuth(true);

      } else {

        setToken("");

        setIsAuth(false);
      }

      // ---------------- USER ----------------

      if (
        storedUser &&
        storedUser !== "undefined"
      ) {

        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);

      } else {

        setUser(null);
      }

    } catch (error) {

      console.log(
        "AUTH LOAD ERROR:",
        error
      );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      setToken("");

      setUser(null);

      setIsAuth(false);
    }

    setIsLoading(false);

  }, []);

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const login = (
    newToken,
    userData,
    shouldRedirect = true
  ) => {

    try {

      // ---------------- SAVE TOKEN ----------------

      localStorage.setItem(
        "token",
        newToken
      );

      setToken(newToken);

      setIsAuth(true);

      // ---------------- SAVE USER ----------------

      if (userData) {

        localStorage.setItem(

          "user",

          JSON.stringify(userData)
        );

        setUser(userData);
      }

      // ---------------- REDIRECT ----------------

      if (shouldRedirect) {

        router.push("/");
      }

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );
    }
  };

  // --------------------------------------------------
  // UPDATE USER
  // --------------------------------------------------

  const updateUserData = (
    userData
  ) => {

    try {

      localStorage.setItem(

        "user",

        JSON.stringify(userData)
      );

      setUser(userData);

    } catch (error) {

      console.log(
        "UPDATE USER ERROR:",
        error
      );
    }
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken("");

    setUser(null);

    setIsAuth(false);

    router.push("/Login");
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (

    <AuthContext.Provider

      value={{

        token,

        user,

        isAuth,

        isLoading:
          isLoading || !isMounted,

        login,

        logout,

        updateUserData,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

// --------------------------------------------------
// HOOK
// --------------------------------------------------

export const useAuth = () =>
  useContext(AuthContext);