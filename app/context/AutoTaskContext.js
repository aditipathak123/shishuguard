"use client";

import { createContext, useContext, useState } from "react";

const AutoTaskContext = createContext();

export const AutoTaskProvider = ({ children }) => {
  const [isAutoTask, setAutoTask] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [updates, setUpdates] = useState([]);

  const handleUserInput = async ({ message, file }) => {
    try {
      setIsLoading(true);

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : "";

      const formData = new FormData();
      formData.append("message", message);
      formData.append("time", new Date().toISOString());

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/AutoTask", {
        method: "POST",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
        body: formData,
      });

      const result = await response.json();
      const resultList = Array.isArray(result) ? result : [result];

      setUpdates((prev) => [...prev, ...resultList]);
    } catch (err) {
      setUpdates((prev) => [
        ...prev,
        {
          request: "rejected",
          actionName: "error",
          isAction: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AutoTaskContext.Provider
      value={{
        isAutoTask,
        setAutoTask,
        handleUserInput,
        isLoading,
        updates,
        setUpdates,
      }}
    >
      {children}
    </AutoTaskContext.Provider>
  );
};

export const useAutoTask = () => {
  const context = useContext(AutoTaskContext);
  if (!context) {
    throw new Error("useAutoTask must be used inside AutoTaskProvider");
  }
  return context;
};
