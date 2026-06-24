import Link from 'next/link';
import Image from 'next/image';
import FadeUp from '../shared/FadeInOnScroll';

const CtaBanner = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative w-full rounded-3xl overflow-hidden min-h-[380px] flex items-center">

        {/* Background Image */}
        <Image
          src="/assets/cta.jpg"
          alt="CTA banner"
          fill
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0a121c]/70" />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-14 py-12">

          {/* Left */}
          <FadeUp className="max-w-xl">
            <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#c8956e] bg-[#814f30]/20 border border-[#814f30]/30">
              Get Started Today
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              Need Legal Help? <br />
              <span className="text-[#c8956e]">We've Got You Covered.</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Connect with a verified lawyer in minutes. No long waits,
              no confusion — just expert legal guidance when you need it most.
            </p>
          </FadeUp>

          {/* Right — CTAs */}
          <FadeUp delay={0.2} className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link
              href="/lawyers"
              className="px-8 py-3.5 rounded-xl bg-[#814f30] hover:bg-[#6b3f24] text-white text-sm font-bold transition-all text-center"
            >
              Browse Lawyers
            </Link>
            <Link
              href="/signUp"
              className="px-8 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white text-sm font-semibold border border-white/25 transition-all text-center"
            >
              Create Free Account
            </Link>
          </FadeUp>

        </div>
      </div>
    </section>
  );
};

export default CtaBanner;