import { getAllBookings } from '@/lib/api/booking';
import { getAllPayments } from '@/lib/api/payments';
import { getAllUsers } from '@/lib/api/users';
import React from 'react';

const AnalyticsPage = async () => {
  const [users, payments, bookings] = await Promise.all([
    getAllUsers() || [],
    getAllPayments() || [],
    getAllBookings() || []
  ]);

  const totalUsers = users.length;
  const totalLawyers = users.filter(u => u.role?.toLowerCase() === 'lawyer').length;
  const totalHires = bookings.length;
  const totalRevenueAmount = payments
    .filter(p => p.status?.toLowerCase() === 'paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalRevenueAmount);

  const metrics = [
    {
      title: "Total Registered Users",
      value: totalUsers,
      description: "Active system-wide profiles",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
    },
    {
      title: "Total Lawyers",
      value: totalLawyers,
      description: "Verified corporate & field practitioners",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174c-.053-.462.037-.933.27-1.332l3.356-5.752a1.342 1.342 0 0 1 1.848-.485l1.642.947a1.342 1.342 0 0 1 .486 1.847l-3.356 5.753a1.342 1.342 0 0 1-1.847.486l-1.642-.947a1.341 1.341 0 0 1-.757-1.267ZM16.384 10.174c.053-.462-.038-.933-.27-1.332l-3.356-5.752a1.342 1.342 0 0 0-1.848-.485l-1.642.947a1.342 1.342 0 0 0-.486 1.847l3.356 5.753a1.342 1.342 0 0 0 1.847.486l1.642-.947c.433-.25.68-.724.757-1.267ZM2.25 21h19.5M10.5 14.25h3v6.75h-3v-6.75Z" /></svg>
    },
    {
      title: "Total Case Hires",
      value: totalHires,
      description: "Successful client connections",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-10.125c0-.621-.504-1.125-1.125-1.125H5.625c-.621 0-1.125.504-1.125 1.125v14.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
    },
    {
      title: "Gross Revenue",
      value: formattedRevenue,
      description: "Cleared client payments via Stripe",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.854-1.106-2.24 0-3.093.563-.437 1.287-.661 2.003-.661.725 0 1.45.224 2.003.66.524.407.81 1.012.81 1.644M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    }
  ];

  return (
    <div className="w-full">
      {/* Page Head Header */}
      <div className="flex flex-col gap-1 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          Real-time platform overview performance indices and user trends.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((card, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-[#1A2E44] bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className="rounded-xl border border-[#1A2E44]/20 bg-[#1A2E44]/5 p-2.5 text-[#1A2E44]">
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight text-black">
                {card.value}
              </span>
              <span className="text-xs font-medium text-black/50">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;