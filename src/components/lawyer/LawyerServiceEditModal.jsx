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
          <Modal.Dialog className="sm:max-w-md border border-[#2E4868] bg-[#0E1B2B]">
            <Modal.CloseTrigger className="text-gray-400 hover:text-white" />

            <Modal.Header>
              <Modal.Icon className="bg-orange-400/20 text-orange-400">
                <Briefcase className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-white font-semibold">Edit Legal Service</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-gray-400">
                Update the rate structure and availability status for this legal practice domain.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default" className="bg-transparent border-0 p-0">
                <form id="edit-service-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Specialization Selection Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white">Specialization *</label>
                    <Dropdown>
                      <Dropdown.Trigger className="h-12 w-full justify-between rounded-xl border border-[#2E4868] bg-[#1A2E44] px-3 text-left text-sm text-white hover:border-orange-400/50">
                        {form.specialization || "Select a specialization"}
                        <span className="text-xs text-gray-400">▼</span>
                      </Dropdown.Trigger>
                      <Dropdown.Popover className="border border-[#2E4868] bg-[#1A2E44]">
                        <Dropdown.Menu>
                          {SPECIALIZATIONS.map((spec) => (
                            <Dropdown.Item
                              key={spec}
                              onClick={() => handleSpecializationChange(spec)}
                              className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-orange-400/20"
                            >
                              <Label className="cursor-pointer text-white">{spec}</Label>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </div>

                  {/* Consultation Fee */}
                  <TextField name="fee" type="number" isRequired className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-white">Base Consulting Fee (৳)</Label>
                    <Input
                      placeholder="e.g. 4000"
                      value={form.fee}
                      onChange={(e) => setForm(p => ({ ...p, fee: e.target.value }))}
                      min={0}
                      className="h-12 w-full rounded-xl border border-[#2E4868] bg-[#1A2E44] px-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
                    />
                  </TextField>

                  {/* Service Availability Toggle status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white">Status</label>
                    <div className="flex gap-3">
                      {["available", "busy"].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, status: value }))}
                          className={`flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${form.status === value
                            ? "border-orange-400 bg-orange-400/20 text-white"
                            : "border-[#2E4868] bg-[#1A2E44] text-gray-400 hover:border-orange-400/50"
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

            <Modal.Footer className="border-t border-[#2E4868]/40 pt-4">
              <Button slot="close" variant="secondary" className="border-[#2E4868] text-white">
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-service-form"
                slot={!submitting ? "close" : undefined}
                isDisabled={submitting}
                className="rounded-xl bg-[#814f30] font-semibold text-white transition-all hover:bg-orange-400 disabled:opacity-50"
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