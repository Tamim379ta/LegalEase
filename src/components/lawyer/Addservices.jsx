"use client";

import { useState, useTransition } from "react";
import { Briefcase } from "@gravity-ui/icons";
import { FaPlus } from "react-icons/fa6";
import { Button, Input, Label, Modal, Surface, TextField, Dropdown } from "@heroui/react";
import { addServices } from "@/lib/action/addServices";
import { useRouter } from "next/navigation";

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
  const router = useRouter()

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
        router.refresh()
        setIsOpen(false);
      } catch (error) {
        console.error("Failed to add service:", error);
      }
    });
  };

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className="h-9 rounded-xl bg-[#0a121c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#0a121c]/80 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-[10px]" /> Add Service
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md border border-[#1a4060] !bg-[#0a121c]">
            <Modal.CloseTrigger className="text-gray-400 hover:text-white" />
            <Modal.Header className="!bg-[#0a121c]">
              <Modal.Icon className="bg-[#814f30]/20 text-[#c8956e]">
                <Briefcase className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-white font-semibold">Add Lawyer Service</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-gray-400">
                Fill out the details below to add a new specialization and fee status to the database.
              </p>
            </Modal.Header>

            <Modal.Body className="!bg-[#0a121c] p-6">
              <Surface variant="default" className="bg-transparent border-0 p-0">
                <form id="add-service-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Specialization */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-300">Specialization</label>
                    <Dropdown>
                      <Button
                        aria-label="Menu"
                        variant="secondary"
                        className="w-full justify-between bg-[#0a121c]/80 border border-[#1a4060] text-white rounded-xl h-12 hover:border-[#814f30]/40 transition-colors"
                      >
                        <span className={form.specialization ? "text-white" : "text-gray-500"}>
                          {form.specialization || "Select a Specialization"}
                        </span>
                        <span className="text-xs text-gray-500">▼</span>
                      </Button>
                      <Dropdown.Popover className="border border-[#1a4060] bg-[#0a121c]">
                        <Dropdown.Menu onAction={(key) => setForm((prev) => ({ ...prev, specialization: key }))}>
                          {SPECIALIZATIONS.map((spec) => (
                            <Dropdown.Item
                              id={spec}
                              key={spec}
                              textValue={spec}
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
                  <TextField className="w-full flex flex-col gap-1.5" name="fee" type="number" required>
                    <Label className="text-xs font-semibold text-gray-300">Fee ($)</Label>
                    <Input
                      placeholder="Enter service fee amount"
                      min="0"
                      value={form.fee}
                      onChange={(e) => setForm((prev) => ({ ...prev, fee: e.target.value }))}
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
                          className={`flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${form.status === value
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
              <Button
                slot="close"
                variant="secondary"
                onClick={() => setIsOpen(false)}
                className="border-[#1a4060] text-black"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="add-service-form"
                isDisabled={isPending || !form.specialization || !form.fee}
                className="rounded-xl bg-[#814f30] font-semibold text-white hover:bg-[#814f30]/80 disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Add Service"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}