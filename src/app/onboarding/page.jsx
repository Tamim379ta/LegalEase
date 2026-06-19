"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  // lawyer extra fields
  const [form, setForm] = useState({
    fullName: "",
    location: "",
    barCouncil: "",
    experience: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSubmit = () => {
    if (!role) return;
    setStep(2);
  };

  const handleFinish = async () => {
    setLoading(true);

    try {
      // 👇 send to backend
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          ...form,
          isOnboarded: true,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      // redirect based on role
      if (role === "client") {
        router.push("/dashboard/client");
      } else {
        router.push("/dashboard/lawyer");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1c2b] via-[#1A2E44] to-[#0d1117] px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl text-white">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Complete Your Profile
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Tell us more about you to continue
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <p className="mb-4 text-gray-300">I am a:</p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole("client")}
                className={`p-4 rounded-xl border transition ${role === "client"
                    ? "border-[#814f30] bg-[#814f30]/20"
                    : "border-white/10"
                  }`}
              >
                👤 Client
              </button>

              <button
                onClick={() => setRole("lawyer")}
                className={`p-4 rounded-xl border transition ${role === "lawyer"
                    ? "border-[#814f30] bg-[#814f30]/20"
                    : "border-white/10"
                  }`}
              >
                ⚖️ Lawyer
              </button>
            </div>

            <button
              onClick={handleRoleSubmit}
              className="mt-6 w-full h-12 rounded-xl bg-[#814f30] hover:bg-[#9a633c] transition font-semibold"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">

            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-xl bg-[#102235] border border-white/10 outline-none focus:border-[#814f30]"
            />

            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-xl bg-[#102235] border border-white/10 outline-none focus:border-[#814f30]"
            />

            {/* Lawyer-only fields */}
            {role === "lawyer" && (
              <>
                <input
                  name="barCouncil"
                  placeholder="Bar Council ID"
                  value={form.barCouncil}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl bg-[#102235] border border-white/10 outline-none focus:border-[#814f30]"
                />

                <input
                  name="experience"
                  placeholder="Years of Experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl bg-[#102235] border border-white/10 outline-none focus:border-[#814f30]"
                />

                <input
                  name="specialization"
                  placeholder="Specialization (e.g. Criminal Law)"
                  value={form.specialization}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl bg-[#102235] border border-white/10 outline-none focus:border-[#814f30]"
                />
              </>
            )}

            <button
              onClick={handleFinish}
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#814f30] hover:bg-[#9a633c] transition font-semibold"
            >
              {loading ? "Saving..." : "Finish Setup"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;