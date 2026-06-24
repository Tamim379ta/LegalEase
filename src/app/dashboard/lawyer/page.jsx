import React from 'react';
import HiringHistoryPage from '../client/hiring-history/page';
import LawyerProfileCard from "@/components/lawyer/LawyerProfileCard";


const LawyerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      
      <div className="border-b border-[#1A2E44]/20 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">Lawyer Dashboard</h1>
        <p className="mt-1 text-sm text-black/60">
          Manage your legal profile, services, and client hiring requests.
        </p>
      </div>

      <LawyerProfileCard />

      <div className="border-t border-[#1A2E44]/20 pt-6">
        <HiringHistoryPage />
      </div>

    </div>
  );
};

export default LawyerDashboard;