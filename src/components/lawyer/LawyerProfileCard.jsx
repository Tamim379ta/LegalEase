import React from "react";
import Image from "next/image";
import { Table, Button } from "@heroui/react";
import { FaUserCircle, FaBriefcase, FaClock, FaEdit } from "react-icons/fa";
import { getLawyerById, serviceById } from "@/lib/api/lawyers";
import AddServicesModal from "@/components/lawyer/Addservices";
import { getUserSession } from "@/lib/core/session";
import { EditLawyerModal } from "@/components/lawyer/LawyerEditModal";
import { revalidatePath } from "next/cache";
import ServiceActions from "@/components/lawyer/ServiceEdit";

const statusStyles = {
  available: { badge: "text-green-700 border-green-500/40 bg-green-50", dot: "bg-green-600" },
  busy: { badge: "text-orange-700 border-orange-500/40 bg-orange-50", dot: "bg-orange-500" },
};

const LawyerProfileCard = async () => {
  const user = await getUserSession();
  const lawyerId = user?.id;
  const lawyer = await getLawyerById(lawyerId);
  const services = await serviceById(lawyerId);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const handleRefresh = async () => {
    "use server";
    revalidatePath("/profile");
  };

  const currentStatus = lawyer?.status?.toLowerCase() || "available";
  const statusBadge = statusStyles[currentStatus] || statusStyles.available;

  return (
    // ✅ Removed min-h-screen, bg-gray-50/50, max-w-5xl mx-auto
    <div className="w-full space-y-6">

      {/* Edit button */}
      <div className="flex justify-end">
        <EditLawyerModal
          lawyerData={lawyer}
          onSave={handleRefresh}
          triggerButton={
            <Button className="bg-[#1A2E44] text-white font-medium rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-orange-400 transition-colors">
              <FaEdit /> Edit Profile
            </Button>
          }
        />
      </div>

      {/* Profile overview card */}
      <div className="bg-white rounded-2xl border border-[#1A2E44]/10 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 bg-[#1A2E44]/5 flex flex-col items-center text-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-28 h-28 relative mb-4 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
            {lawyer?.photoUrl ? (
              <Image src={lawyer.photoUrl} alt={lawyer?.name || "Lawyer"} fill className="object-cover" unoptimized />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-300" />
            )}
          </div>
          <h2 className="text-xl font-bold text-black">{lawyer?.name || "Lawyer Name"}</h2>
          <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold capitalize ${statusBadge.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
            {currentStatus}
          </span>
        </div>

        <div className="p-6 md:col-span-2 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-black/40 mb-1">Bio</h3>
            <p className="text-sm text-black/80 leading-relaxed italic">
              {lawyer?.bio || "No professional biography written yet."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100 text-sm">
            <div className="flex items-center gap-2.5 text-black/70">
              <FaBriefcase className="text-[#1A2E44]" />
              <div>
                <p className="text-xs text-black/40 font-medium">Primary Domain</p>
                <p className="font-semibold text-black">{lawyer?.specialization || "General Practice"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-black/70">
              <FaClock className="text-[#1A2E44]" />
              <div>
                <p className="text-xs text-black/40 font-medium">Profile Registered</p>
                <p className="font-semibold text-black">{formatDate(lawyer?.createdAt?.$date || lawyer?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-black">Active Legal Services</h3>
            <p className="text-xs text-black/60">Manage specialization types and base fees.</p>
          </div>
          <AddServicesModal lawyerId={lawyerId} />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#1A2E44]">
          <Table className="w-full text-left text-sm text-black" aria-label="Lawyer Services Table">
            <Table.ScrollContainer>
              <Table.Content aria-label="Services List Container">
                <Table.Header className="border-b border-[#1A2E44] text-xs font-bold uppercase tracking-wider text-black">
                  <Table.Column className="p-4" isRowHeader>Specialization</Table.Column>
                  <Table.Column className="p-4">Base Fee</Table.Column>
                  <Table.Column className="p-4">Status</Table.Column>
                  <Table.Column className="p-4 text-right">Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {services && services.length > 0 ? (
                    services.map((item) => {
                      const itemStatus = item?.status?.toLowerCase() || "available";
                      const itemStatusBadge = statusStyles[itemStatus] || statusStyles.available;
                      return (
                        <Table.Row key={item._id?.$oid || item._id} className="border-b border-[#1A2E44]/40">
                          <Table.Cell isRowHeader className="p-4 font-semibold text-black">
                            <span className="inline-block rounded-md border border-[#1A2E44] px-2.5 py-1 text-xs text-black bg-white">
                              {item.specialization}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="p-4 font-semibold text-black">
                            ৳{item.fee ? item.fee.toLocaleString() : "0"}
                          </Table.Cell>
                          <Table.Cell className="p-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${itemStatusBadge.badge}`}>
                              <span className={`h-1 w-1 rounded-full ${itemStatusBadge.dot}`} />
                              {itemStatus}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="p-4 text-right">
                            <ServiceActions item={item} handleRefresh={handleRefresh} />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  ) : (
                    <Table.Row>
                      <Table.Cell className="p-4 text-center text-black/50 font-medium">No services registered.</Table.Cell>
                      <Table.Cell className="hidden" aria-hidden="true"></Table.Cell>
                      <Table.Cell className="hidden" aria-hidden="true"></Table.Cell>
                      <Table.Cell className="hidden" aria-hidden="true"></Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfileCard;