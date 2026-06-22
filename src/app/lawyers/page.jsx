import { getAllLawyers } from "@/lib/api/lawyers";
import LawyersCard from "@/components/lawyer/LawyersCard";
import React from "react";
import { services } from "@/lib/api/services";

const LawyersPage = async () => {
  const lawyers = await getAllLawyers();
  const allServices = await services(); // Loaded full base array list context

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Our Legal Experts
        </h1>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {lawyers.map((lawyer) => {
          const currentLawyerId = lawyer.lawyerId || lawyer._id;

          const lawyerSpecificServices = allServices?.filter(
            (s) => s.lawyerId === currentLawyerId
          ) || [];

          return (
            <LawyersCard 
              key={lawyer._id?.$oid || lawyer._id} 
              services={lawyerSpecificServices} // Pass isolated array matching fallback props rules down
              lawyer={lawyer} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default LawyersPage;