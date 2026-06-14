"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import LoginPrompt from "../components/LoginPrompt";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

export default function DashboardPage() {
  const { isAuth, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard |  ShishuGuard";
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  if (!isAuth) {
    return <LoginPrompt sectionName="dashboard" />;
  }

  return <DashboardLayout />;
}


