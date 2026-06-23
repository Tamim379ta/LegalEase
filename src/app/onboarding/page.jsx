"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@heroui/react";
import { FaUserTie, FaUser } from "react-icons/fa";
import LawyerForm from "./../../components/lawyer/LawyerForm";
import { updateUserProfile } from "@/lib/action/userRole";

const ChooseRolePage = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [lawyerModalOpen, setLawyerModalOpen] = useState(false);

  const handleSelectLawyer = () => {
    setSelected("lawyer");
    setLawyerModalOpen(true);
  };

  const handleContinue = async () => {
    if (!selected || selected === "lawyer") return;

    const updateRole = await updateUserProfile({role: selected});
    if (updateRole) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c4168] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">How will you use LegalEase?</h1>
          <p className="mt-2 text-sm text-gray-400">
            Choose the option that fits you best
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setSelected("client")}
            className={`flex flex-col py-2 items-center justify-center gap-2 rounded-2xl border p-6 text-center transition-all ${
              selected === "client"
                ? "border-[#814f30] bg-[#814f30]/20"
                : "border-[#27405d] bg-[#102235]/60 hover:border-[#814f30]/50"
            }`}
          >
            <FaUser className="text-xl text-[#d09a75]" />
            <div>
              <p className="font-medium text-white">I'm a Client</p>
            </div>
          </button>

          <button
            type="button"
            onClick={handleSelectLawyer}
            className={`flex flex-col py-2 items-center justify-center gap-2 rounded-2xl border p-6 text-center transition-all ${
              selected === "lawyer"
                ? "border-[#814f30] bg-[#814f30]/20"
                : "border-[#27405d] bg-[#102235]/60 hover:border-[#814f30]/50"
            }`}
          >
            <FaUserTie className="text-xl text-[#d09a75]" />
            <div>
              <p className="font-medium text-white">I'm a Lawyer</p>
            </div>
          </button>
        </div>

        {selected !== "lawyer" && (
          <Button
            isDisabled={!selected}
            onPress={handleContinue}
            className="mt-6 h-12 w-full rounded-xl bg-[#814f30] font-semibold text-white disabled:opacity-50"
          >
            Continue
          </Button>
        )}
      </div>

      {/* Controlled modal: opens when the Lawyer card is selected */}
      <Modal isOpen={lawyerModalOpen} onOpenChange={setLawyerModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Lawyer Profile</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Tell us about your practice so clients can find and hire you.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <LawyerForm onSuccess={() => setLawyerModalOpen(false)} />
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default ChooseRolePage;