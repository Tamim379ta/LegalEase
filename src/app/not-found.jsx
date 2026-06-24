// app/not-found.jsx
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

        {/* Gavel icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <span className="text-[120px] leading-none select-none">⚖️</span>
            <span className="absolute -top-2 -right-4 text-4xl animate-bounce">❓</span>
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-black text-[#1A2E44] tracking-tight mb-2">
          404
        </h1>

        {/* Divider with stamp style */}
        <div className="inline-block px-4 py-1 border-2 border-dashed border-[#814f30] rounded text-[#814f30] text-xs font-bold uppercase tracking-widest mb-6">
          Case Not Found
        </div>

        <p className="text-slate-500 text-base leading-relaxed mb-8">
          The page you're looking for has been dismissed, moved, or never existed.
          Even the best lawyers couldn't find it.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#1A2E44] text-white text-sm font-semibold hover:bg-[#1A2E44]/90 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/lawyers"
            className="px-6 py-3 rounded-xl border border-[#814f30]/40 text-[#814f30] text-sm font-semibold hover:bg-[#814f30]/10 transition-all"
          >
            Browse Lawyers
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-slate-400">
          LegalEase &mdash; If you believe this is a mistake,{" "}
          <Link href="/contact" className="underline hover:text-[#814f30]">
            contact support
          </Link>
          .
        </p>

      </div>
    </div>
  );
};

export default NotFound;