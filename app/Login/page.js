"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Baby,
  BellRing,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../context/AuthContext";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    document.title = "Login | ShishuGuard";
  }, []);

  const emailError = useMemo(() => {
    if (!email.trim()) return "Email is required";
    if (!isValidEmail(email)) return "Enter a valid email";
    return "";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Minimum 6 characters";
    return "";
  }, [password]);

  const isFormValid = !emailError && !passwordError;
  const careHighlights = [
    { icon: ShieldCheck, label: "Private records" },
    { icon: BellRing, label: "Daily reminders" },
    { icon: Baby, label: "Baby timeline" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (!isFormValid) {
      toast.error("Fix form errors first");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", { email, password });
      const data = res.data;

      if (res.status === 200 && data.success) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        login(data.token, data.user, false);
        toast.success(data.message || "Login successful");
        setTimeout(() => router.push("/"), 700);
      }
    } catch (err) {
      const msg = err?.response?.data?.error || "Login failed";
      toast.error(msg.includes("Invalid credentials") ? "Wrong password" : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-10 text-white">
      <ToastContainer position="top-center" />

      <div className="auth-aurora pointer-events-none fixed inset-0 z-0" />
      <div className="auth-grid pointer-events-none fixed inset-0 z-0 opacity-45" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden lg:block">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-50 shadow-[0_12px_35px_rgba(34,211,238,0.15)]">
            <Sparkles className="h-4 w-4 text-yellow-200" />
            Welcome back
          </div>
          <h1 className="auth-title-glow max-w-xl text-5xl font-black leading-tight sm:text-6xl">
            Care, made calmer.
          </h1>
          <p className="auth-copy-rise mt-5 max-w-lg text-lg leading-8 text-slate-200">
            Sign in to view baby logs, reminders, memories, and daily care in
            one peaceful space.
          </p>

          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
            {careHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="auth-float rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm font-bold text-gray-100 shadow-2xl backdrop-blur"
                  style={{ animationDelay: `${index * 0.22}s` }}
                >
                  <Icon className="mb-3 h-5 w-5 text-emerald-300" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="auth-card mx-auto w-full max-w-md rounded-[28px] border border-white/70 bg-white/[0.92] p-6 text-slate-950 shadow-2xl shadow-pink-900/20 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-pink-500 shadow-xl shadow-cyan-500/20">
              <LockKeyhole className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-slate-600">
              Your care space awaits.
            </p>
          </div>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Email
            </span>
            <div className="form-field-focus flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
              <Mail className="h-5 w-5 text-cyan-600" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                placeholder="parent@example.com"
                className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
              />
            </div>
            {touched.email && emailError && (
              <p className="mt-2 text-sm font-black text-red-600">
                {emailError}
              </p>
            )}
          </label>

          <label className="mb-6 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </span>
            <div className="form-field-focus flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-100">
              <LockKeyhole className="h-5 w-5 text-pink-600" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, password: true }))
                }
                placeholder="Enter password"
                className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 transition hover:text-slate-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {touched.password && passwordError && (
              <p className="mt-2 text-sm font-black text-red-600">
                {passwordError}
              </p>
            )}
          </label>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="min-h-[50px] w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-pink-500 px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(14,165,233,0.28)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            New to ShishuGuard?{" "}
            <Link
              href="/Signup"
              className="font-black text-cyan-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
