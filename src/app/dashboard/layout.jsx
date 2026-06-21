import { DashboardSidebar } from "../../components/shared/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;