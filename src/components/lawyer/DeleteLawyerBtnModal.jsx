"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@heroui/react";
import { deleteLawyer } from "@/lib/action/editLawyer";

export function DeleteLawyerButton({ lawyerId, lawyerName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteLawyer(lawyerId);
    setIsLoading(false);
    setIsOpen(false);
    router.refresh();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        className="h-8 rounded-lg border border-red-300 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
        onPress={() => setIsOpen(true)}
      >
        Delete
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Delete Lawyer</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-sm text-black/70">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-black">{lawyerName}</span>?
                This action cannot be undone.
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="ghost"
                slot="close"
                className="border border-[#1A2E44]/20 text-black text-sm rounded-lg px-4"
              >
                Cancel
              </Button>
              <Button
                onPress={handleDelete}
                isLoading={isLoading}
                className="bg-red-600 text-white text-sm rounded-lg px-4 hover:bg-red-700"
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}