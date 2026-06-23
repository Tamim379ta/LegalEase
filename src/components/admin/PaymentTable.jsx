"use client";

import React, { useState } from "react";
import { Table } from "@heroui/react";

const statusStyles = {
  paid: {
    badge: "text-green-700 border-green-500/40 bg-green-500/5",
    dot: "bg-green-600",
  },
  pending: {
    badge: "text-amber-700 border-amber-500/40 bg-amber-500/5",
    dot: "bg-amber-600",
  },
  failed: {
    badge: "text-red-700 border-red-500/40 bg-red-500/5",
    dot: "bg-red-600",
  },
};

const shortId = (id) => {
  const raw = id?.$oid || id || "";
  return `#${raw.slice(-6).toUpperCase()}`;
};

const PaymentTable = ({ payments: initialPayments = [] }) => {
  const [payments] = useState(initialPayments);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1A2E44] mt-6 bg-white">
      <Table className="w-full text-left text-sm text-black" aria-label="Transaction Management Table">
        <Table.ScrollContainer>
          <Table.Content aria-label="Transaction List">

            <Table.Header className="border-b border-[#1A2E44] text-xs font-bold uppercase tracking-wider text-black">
              <Table.Column className="p-4" isRowHeader>Txn ID</Table.Column>
              <Table.Column className="p-4">Lawyer</Table.Column>
              <Table.Column className="p-4">Client</Table.Column>
              <Table.Column className="p-4">Hiring Ref</Table.Column>
              <Table.Column className="p-4">Amount</Table.Column>
              <Table.Column className="p-4">Status</Table.Column>
              <Table.Column className="p-4 text-right">Date</Table.Column>
            </Table.Header>

            <Table.Body>
              {payments.map((payment) => {
                const transactionId = payment._id?.$oid || payment._id;
                const dateValue = payment.createdAt?.$date || payment.createdAt;
                const status = payment.status?.toLowerCase() || "pending";
                const styles = statusStyles[status] || statusStyles.pending;

                const formattedAmount = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: payment.currency?.toUpperCase() || "USD",
                  maximumFractionDigits: 0,
                }).format(payment.amount);

                const formattedDate = new Date(dateValue).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <Table.Row key={transactionId} className="border-b border-[#1A2E44]/40 hover:bg-gray-50/50 transition-colors">

                    {/* Short Txn ID */}
                    <Table.Cell isRowHeader className="p-4 font-mono text-xs font-bold text-[#1A2E44]">
                      {shortId(payment._id)}
                    </Table.Cell>

                    {/* Lawyer — show lawyerName if available, else short ID */}
                    <Table.Cell className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-black text-xs">
                          {payment.lawyerName || "Lawyer"}
                        </span>
                        <span className="text-[11px] text-black/40 font-mono">
                          {shortId(payment.lawyerId)}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Client — show clientName if available, else short ID */}
                    <Table.Cell className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-black text-xs">
                          {payment.clientName || "Client"}
                        </span>
                        <span className="text-[11px] text-black/40 font-mono">
                          {shortId(payment.clientId)}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Hiring ref short ID */}
                    <Table.Cell className="p-4 font-mono text-xs text-black/50">
                      {shortId(payment.hiringId)}
                    </Table.Cell>

                    {/* Amount */}
                    <Table.Cell className="p-4 font-bold text-black">
                      {formattedAmount}
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell className="p-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        {status}
                      </span>
                    </Table.Cell>

                    {/* Date */}
                    <Table.Cell className="p-4 text-right text-black/70 whitespace-nowrap">
                      {formattedDate}
                    </Table.Cell>

                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>

      {payments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-black/60 bg-white">
          <p className="text-sm font-medium">No transactions recorded in the system.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;