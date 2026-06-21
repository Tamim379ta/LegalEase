import React from "react";
import Image from "next/image";
import { Table, Button } from "@heroui/react";
import { FaUserCircle, FaBriefcase, FaMoneyBillWave, FaClock, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { getLawyerById } from "@/lib/api/lawyers";

// Standard status badges mapping aligned to your style guide
const statusStyles = {
  available: {
    badge: "text-green-700 border-green-500/40 bg-green-50",
    dot: "bg-green-600",
  },
  unavailable: {
    badge: "text-red-700 border-red-500/40 bg-red-50",
    dot: "bg-red-600",
  },
};

const LawyerProfile = async ({ params }) => {
  // Assuming ID comes via dynamic routing params or session fallback
  const lawyerId = params?.id || "6a384369a3a9a64813e658e5";
  const lawyer = await getLawyerById(lawyerId);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Safe data extraction based on your JSON schema
  const currentStatus = lawyer?.status?.toLowerCase() || "available";
  const statusBadge = statusStyles[currentStatus] || statusStyles.available;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 space-y-8">

      {/* 1. Header & Overview Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[#1A2E44]/10 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3">

        {/* Left Side: Avatar & Core Info */}
        <div className="p-6 bg-[#1A2E44]/5 flex flex-col items-center text-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-28 h-28 relative mb-4 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
            {lawyer?.photoUrl ? (
              <Image
                src={lawyer.photoUrl}
                alt={lawyer?.name || "Lawyer Profile"}
                fill
                className="object-cover"
              />
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

        {/* Right Side: Bio Details & System Fields */}
        <div className="p-6 md:col-span-2 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-black/40 mb-1">About / Bio</h3>
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

      {/* 2. Legal Services Management Area */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-black">Active Legal Services</h3>
            <p className="text-xs text-black/60">Manage the specialization types and standard base fees you render to clients.</p>
          </div>
          <Button
            className="h-9 rounded-xl bg-[#1A2E44] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#1A2E44]/90"
          >
            <FaPlus className="text-[10px]" /> Add Service
          </Button>
        </div>

        {/* Services Table Wrapper Layout */}
        <div className="overflow-hidden rounded-2xl border border-[#1A2E44]">
          <Table className="w-full text-left text-sm text-black" aria-label="Lawyer Services Table">
            <Table.ScrollContainer>
              <Table.Content aria-label="Services List Container">
                <Table.Header className="border-b border-[#1A2E44] text-xs font-bold uppercase tracking-wider text-black">
                  <Table.Column className="p-4" isRowHeader>Legal Service / Specialization</Table.Column>
                  <Table.Column className="p-4">Base Consulting Fee</Table.Column>
                  <Table.Column className="p-4">Status Availability</Table.Column>
                  <Table.Column className="p-4 text-right">Actions</Table.Column>
                </Table.Header>

                <Table.Body>
                  {/* Rendering data safely based on current active profile state */}
                  {lawyer ? (
                    <Table.Row className="border-b border-[#1A2E44]/40">

                      {/* Specialization Domain Cell */}
                      <Table.Cell isRowHeader className="p-4 font-semibold text-black">
                        <span className="inline-block rounded-md border border-[#1A2E44] px-2.5 py-1 text-xs text-black bg-white">
                          {lawyer.specialization}
                        </span>
                      </Table.Cell>

                      {/* Financial Fee Structure Cell */}
                      <Table.Cell className="p-4 font-semibold text-black">
                        ৳{lawyer.fee ? lawyer.fee.toLocaleString() : "0"}
                      </Table.Cell>

                      {/* State Verification Badge */}
                      <Table.Cell className="p-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge.badge}`}>
                          <span className={`h-1 w-1 rounded-full ${statusBadge.dot}`} />
                          {currentStatus}
                        </span>
                      </Table.Cell>

                      {/* Action Interface Operations */}
                      <Table.Cell className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            isIconOnly
                            variant="light"
                            className="text-gray-500 hover:text-[#1A2E44] min-w-8 w-8 h-8 rounded-lg hover:bg-gray-100"
                            aria-label="Edit legal service details"
                          >
                            <FaEdit className="text-sm" />
                          </Button>
                          <Button
                            isIconOnly
                            variant="light"
                            className="text-gray-400 hover:text-red-600 min-w-8 w-8 h-8 rounded-lg hover:bg-red-50"
                            aria-label="Remove legal service type"
                          >
                            <FaTrashAlt className="text-xs" />
                          </Button>
                        </div>
                      </Table.Cell>

                    </Table.Row>
                  ) : (
                    // Fallback element row state structure
                    <Table.Row>
                      <Table.Cell className="p-4 text-center text-black/50" colSpan={4}>
                        No customized practice domains registered.
                      </Table.Cell>
                      <Table.Cell className="hidden"><div /></Table.Cell>
                      <Table.Cell className="hidden"><div /></Table.Cell>
                      <Table.Cell className="hidden"><div /></Table.Cell>
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

export default LawyerProfile;