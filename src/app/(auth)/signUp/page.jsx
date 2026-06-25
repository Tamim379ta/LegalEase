"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, Button, TextField, Label, Input, FieldError } from "@heroui/react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const { email, password, name } = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email, 
      password, 
      name, 
    });

    if(data) {
      toast.success("Account created successfully");
      router.push("/onboarding");
    }
    else {
      toast.error("Something went wrong");
    }

  };
  const handleGoogleSignIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/onboarding",
  });
};

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0e345c] px-4">
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#814f30]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1A2E44]/50 rounded-full blur-[120px] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-[#2A486A]/50 bg-[#1F3752]/60 backdrop-blur-xl p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#814f30]/30 bg-[#814f30]/10">
            <FaUser className="text-xl text-[#814f30]" />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Sign up to get started
          </p>
        </div>

        {/* Form Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Full Name Field */}
          <TextField name="name" type="text" isRequired className="w-full flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-200">Full Name</Label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-4 text-slate-400 pointer-events-none" size={14} />
              <Input
                placeholder="John Doe"
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#1A2E44]/80 border border-[#2A486A] text-white placeholder:text-slate-500 transition-colors hover:border-[#814f30]/60 focus:border-[#814f30] focus:outline-none"
              />
            </div>
            <FieldError className="text-xs text-red-400 mt-0.5" />
          </TextField>

          {/* Email Field */}
          <TextField name="email" type="email" isRequired className="w-full flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-200">Email Address</Label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-slate-400 pointer-events-none" size={14} />
              <Input
                placeholder="you@example.com"
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#1A2E44]/80 border border-[#2A486A] text-white placeholder:text-slate-500 transition-colors hover:border-[#814f30]/60 focus:border-[#814f30] focus:outline-none"
              />
            </div>
            <FieldError className="text-xs text-red-400 mt-0.5" />
          </TextField>

          {/* Password Field */}
          <TextField name="password" isRequired className="w-full flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-200">Password</Label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-slate-400 pointer-events-none" size={14} />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-11 pl-11 pr-12 rounded-xl bg-[#1A2E44]/80 border border-[#2A486A] text-white placeholder:text-slate-500 transition-colors hover:border-[#814f30]/60 focus:border-[#814f30] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 text-slate-400 transition-colors hover:text-white focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
            <FieldError className="text-xs text-red-400 mt-0.5" />
          </TextField>


          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={loading}
            className="mt-3 h-11 w-full rounded-xl bg-[#814f30] font-semibold text-white shadow-lg shadow-[#814f30]/20 transition-all active:scale-[0.98] hover:bg-[#9c633f]"
          >
            Sign Up
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-500/20" />
          <span className="px-3 text-xs font-medium text-slate-500 tracking-wider">OR</span>
          <div className="h-px flex-1 bg-slate-500/20" />
        </div>
<button
  type="button"
  onClick={handleGoogleSignIn}
  className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-[#2A486A] bg-[#1A2E44]/80 text-sm font-medium text-white transition-all hover:border-[#814f30]/60 hover:bg-[#1A2E44] active:scale-[0.98]"
>
  <img src="https://www.google.com/favicon.ico" className="h-4 w-4" />
  Continue with Google
</button>
        {/* Footer */}
        <p className="text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link
            href="/signIn"
            className="font-semibold text-[#814f30] hover:text-[#9c633f] underline underline-offset-4 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;