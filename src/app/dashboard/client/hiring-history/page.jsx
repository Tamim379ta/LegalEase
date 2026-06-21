import React from "react";
import { bookingListById } from "@/lib/api/booking";
import HiringHistoryTable from "@/components/client/HiringHistoryTable";

const HiringHistoryPage = async () => {
  const historyData = await bookingListById()

  return (
    <div className="min-h-screen mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Hiring History
        </h1>
        <p className="mt-2 text-sm text-black/70">
          Track your consulting requests, check statuses, and finalize payments.
        </p>
      </div>

      {/* Interactive Table Client Component */}
      <HiringHistoryTable initialHistory={historyData} />
    </div>
  );
};

export default HiringHistoryPage;