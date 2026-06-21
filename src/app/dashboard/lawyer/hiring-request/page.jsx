import React from "react";
import { bookingListById } from "@/lib/api/booking";
import HiringRequestTable from "@/components/lawyer/HiringRequestTable";

const HiringRequestPage = async () => {
 const bookingReq = await bookingListById()


  return (
    <div className="min-h-screen mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Hiring Requests
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Review inbound consultation requests from clients. Accept or decline them below.
        </p>
      </div>

      {/* Interactive Requests Table */}
      <HiringRequestTable initialRequests={bookingReq} />
    </div>
  );
};

export default HiringRequestPage;