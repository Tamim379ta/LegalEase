
const LawyerCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-[#27405d] bg-[#1A2E44] animate-pulse">
    {/* Photo */}
    <div className="h-52 w-full bg-[#102235]" />

    {/* Content */}
    <div className="flex flex-1 flex-col p-5 gap-3">
      {/* Name */}
      <div className="h-5 w-3/4 rounded-lg bg-[#27405d]/80" />

      {/* Tags */}
      <div className="flex gap-2">
        <div className="h-5 w-20 rounded-md bg-[#27405d]/80" />
        <div className="h-5 w-16 rounded-md bg-[#27405d]/80" />
      </div>

      {/* Bio */}
      <div className="h-3 w-full rounded-full bg-[#27405d]/60" />

      {/* Divider */}
      <div className="my-1 border-t border-[#27405d]/50" />

      {/* Fee */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 rounded-full bg-[#27405d]/60" />
        <div className="h-5 w-24 rounded-lg bg-[#27405d]/80" />
      </div>
    </div>
  </div>
);

const LawyersPageSkeleton = () => {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="h-9 w-56 rounded-xl bg-[#27405d]/80" />
        <div className="h-4 w-36 rounded-full bg-[#27405d]/60" />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="h-10 w-64 rounded-xl bg-[#27405d]/60" />
        <div className="h-10 w-40 rounded-xl bg-[#27405d]/60" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LawyerCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-9 rounded-lg bg-[#27405d]/60" />
        ))}
      </div>

    </div>
  );
};

export default LawyersPageSkeleton;