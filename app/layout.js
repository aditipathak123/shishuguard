import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GoToTop from "./components/GoToTop";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AutoTaskProvider } from "./context/AutoTaskContext";
import AutoTaskManager from "./components/AutoTaskManager";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | ShishuGuard",
    default: "ShishuGuard - For Parents and Babies",
  },
  description:
    "Supporting parents through their baby's incredible first year with expert guidance, AI assistance, and a loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-screen flex flex-col min-h-screen overflow-x-hidden bg-[#020617] text-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <AuthProvider>
            <AutoTaskProvider>
              <NotificationProvider>

                <Navbar />

                <main className="flex-grow">
                  {children}
                </main>

                {/* SAFE RENDER (crash avoid) */}
                <AutoTaskManager />

                <Footer />
                <GoToTop />

              </NotificationProvider>
            </AutoTaskProvider>
          </AuthProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
