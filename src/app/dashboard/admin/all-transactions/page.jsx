import PaymentTable from '@/components/admin/PaymentTable';
import { getAllPayments } from '@/lib/api/payments';
import React from 'react';

const AllTransactionsPage = async () => {
  const payments = await getAllPayments();
  const hasPayments = payments && payments.length > 0;

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-1 border-b border-[#1A2E44]/20 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Transaction History
        </h1>
        <p className="text-sm text-black/60">
          Monitor, track, and manage all incoming platform payments and lawyer payouts.
        </p>
      </div>

      {hasPayments ? (
        <PaymentTable payments={payments} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1A2E44]/20 bg-white p-12 text-center">
          <div className="rounded-full bg-gray-100 p-4 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-black">No transactions recorded</h3>
          <p className="mt-1 max-w-sm text-sm text-black/50">
            Once a client hires a lawyer, transactions will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllTransactionsPage;