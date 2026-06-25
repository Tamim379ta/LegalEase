"use client";

import React, { useState } from "react";
import { Briefcase } from "@gravity-ui/icons";
import {
  Modal,
  Dropdown,
  Button,
  Label,
  TextField,
  Input,
  Surface,
} from "@heroui/react";
import { editLawyerServices } from "@/lib/action/editLawyer";

const SPECIALIZATIONS = [
  "Family Law",
  "Corporate Law",
  "Criminal Law",
  "Civil Litigation",
  "Real Estate Law",
  "Immigration Law",
  "Tax Law",
  "Intellectual Property Law",
  "Labor & Employment Law",
  "Personal Injury Law",
];

export default function LawyerServiceEditModal({ serviceItem, onSave, triggerButton }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    specialization: serviceItem?.specialization || "",
    fee: serviceItem?.fee || "",
    status: serviceItem?.status || "available",
  });

  const handleSpecializationChange = (value) => {
    setForm((prev) => ({ ...prev, specialization: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const targetId = serviceItem?._id?.$oid || serviceItem?._id;

      const res = await editLawyerServices(targetId, {
        specialization: form.specialization,
        fee: Number(form.fee),
        status: form.status,
      });

      if (res?.success || res) {
        onSave?.(); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal>
  {triggerButton}
  <Modal.Backdrop>
    <Modal.Container placement="auto">
      <Modal.Dialog className="sm:max-w-md border border-[#1a4060] !bg-[#0a121c]">
        <Modal.CloseTrigger className="text-gray-400 hover:text-white" />

        <Modal.Header className="!bg-[#0a121c]">
          
          <Modal.Heading className="text-white font-semibold">Edit Legal Service</Modal.Heading>
         
        </Modal.Header>

        <Modal.Body className="!bg-[#0a121c] p-6">
          <Surface variant="default" className="bg-transparent border-0 p-0">
            <form id="edit-service-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Specialization */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300">Specialization *</label>
                <Dropdown>
                  <Dropdown.Trigger className="h-12 w-full justify-between rounded-xl border border-[#1a4060] bg-[#0a121c]/80 px-3 text-left text-sm text-white hover:border-[#814f30]/40 transition-colors">
                    <span className={form.specialization ? "text-white" : "text-gray-500"}>
                      {form.specialization || "Select a specialization"}
                    </span>
                    <span className="text-xs text-gray-500">▼</span>
                  </Dropdown.Trigger>
                  <Dropdown.Popover className="border border-[#1a4060] bg-[#0a121c]">
                    <Dropdown.Menu>
                      {SPECIALIZATIONS.map((spec) => (
                        <Dropdown.Item
                          key={spec}
                          onClick={() => handleSpecializationChange(spec)}
                          className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-[#814f30]/20 transition-colors"
                        >
                          <Label className="cursor-pointer text-white">{spec}</Label>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>

              {/* Fee */}
              <TextField name="fee" type="number" isRequired className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-gray-300">Base Consulting Fee ($)</Label>
                <Input
                  placeholder="e.g. 4000"
                  value={form.fee}
                  onChange={(e) => setForm(p => ({ ...p, fee: e.target.value }))}
                  min={0}
                  className="h-12 w-full rounded-xl border border-[#1a4060] bg-[#0a121c]/80 px-3 text-sm text-white placeholder:text-gray-500 focus:border-[#814f30]/70 focus:outline-none transition-colors hover:border-[#814f30]/40"
                />
              </TextField>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300">Availability Status</label>
                <div className="flex gap-3">
                  {["available", "busy"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, status: value }))}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${
                        form.status === value
                          ? "border-[#814f30] bg-[#814f30]/20 text-white"
                          : "border-[#1a4060] bg-[#0a121c]/80 text-gray-400 hover:border-[#814f30]/40"
                      }`}
                    >
                      {value === "available" ? "Available" : "Busy"}
                    </button>
                  ))}
                </div>
              </div>

            </form>
          </Surface>
        </Modal.Body>

        <Modal.Footer className="border-t border-[#1a4060]/40 !bg-[#0a121c] pt-4">
          <Button slot="close" variant="secondary" className="border-[#1a4060] text-black">
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-service-form"
            slot={!submitting ? "close" : undefined}
            isDisabled={submitting}
            className="rounded-xl bg-[#814f30] font-semibold text-white transition-all hover:bg-[#814f30]/80 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>
  );
}