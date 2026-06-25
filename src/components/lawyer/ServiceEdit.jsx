"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TrashBin } from "@gravity-ui/icons";
import LawyerServiceEditModal from "@/components/lawyer/LawyerServiceEditModal";
import { deleteLawyerServices } from "@/lib/action/editLawyer";

export default function ServiceActions({ item, handleRefresh }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteExecute = async () => {
    setIsDeleting(true);
    const targetId = item._id?.$oid || item._id;
    const res = deleteLawyerServices(targetId)
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* 1. EDIT FLOW MODAL */}
      <LawyerServiceEditModal
        serviceItem={item}
        onSave={handleRefresh}
        triggerButton={
          <Button
            isIconOnly
            variant="light"
            className="text-gray-500 hover:text-[#1A2E44] min-w-8 w-8 h-8 rounded-lg hover:bg-gray-100"
            aria-label="Edit legal service details"
          >
            <FaEdit className="text-sm" />
          </Button>
        }
      />

      <Modal>
        <Button
          isIconOnly
          variant="light"
          className="text-gray-400 hover:text-red-400 min-w-8 w-8 h-8 rounded-lg hover:bg-red-500/10"
          aria-label="Remove legal service type"
        >
          <FaTrashAlt className="text-xs" />
        </Button>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[380px] border border-[#1a4060] !bg-[#0a121c]">
              <Modal.CloseTrigger className="text-gray-400 hover:text-white" />

              <Modal.Header className="!bg-[#0a121c]">
                <Modal.Icon className="bg-rose-500/20 text-rose-400">
                  <TrashBin className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-white font-semibold">Delete Service</Modal.Heading>
              </Modal.Header>

              <Modal.Body className="!bg-[#0a121c]">
                <p className="text-sm text-gray-400">
                  Are you sure you want to remove the{" "}
                  <strong className="text-[#c8956e]">{item.specialization}</strong>{" "}
                  domain profile service package? This action cannot be reversed.
                </p>
              </Modal.Body>

              <Modal.Footer className="flex gap-2 border-t border-[#1a4060]/40 !bg-[#0a121c] pt-4">
                <Button
                  slot="close"
                  variant="secondary"
                  className="flex-1 border-[#1a4060] text-black"
                  isDisabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  slot="close"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl"
                  onClick={handleDeleteExecute}
                  isDisabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}