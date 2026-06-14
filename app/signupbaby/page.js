"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Baby, CalendarDays, Clock, HeartPulse, Scale, ShieldCheck } from "lucide-react";
import { Toaster, toast } from "sonner";

import { useAuth } from "../context/AuthContext";

export default function BabySetupPage() {
  const router = useRouter();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    deliveryType: "",
    babies: [
      {
        name: "",
        gender: "",
        dob: "",
        time: "",
        weight: "",
      },
    ],
  });

  const isFormValid = useMemo(() => {
    if (!formData.deliveryType) return false;
    return formData.babies.every(
      (baby) => baby.name && baby.gender && baby.dob && baby.time && baby.weight
    );
  }, [formData]);

  const updateBabyField = (index, field, value) => {
    const updated = [...formData.babies];
    updated[index][field] = value;
    setFormData({ ...formData, babies: updated });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        noOfBabies: formData.babies.length,
        deliveryType: formData.deliveryType,
        BabyDet: formData.babies,
      };

      const res = await axios.post("/api/baby/create", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Baby details saved successfully");
        router.push("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] px-4 py-10 text-white">
      <Toaster richColors position="top-center" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(236,72,153,0.20),transparent_30%),linear-gradient(135deg,#020617,#111827_48%,#020617)]" />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1fr]">
        <section className="hidden lg:block">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Baby className="h-4 w-4" />
            Final setup
          </div>
          <h1 className="max-w-xl text-6xl font-black leading-tight">
            Personalize ShishuGuard for your baby.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
            These details help tailor reminders, growth tracking, and dashboard
            insights for your family.
          </p>
          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
            {["Growth context", "Care reminders", "Safe profile"].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-gray-100"
              >
                <ShieldCheck className="mb-3 h-5 w-5 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-xl rounded-[34px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl backdrop-blur sm:p-8"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 to-pink-500 shadow-xl">
              <Baby className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-black">Baby Details</h2>
            <p className="mt-2 text-sm text-gray-300">
              Create the first baby profile for smarter care tools
            </p>
          </div>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-bold text-gray-200">
              Delivery type
            </span>
            <select
              value={formData.deliveryType}
              onChange={(event) =>
                setFormData({ ...formData, deliveryType: event.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white outline-none"
            >
              <option value="">Select Delivery Type</option>
              <option value="Normal">Normal</option>
              <option value="C-Section">C-Section</option>
            </select>
          </label>

          {formData.babies.map((baby, index) => (
            <div
              key={index}
              className="mb-5 rounded-3xl border border-white/10 bg-gray-950/70 p-4"
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-black text-cyan-100">
                <HeartPulse className="h-4 w-4" />
                Baby Profile {index + 1}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ProfileInput
                  icon={<Baby className="h-4 w-4 text-pink-300" />}
                  type="text"
                  placeholder="Baby Name"
                  value={baby.name}
                  onChange={(value) => updateBabyField(index, "name", value)}
                />
                <select
                  value={baby.gender}
                  onChange={(event) =>
                    updateBabyField(index, "gender", event.target.value)
                  }
                  className="rounded-2xl border border-white/10 bg-gray-900 px-4 py-3 text-white outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>
                </select>
                <ProfileInput
                  icon={<CalendarDays className="h-4 w-4 text-cyan-300" />}
                  type="date"
                  value={baby.dob}
                  onChange={(value) => updateBabyField(index, "dob", value)}
                />
                <ProfileInput
                  icon={<Clock className="h-4 w-4 text-violet-300" />}
                  type="time"
                  value={baby.time}
                  onChange={(value) => updateBabyField(index, "time", value)}
                />
                <div className="sm:col-span-2">
                  <ProfileInput
                    icon={<Scale className="h-4 w-4 text-emerald-300" />}
                    type="number"
                    placeholder="Weight (kg)"
                    value={baby.weight}
                    onChange={(value) =>
                      updateBabyField(index, "weight", value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={!isFormValid}
            className="min-h-[50px] w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(236,72,153,0.24)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Complete Setup
          </button>
        </form>
      </div>
    </main>
  );
}

function ProfileInput({ icon, value, onChange, type, placeholder }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gray-900 px-4 py-3">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
      />
    </div>
  );
}
