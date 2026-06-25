"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Person } from "@gravity-ui/icons";
import {
  Modal,
  Dropdown,
  Button,
  Label,
  TextField,
  Input,
  TextArea,
  Surface,
} from "@heroui/react";

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

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export function EditLawyerModal({ lawyerData, onSave, triggerButton }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(lawyerData?.photoUrl || null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: lawyerData?.name || "",
    specialization: lawyerData?.specialization || "",
    bio: lawyerData?.bio || "",
    fee: lawyerData?.fee || "",
    status: lawyerData?.status || "available",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSpecializationChange = (value) => {
    setForm((prev) => ({ ...prev, specialization: value }));
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.specialization) {
      setError("Please select a specialization.");
      return;
    }

    try {
      let finalPhotoUrl = lawyerData?.photoUrl;

      if (photoFile) {
        setUploadingPhoto(true);
        finalPhotoUrl = await uploadToImgBB(photoFile);
        setUploadingPhoto(false);
      }

      setSubmitting(true);

      const targetId = lawyerData?._id?.$oid || lawyerData?._id;

      const response = await fetch(`http://localhost:5000/lawyers/${targetId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          specialization: form.specialization,
          bio: form.bio,
          fee: Number(form.fee),
          status: form.status,
          photoUrl: finalPhotoUrl,
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        onSave?.();
      } else {
        setError(resData.error || "Failed to save profile modifications.");
      }
    } catch (err) {
      console.error("Failed to update lawyer profile:", err);
      setError("Something went wrong while updating your profile.");
    } finally {
      setUploadingPhoto(false);
      setSubmitting(false);
    }
  };

  const isBusy = uploadingPhoto || submitting;

  return (
    <Modal>
      {triggerButton || <Button variant="secondary">Edit Profile</Button>}
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md border border-[#1a4060] !bg-[#0a121c]">
            <Modal.CloseTrigger className="text-gray-400 hover:text-white" />

            <Modal.Header className="!bg-[#0a121c]">
             
              <Modal.Heading className="text-white font-semibold">Edit Profile Information</Modal.Heading>
              
            </Modal.Header>

            <Modal.Body className="!bg-[#0a121c] p-6">
              <Surface variant="default" className="bg-transparent border-0 p-0">
                <form id="edit-lawyer-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Photo */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#814f30]/40 bg-[#0a121c]">
                      {photoPreview ? (
                        <Image src={photoPreview} alt="Profile preview" width={96} height={96} className="size-full object-cover" unoptimized />
                      ) : (
                        <span className="text-xs text-gray-500">No photo</span>
                      )}
                    </div>
                    <label className="cursor-pointer text-sm font-medium text-[#c8956e] hover:text-[#814f30] transition-colors hover:underline">
                      Change profile photo
                      <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
                    </label>
                  </div>

                  {/* Name */}
                  <TextField name="name" isRequired className="flex flex-col gap-1.5">
                    <Label className="text-xs font-semibold text-gray-300">Full Name</Label>
                    <Input
                      placeholder="e.g. Ayesha Rahman"
                      value={form.name}
                      onChange={handleChange("name")}
                      className="h-12 w-full rounded-xl border border-[#1a4060] bg-[#0a121c]/80 px-3 text-sm text-white placeholder:text-gray-500 focus:border-[#814f30]/70 focus:outline-none transition-colors hover:border-[#814f30]/40"
                    />
                  </TextField>

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

                  {/* Bio */}
                  <TextField name="bio" isRequired className="flex flex-col gap-1.5">
                    <Label className="text-xs font-semibold text-gray-300">Bio / Professional Summary</Label>
                    <TextArea
                      placeholder="Briefly describe your experience..."
                      value={form.bio}
                      onChange={handleChange("bio")}
                      rows={4}
                      className="w-full rounded-xl border border-[#1a4060] bg-[#0a121c]/80 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#814f30]/70 focus:outline-none transition-colors hover:border-[#814f30]/40 resize-none"
                    />
                  </TextField>

                  {/* Fee */}
                  <TextField name="fee" type="number" isRequired className="flex flex-col gap-1.5">
                    <Label className="text-xs font-semibold text-gray-300">Consultation Fee ($)</Label>
                    <Input
                      placeholder="e.g. 2000"
                      value={form.fee}
                      onChange={handleChange("fee")}
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

                  {error && (
                    <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                      {error}
                    </p>
                  )}
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="border-t border-[#1a4060]/40 !bg-[#0a121c] pt-4">
              <Button slot="close" variant="secondary" className="border-[#1a4060] text-black">
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-lawyer-form"
                slot={!isBusy ? "close" : undefined}
                isDisabled={isBusy}
                className="rounded-xl bg-[#814f30] font-semibold text-white transition-all hover:bg-[#814f30]/80 disabled:opacity-50"
              >
                {uploadingPhoto ? "Uploading..." : submitting ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}