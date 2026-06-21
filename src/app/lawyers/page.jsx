import { getAllLawyers } from "@/lib/api/lawyers";
import LawyersCard from "@/components/lawyer/LawyersCard";
import React from "react";

const LawyersPage = async () => {
  const lawyers = await getAllLawyers();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Our Legal Experts
        </h1>
       
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {lawyers.map((lawyer) => (
          <LawyersCard key={lawyer._id?.$oid || lawyer._id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default LawyersPage;