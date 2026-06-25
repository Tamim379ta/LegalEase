"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (<main className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-6"> <div className="text-center max-w-lg">

    {/* Icon */}
    <div className="flex justify-center mb-8">
      <div className="relative">
        <span className="text-[120px] leading-none select-none">⚖️</span>
        <span className="absolute -top-2 -right-4 text-4xl animate-bounce">
          💥
        </span>
      </div>
    </div>

    {/* 500 */}
    <h1 className="text-8xl font-black text-[#1A2E44] tracking-tight mb-2">
      500
    </h1>

    {/* Stamp */}
    <div className="inline-block px-4 py-1 border-2 border-dashed border-amber-400 rounded text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
      Case Interrupted
    </div>

    <p className="text-slate-500 text-base leading-relaxed mb-8">
      Something unexpected happened while processing your request.
      Our legal team is reviewing the case file. Please try again or
      return to the homepage.
    </p>

    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-xl bg-[#1A2E44] text-white text-sm font-semibold hover:bg-[#1A2E44]/90 transition-all cursor-pointer"
      >
        Try Again
      </button>

      <Link
        href="/"
        className="px-6 py-3 rounded-xl border border-[#814f30]/40 text-[#814f30] text-sm font-semibold hover:bg-[#814f30]/10 transition-all"
      >
        Back to Home
      </Link>
    </div>

    <p className="mt-10 text-xs text-slate-400">
      Error Reference: {error?.digest || "UNKNOWN"}
    </p>
  </div>
  </main>

  );
}
