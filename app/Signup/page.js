"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Baby,
  CalendarCheck,
  Eye,
  EyeOff,
  HeartHandshake,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Toaster, toast } from "sonner";

import { useAuth } from "../context/AuthContext";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    document.title = "Signup | ShishuGuard";
  }, []);

  const nameError = useMemo(() => {
    if (!name.trim()) return "Name is required";
    return "";
  }, [name]);

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

  const isFormValid = !nameError && !emailError && !passwordError;
  const careHighlights = [
    { icon: Baby, label: "Baby profile" },
    { icon: CalendarCheck, label: "Care routines" },
    { icon: ShieldCheck, label: "Private space" },
  ];

  const handleNext = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true });

    if (!isFormValid) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const data = res.data;

      if (res.status === 201) {
        login(data.token, data.newUser, false);
        toast.success(data.success || "Account created");
        router.push("/signupbaby");
      }
    } catch (err) {
      const backendError =
        err?.response?.data?.error || "Network error or unexpected problem.";
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-10 text-white">
      <Toaster richColors position="top-center" />
      <div className="auth-aurora pointer-events-none fixed inset-0 z-0" />
      <div className="auth-grid pointer-events-none fixed inset-0 z-0 opacity-45" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleNext}
          className="auth-card mx-auto w-full max-w-md rounded-[28px] border border-white/70 bg-white/[0.92] p-6 text-slate-950 shadow-2xl shadow-pink-900/20 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-cyan-400 shadow-xl shadow-pink-500/20">
              <HeartHandshake className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black sm:text-4xl">Create account</h1>
            <p className="mt-2 text-sm text-slate-600">
              Start your care space.
            </p>
          </div>

          <Field
            label="Parent name"
            icon={<UserRound className="h-5 w-5 text-pink-600" />}
            value={name}
            onChange={setName}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            placeholder="Your name"
            error={touched.name ? nameError : ""}
          />

          <Field
            label="Email"
            icon={<Mail className="h-5 w-5 text-cyan-600" />}
            value={email}
            onChange={setEmail}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            placeholder="parent@example.com"
            error={touched.email ? emailError : ""}
            type="email"
          />

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </span>
            <div className="form-field-focus flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
              <LockKeyhole className="h-5 w-5 text-violet-600" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, password: true }))
                }
                placeholder="Create password"
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

          <div className="mb-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
              <p className="text-sm leading-6 text-cyan-900">
                Private by default. Only your family care dashboard uses this.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="min-h-[50px] w-full rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(236,72,153,0.24)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="font-black text-cyan-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>

        <section className="hidden lg:block">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200/30 bg-pink-300/10 px-4 py-2 text-sm font-black text-pink-50 shadow-[0_12px_35px_rgba(236,72,153,0.15)]">
            <Sparkles className="h-4 w-4 text-yellow-200" />
            New family space
          </div>
          <h2 className="auth-title-glow max-w-xl text-5xl font-black leading-tight sm:text-6xl">
            Tiny details, beautifully saved.
          </h2>
          <p className="auth-copy-rise mt-5 max-w-lg text-lg leading-8 text-slate-200">
            Add your baby profile, then keep routines, reminders, and care
            details beautifully organized.
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
      </div>
    </main>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  type = "text",
}) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>
      <div className="form-field-focus flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
        {icon}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
        />
      </div>
      {error && (
        <p className="mt-2 text-sm font-black text-red-600">{error}</p>
      )}
    </label>
  );
}
