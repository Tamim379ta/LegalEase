"use client";

import { useState, useTransition } from "react";
import { Briefcase } from "@gravity-ui/icons";
import { FaPlus } from "react-icons/fa6";
import { Button, Input, Label, Modal, Surface, TextField, Dropdown } from "@heroui/react";
import { addServices } from "@/lib/action/addServices";

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

export default function AddServicesModal({ lawyerId }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    specialization: "",
    fee: "",
    status: "available",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      lawyerId,
      specialization: form.specialization,
      fee: Number(form.fee),
      status: form.status,
    };

    startTransition(async () => {
      try {
        await addServices(data);
        setForm({ specialization: "", fee: "", status: "available" });
        setIsOpen(false);
      } catch (error) {
        console.error("Failed to add service:", error);
      }
    });
  };

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className="h-9 rounded-xl bg-[#1A2E44] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#1A2E44]/90"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-[10px]" /> Add Service
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Briefcase className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Add Lawyer Service</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the details below to add a new specialization and fee status to the database.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id="add-service-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Specialization HeroUI Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white">Specialization</label>
                    <Dropdown>
                      <Button aria-label="Menu" variant="secondary" className="w-full justify-between bg-[#1A2E44] border border-[#2E4868] text-white rounded-xl h-10">
                        {form.specialization || "Select a Specialization"}
                      </Button>
                      <Dropdown.Popover>
                        <Dropdown.Menu onAction={(key) => setForm((prev) => ({ ...prev, specialization: key }))}>
                          {SPECIALIZATIONS.map((spec) => (
                            <Dropdown.Item id={spec} key={spec} textValue={spec}>
                              <Label>{spec}</Label>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </div>

                  {/* Fee Input */}
                  <TextField className="w-full" name="fee" type="number" variant="secondary" required>
                    <Label>Fee</Label>
                    <Input
                      placeholder="Enter service fee amount"
                      min="0"
                      value={form.fee}
                      onChange={(e) => setForm((prev) => ({ ...prev, fee: e.target.value }))}
                    />
                  </TextField>

                  {/* Status Custom Buttons */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white">Status</label>
                    <div className="flex gap-3">
                      {["available", "busy"].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, status: value }))}
                          className={`flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${form.status === value
                              ? "border-[#814f30] bg-[#814f30]/30 text-white"
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

            <Modal.Footer>
              <Button slot="close" variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="add-service-form" isDisabled={isPending || !form.specialization || !form.fee}>
                {isPending ? "Saving..." : "Add Service"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}