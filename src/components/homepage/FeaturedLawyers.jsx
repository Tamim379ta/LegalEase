import Link from "next/link";
import { featuredlawyers } from "@/lib/api/lawyers";
import LawyersCard from "../lawyer/LawyersCard";
import { ArrowRight } from "@gravity-ui/icons";
import FadeUp from "../shared/FadeInOnScroll";

const FeaturedLawyers = async () => {
  const featuredLawyersData = await featuredlawyers();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeUp className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Meet Our Featured Lawyers
        </h2>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Connect with top-rated legal experts dedicated to protecting your rights.
          Browse our selected specialists across corporate, family, and criminal law.
        </p>
      </FadeUp>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredLawyersData?.map((lawyer, index) => (
          <FadeUp key={lawyer.id || lawyer._id} delay={index * 0.12}>
            <LawyersCard lawyer={lawyer} />
          </FadeUp>
        ))}
      </div>

      {/* Button */}
      <FadeUp delay={0.4} className="mt-12 flex justify-center">
        <Link href="/lawyers">
          <button className="flex items-center gap-2 bg-[#1A2E44] text-white p-3 rounded-sm hover:bg-[#1A2E44]/90">
            See More Lawyers <ArrowRight className="mt-1" />
          </button>
        </Link>
      </FadeUp>
    </section>
  );
};

export default FeaturedLawyers;