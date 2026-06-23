import HiringHistoryPage from './hiring-history/page';
import ProfileCard from './update-profile/ProfileCard'; // 👈 changed

const ClientDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-[#1A2E44]/20 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">Client Dashboard</h1>
        <p className="mt-1 text-sm text-black/60">Manage your profile and track your legal consultation history.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard /> {/* 👈 changed */}
        </div>
        <div className="lg:col-span-2">
          <HiringHistoryPage />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;