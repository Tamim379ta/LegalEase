import React from 'react';
import AnalyticsPage from './analytics/page';
import AllTransactionsPage from './all-transactions/page';
import AdminManageUsersPage from './manage-users/page';

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      
      {/* Top Section: Spans full width across both columns */}
      <div className="lg:col-span-2">
        <AnalyticsPage />
      </div>

      {/* Bottom Left: Transactions list */}
      <div className="w-full">
        <AllTransactionsPage />
      </div>

      {/* Bottom Right: Users management list */}
      <div className="w-full">
        <AdminManageUsersPage />
      </div>

    </div>
  );
};

export default AdminDashboard;