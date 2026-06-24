import BookingBtn from "@/components/lawyer/BookingBtn";
import { getLawyerById } from "@/lib/api/lawyers";
import { services } from "@/lib/api/services";
import Image from "next/image";
import Link from "next/link";

const LawyerDetailsPage = async ({ params }) => {
  const { id } = await params;

  const [lawyer, allServices] = await Promise.all([
    getLawyerById(id),
    services(),
  ])

  if (!lawyer) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold text-white">Profile Not Found</h2>
        <p className="text-gray-400">The requested lawyer profile does not exist or has been removed.</p>
        <Link
          href="/lawyers"
          className="rounded-xl bg-[#814F30] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#814F30]/80"
        >
          Back to Lawyers Directory
        </Link>
      </div>
    );
  }

  const currentLawyerId = lawyer.lawyerId || lawyer._id?.$oid || lawyer._id;
  const serviceFilter = allServices?.filter(s => s.lawyerId === currentLawyerId) || [];
  const { photoUrl, name, specialization, bio, fee, status } = lawyer;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/lawyers"
        className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#814F30]"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Directory
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

        <div className="flex flex-col gap-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#27405d] bg-[#1A2E44]">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={name}
                fill
                priority
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-medium uppercase tracking-wider text-gray-500">
                No Profile Photo
              </div>
            )}
          </div>

          {/* Action Box */}
          <div className="rounded-2xl border border-[#27405d] bg-[#1A2E44] p-5">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Consultation Fee</span>
                <p className="mt-1 text-2xl font-bold text-white">
                  ${fee ? fee.toLocaleString() : "0"}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#27405d]/50 pt-4">
                <span className="text-sm text-gray-400">Availability Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-md ${
                    status === "available"
                      ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"
                      : "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status === "available" ? "bg-emerald-400" : "bg-rose-400"}`} />
                  {status}
                </span>
              </div>

              <BookingBtn lawyer={lawyer} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col gap-6 rounded-2xl border border-[#27405d] bg-[#1A2E44] p-6 sm:p-8">
          <div>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {serviceFilter.length > 0 ? (
                serviceFilter.map((item) => (
                  <span
                    key={item._id?.$oid || item._id}
                    className="rounded-md border border-[#814F30]/30 bg-[#814F30]/10 px-2.5 py-0.5 text-xs font-medium text-[#d09a75] tracking-wide"
                  >
                    {item.specialization}
                  </span>
                ))
              ) : (
                <span className="rounded-md border border-[#814F30]/30 bg-[#814F30]/10 px-2.5 py-0.5 text-xs font-medium text-[#d09a75] tracking-wide">
                  {specialization || "General Practice"}
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Advocate {name}
            </h1>
          </div>

          <div className="border-t border-[#27405d]/50 pt-6">
            <h2 className="text-lg font-semibold text-white">Professional Biography</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-300 whitespace-pre-line">
              {bio || "No biography provided yet."}
            </p>
          </div>

          <div className="mt-auto border-t border-[#27405d]/50 pt-6">
            <div className="rounded-xl bg-[#102235]/40 p-4 border border-[#27405d]/30">
              <h3 className="text-sm font-medium text-white">Legal Notice & Disclaimer</h3>
              <p className="mt-1.5 text-xs text-gray-400 leading-normal">
                Scheduling a session here reserves an exploratory legal consultation space. Case representation rights and formal contract retainers are handled independently.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LawyerDetailsPage;