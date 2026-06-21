"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { handleRequest } from "@/lib/action/booking";
import { useRouter } from "next/navigation";

const statusStyles = {
  accepted: {
    badge: "text-green-700 border-green-500/40",
    dot: "bg-green-600",
  },
  rejected: {
    badge: "text-red-700 border-red-500/40",
    dot: "bg-red-600",
  },
  pending: {
    badge: "text-yellow-700 border-yellow-500/40",
    dot: "bg-yellow-600",
  },
};

const HiringRequestTable = ({ initialRequests = [] }) => {
  const router = useRouter()
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAccept = async (requestId) => {
    const accepted = await handleRequest(requestId, { haringStatus: "accepted" })
    router.refresh()
  };

  const handleReject = async (requestId) => {
    const rejected = await handleRequest(requestId, { haringStatus: "rejected" })
    router.refresh()
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1A2E44]">
      <Table className="w-full text-left text-sm text-black" aria-label="Hiring Requests">
        <Table.ScrollContainer>
          <Table.Content aria-label="Hiring Requests Table">
            <Table.Header className="border-b border-[#1A2E44] text-xs font-bold uppercase tracking-wider text-black">
              <Table.Column className="p-4" isRowHeader>
                Client Name
              </Table.Column>
              <Table.Column className="p-4">Specialization</Table.Column>
              <Table.Column className="p-4">Fee</Table.Column>
              <Table.Column className="p-4">Request Date</Table.Column>
              <Table.Column className="p-4">Status</Table.Column>
              <Table.Column className="p-4 text-right">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {initialRequests.map((row) => {
                const requestId = row._id?.$oid || row._id;
                const status = row.haringStatus?.toLowerCase() || "pending";
                const styles = statusStyles[status] || statusStyles.pending;

                return (
                  <Table.Row
                    key={requestId}
                    className="border-b border-[#1A2E44]/40"
                  >
                    {/* Client Name */}
                    <Table.Cell isRowHeader className="p-4 font-semibold text-black">
                      {row.userName}
                    </Table.Cell>

                    {/* Specialization */}
                    <Table.Cell className="p-4">
                      <span className="inline-block rounded-md border border-[#1A2E44] px-2.5 py-1 text-xs text-black">
                        {row.specialization}
                      </span>
                    </Table.Cell>

                    {/* Fee */}
                    <Table.Cell className="p-4 font-semibold text-black">
                      ৳{row.fee ? row.fee.toLocaleString() : "0"}
                    </Table.Cell>

                    {/* Request Date */}
                    <Table.Cell className="p-4 text-black/70">
                      {formatDate(row.createdAt?.$date || row.createdAt)}
                    </Table.Cell>

                    {/* Status Badge */}
                    <Table.Cell className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        {status}
                      </span>
                    </Table.Cell>

                    {/* Action Buttons */}
                    <Table.Cell className="p-4 text-right">
                      {status === "pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => handleAccept(requestId)}
                            className="h-8 rounded-lg bg-[#1A2E44] px-3 text-xs font-semibold text-white hover:bg-[#1A2E44]/90"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleReject(requestId)}
                            className="h-8 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button
                          isDisabled
                          className="h-8 rounded-lg border border-[#1A2E44]/40 px-3 text-xs text-black/40"
                        >
                          {status === "accepted" ? "Accepted" : "Rejected"}
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>

      {/* Empty state fallback display */}
      {initialRequests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-black/60">
          <p className="text-sm">No hiring requests found.</p>
        </div>
      )}
    </div>
  );
};

export default HiringRequestTable;