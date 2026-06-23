import React from "react";
import { bookingListById } from "@/lib/api/booking";
import HiringHistoryTable from "@/components/client/HiringHistoryTable";

const HiringHistoryPage = async () => {
  const historyData = await bookingListById()

  return (
    <div className="w-full">
      <div className="mb-6 border-b border-[#1A2E44]/20 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Hiring History
        </h1>
        <p className="mt-1 text-sm text-black/60">
          Track your consulting requests, check statuses, and finalize payments.
        </p>
      </div>
      <HiringHistoryTable initialHistory={historyData} />
    </div>
  );
};

export default HiringHistoryPage;