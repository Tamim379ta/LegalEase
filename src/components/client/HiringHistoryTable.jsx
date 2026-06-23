"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { getUserSession } from "@/lib/core/session";

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

const HiringHistoryTable = ({ initialHistory = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handlePayment = async (row) => {
    const lawyerId = row.lawyerId
    const hiringId = row._id
    const session = await getUserSession()

    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lawyerName: row.lawyerName,
        hourlyRate: row.fee,
        lawyerId,
        hiringId,
        clientId: session?.id,      
        clientEmail: session?.email, 
      }),
    })

    const { url } = await res.json()
    window.location.href = url
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1A2E44]">
      <Table className="w-full text-left text-sm text-black" aria-label="Hiring History">
        <Table.ScrollContainer>
          <Table.Content aria-label="Hiring History Table">
            <Table.Header className="border-b border-[#1A2E44] text-xs font-bold uppercase tracking-wider text-black">
              <Table.Column className="p-4" isRowHeader>
                Lawyer Name
              </Table.Column>
              <Table.Column className="p-4">Specialization</Table.Column>
              <Table.Column className="p-4">Fee</Table.Column>
              <Table.Column className="p-4">Hiring Date</Table.Column>
              <Table.Column className="p-4">Status</Table.Column>
              <Table.Column className="p-4 text-right">Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {initialHistory.map((row) => {
                const hiringId = row._id?.$oid || row._id;
                const status = row.haringStatus?.toLowerCase() || "pending";
                const styles = statusStyles[status] || statusStyles.pending;

                return (
                  <Table.Row
                    key={hiringId}
                    className="border-b border-[#1A2E44]/40"
                  >
                    <Table.Cell isRowHeader className="p-4 font-semibold text-black">
                      Advocate {row.lawyerName}
                    </Table.Cell>

                    <Table.Cell className="p-4">
                      <span className="inline-block rounded-md border border-[#1A2E44] px-2.5 py-1 text-xs text-black">
                        {row.specialization}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="p-4 font-semibold text-black">
                      ৳{row.fee ? row.fee.toLocaleString() : "0"}
                    </Table.Cell>

                    <Table.Cell className="p-4 text-black/70">
                      {formatDate(row.createdAt?.$date || row.createdAt)}
                    </Table.Cell>

                    <Table.Cell className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        {status}
                      </span>
                    </Table.Cell>

                    {/* Action */}
                    <Table.Cell className="p-4 text-right">
                      {status === "accepted" && row.haringStatus !== "paid" ? (
                        <button
                          onClick={() => handlePayment(row)}
                          className="h-8 rounded-lg border border-[#1A2E44] px-3 text-xs font-semibold text-black hover:bg-gray-100"
                        >
                          Pay Now
                        </button>
                      ) : status === "accepted" && row.haringStatus === "paid" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/40 px-3 py-1 text-xs font-semibold text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                          Paid
                        </span>
                      ) : (
                        <Button isDisabled className="h-8 rounded-lg border border-[#1A2E44]/40 px-3 text-xs text-black/40">
                          {status === "rejected" ? "Unavailable" : "Locked"}
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

      {initialHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-black/60">
          <p className="text-sm">No hiring history found.</p>
        </div>
      )}
    </div>
  );
};

export default HiringHistoryTable;