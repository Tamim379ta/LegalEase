import Link from "next/link";
import Image from "next/image";

const FloatingIcon = ({ icon, style, reverse }) => (
  <div
    className={`absolute flex items-center justify-center w-[52px] h-[52px] rounded-2xl z-[15] pointer-events-none
      bg-[#814f30]/22 border border-[#c8956e]/30 text-[#c8956e] text-[22px]
      ${reverse ? "animate-float-reverse" : "animate-float"}`}
    style={style}
  >
    {icon}
  </div>
);

const HeroPage = () => {
  return (
    <section className="relative w-full h-150 md:h-170 flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/hero.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a121c]/65 z-10" />

     {/* Floating Icons */}
      <FloatingIcon
        icon="⚖️"
        style={{ top: "10%", left: "18%", animationDuration: "3.8s", animationDelay: "0s" }}
      />
      <FloatingIcon
        icon="🏛️"
        reverse
        style={{ top: "15%", right: "18%", animationDuration: "4.5s", animationDelay: "0.6s" }}
      />
      <FloatingIcon
        icon="💼"
        style={{ bottom: "20%", left: "18%", animationDuration: "4.2s", animationDelay: "1.1s" }}
      />
      <FloatingIcon
        icon="📜"
        reverse
        style={{ bottom: "15%", right: "18%", animationDuration: "3.6s", animationDelay: "0.3s" }}
      />
      <FloatingIcon
        icon="🔨"
        style={{ top: "50%", left: "16%", animationDuration: "5s", animationDelay: "0.9s", width: "44px", height: "44px", fontSize: "19px" }}
      />
      
      {/* Content */}
      <div className="relative z-20 max-w-3xl px-6">
        {/* Badge */}
        <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#c8956e] border border-[#814f30]/50 bg-[#814f30]/15 animate-fade-in-up [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards]">
          Trusted Legal Marketplace
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-tight mb-5 animate-fade-in-up [animation-delay:0.35s] opacity-0 [animation-fill-mode:forwards]">
          Find the Right Lawyer <br />
          for <span className="text-[#c8956e]">Every Case</span>
        </h1>

        {/* Paragraph */}
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto mb-8 animate-fade-in-up [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
          Connect with verified legal professionals across all practice areas.
          Get expert guidance, fast — without the hassle.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up [animation-delay:0.85s] opacity-0 [animation-fill-mode:forwards]">
          <Link
            href="/lawyers"
            className="px-7 py-3.5 rounded-xl bg-[#814f30] hover:bg-[#6b3f24] text-white text-sm font-bold transition-all"
          >
            Browse Lawyers
          </Link>
          <Link
            href="/how-it-works"
            className="px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white text-sm font-semibold border border-white/25 transition-all"
          >
            How It Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;