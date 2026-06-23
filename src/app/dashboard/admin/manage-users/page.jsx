import UserTable from '@/components/admin/UserTable';
import { getAllUsers } from '@/lib/api/users';
import React from 'react';

const AdminManageUsersPage = async () => {
  const users = await getAllUsers();

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1A2E44]/20 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Manage Users
          </h1>
          <p className="mt-1 text-sm text-black/60">
            Control platform permissions, modify structural system roles, and manage active accounts.
          </p>
        </div>

        {users.length > 0 && (
          <div className="inline-flex self-start sm:self-center items-center rounded-lg bg-[#1A2E44]/5 border border-[#1A2E44]/20 px-3 py-1.5 text-xs font-semibold text-black">
            Total Records: {users.length}
          </div>
        )}
      </div>

      <UserTable users={users} />
    </div>
  );
};

export default AdminManageUsersPage;