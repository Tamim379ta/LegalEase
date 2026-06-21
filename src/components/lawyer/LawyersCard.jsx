import React from "react";
import Image from "next/image";
import Link from "next/link";

const LawyersCard = ({ lawyer }) => {
  const { _id, photoUrl, name, specialization, bio, fee, status } = lawyer;
  const id = _id?.$oid || _id;

  return (
    <Link
      href={`/lawyers/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#27405d] bg-[#1A2E44] backdrop-blur-sm transition-all duration-300 hover:border-[#814F30] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#814F30]/10"
    >
      {/* Photo Container */}
      <div className="relative h-52 w-full overflow-hidden bg-[#102235]">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium uppercase tracking-wider text-gray-500">
            No Profile Photo
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute right-3 top-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide backdrop-blur-md uppercase ${
              status === "available"
                ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"
                : "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status === "available" ? "bg-emerald-400" : "bg-rose-400"}`} />
            {status}
          </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name */}
        <h3 className="truncate text-lg font-bold tracking-tight text-white group-hover:text-[#d09a75] transition-colors duration-200">
          {name}
        </h3>
        
        {/* Specialization Tag */}
        <span className="mt-1.5 w-fit rounded-md border border-[#814F30]/30 bg-[#814F30]/10 px-2.5 py-0.5 text-xs font-medium text-[#d09a75] tracking-wide">
          {specialization}
        </span>

        {/* Bio Summary */}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-400">
          {bio}
        </p>

        {/* Divider line */}
        <div className="my-4 border-t border-[#27405d]/50" />

        {/* Pricing / Consultation Fee */}
        <div className="mt-auto flex items-baseline justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Consultation</span>
          <p className="text-lg font-bold text-white">
            ৳{fee} <span className="text-xs font-normal text-gray-400">/ session</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LawyersCard;