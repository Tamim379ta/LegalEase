"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { deleteUser } from "@/lib/action/userRole";

export function DeleteUserButton({ user, onDeleted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const currentId = user._id?.$oid || user._id;
    await deleteUser({ userId: currentId });
    setIsLoading(false);
    setIsOpen(false);
    onDeleted(currentId);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        className="h-8 rounded-lg border border-red-500/40 bg-red-500/5 px-3 text-xs font-semibold text-red-700 hover:bg-red-500/10 transition-colors"
        onPress={() => setIsOpen(true)}
      >
        Delete
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Delete User</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm text-black/70">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-black">{user.name}</span>?
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