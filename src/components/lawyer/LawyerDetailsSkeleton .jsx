
const LawyerDetailsSkeleton = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">

      {/* Back link */}
      <div className="mb-6 h-4 w-32 rounded-full bg-[#27405d]/60" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

        {/* Left Column */}
        <div className="flex flex-col gap-6">

          {/* Photo */}
          <div className="aspect-square w-full rounded-2xl bg-[#1A2E44] border border-[#27405d]" />

          {/* Action Box */}
          <div className="rounded-2xl border border-[#27405d] bg-[#1A2E44] p-5 flex flex-col gap-4">
            <div>
              <div className="h-3 w-28 rounded-full bg-[#27405d]/80" />
              <div className="mt-2 h-8 w-20 rounded-lg bg-[#27405d]/80" />
            </div>
            <div className="flex items-center justify-between border-t border-[#27405d]/50 pt-4">
              <div className="h-3 w-28 rounded-full bg-[#27405d]/80" />
              <div className="h-6 w-20 rounded-full bg-[#27405d]/80" />
            </div>
            <div className="h-12 w-full rounded-xl bg-[#27405d]/80" />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col gap-6 rounded-2xl border border-[#27405d] bg-[#1A2E44] p-6 sm:p-8">

          {/* Specialization tags */}
          <div className="flex flex-wrap gap-2">
            <div className="h-5 w-20 rounded-md bg-[#27405d]/80" />
            <div className="h-5 w-28 rounded-md bg-[#27405d]/80" />
            <div className="h-5 w-16 rounded-md bg-[#27405d]/80" />
          </div>

          {/* Name */}
          <div className="h-9 w-64 rounded-xl bg-[#27405d]/80" />

          {/* Bio section */}
          <div className="border-t border-[#27405d]/50 pt-6 flex flex-col gap-3">
            <div className="h-5 w-44 rounded-lg bg-[#27405d]/80" />
            <div className="h-3 w-full rounded-full bg-[#27405d]/60" />
            <div className="h-3 w-5/6 rounded-full bg-[#27405d]/60" />
            <div className="h-3 w-4/6 rounded-full bg-[#27405d]/60" />
            <div className="h-3 w-full rounded-full bg-[#27405d]/60" />
            <div className="h-3 w-3/4 rounded-full bg-[#27405d]/60" />
          </div>

          {/* Disclaimer box */}
          <div className="mt-auto border-t border-[#27405d]/50 pt-6">
            <div className="rounded-xl bg-[#102235]/40 p-4 border border-[#27405d]/30 flex flex-col gap-2">
              <div className="h-3 w-40 rounded-full bg-[#27405d]/80" />
              <div className="h-2.5 w-full rounded-full bg-[#27405d]/60" />
              <div className="h-2.5 w-5/6 rounded-full bg-[#27405d]/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section Skeleton */}
      <div className="mt-8 rounded-2xl border border-[#27405d] bg-[#1A2E44] p-6 flex flex-col gap-4">
        <div className="h-5 w-28 rounded-lg bg-[#27405d]/80" />
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-[#27405d]/30 bg-[#102235]/40 p-4 flex flex-col gap-2">
              <div className="h-3 w-full rounded-full bg-[#27405d]/60" />
              <div className="h-3 w-4/5 rounded-full bg-[#27405d]/60" />
              <div className="mt-2 flex justify-between border-t border-[#27405d]/30 pt-2">
                <div className="h-2.5 w-20 rounded-full bg-[#27405d]/60" />
                <div className="h-2.5 w-16 rounded-full bg-[#27405d]/60" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-24 w-full rounded-xl bg-[#27405d]/40" />
        <div className="h-10 w-32 self-end rounded-xl bg-[#27405d]/80" />
      </div>

    </div>
  );
};

export default LawyerDetailsSkeleton;