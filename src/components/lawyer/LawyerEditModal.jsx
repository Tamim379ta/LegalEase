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
      
      // Update data block payload targeted directly to your patch endpoint match structure
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
        onSave?.(); // Triggers Server Action to revalidate layout profile cache data
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
          <Modal.Dialog className="sm:max-w-md border border-[#2E4868] bg-[#0E1B2B]">
            <Modal.CloseTrigger className="text-gray-400 hover:text-white" />
            
            <Modal.Header>
              <Modal.Icon className="bg-orange-400/20 text-orange-400">
                <Person className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-white font-semibold">Edit Profile Information</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-gray-400">
                Modify your public profile details, fees, and current scheduling status.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default" className="bg-transparent border-0 p-0">
                <form id="edit-lawyer-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  {/* Photo selection area layout */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border border-[#2E4868] bg-[#1A2E44]">
                      {photoPreview ? (
                        <Image
                          src={photoPreview}
                          alt="Profile preview"
                          width={96}
                          height={96}
                          className="size-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No photo</span>
                      )}
                    </div>
                    <label className="cursor-pointer text-sm font-medium text-orange-300 hover:underline">
                      Change profile photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Name Field */}
                  <TextField name="name" isRequired className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-white">Full Name</Label>
                    <Input
                      placeholder="e.g. Ayesha Rahman"
                      value={form.name}
                      onChange={handleChange("name")}
                      className="h-12 w-full rounded-xl border border-[#2E4868] bg-[#1A2E44] px-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
                    />
                  </TextField>

                  {/* Specialization Field */}
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

                  {/* Bio Field */}
                  <TextField name="bio" isRequired className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-white">Bio / Professional Summary</Label>
                    <TextArea
                      placeholder="Briefly describe your experience..."
                      value={form.bio}
                      onChange={handleChange("bio")}
                      rows={4}
                      className="w-full rounded-xl border border-[#2E4868] bg-[#1A2E44] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
                    />
                  </TextField>

                  {/* Fee Field */}
                  <TextField name="fee" type="number" isRequired className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-white">Consultation Fee</Label>
                    <Input
                      placeholder="e.g. 2000"
                      value={form.fee}
                      onChange={handleChange("fee")}
                      min={0}
                      className="h-12 w-full rounded-xl border border-[#2E4868] bg-[#1A2E44] px-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
                    />
                  </TextField>

                  {/* Status Toggle Blocks */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white">Status</label>
                    <div className="flex gap-3">
                      {["available", "busy"].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, status: value }))}
                          className={`flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${
                            form.status === value
                              ? "border-orange-400 bg-orange-400/20 text-white"
                              : "border-[#2E4868] bg-[#1A2E44] text-gray-400 hover:border-orange-400/50"
                          }`}
                        >
                          {value === "available" ? "Available" : "Busy"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                      {error}
                    </p>
                  )}
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="border-t border-[#2E4868]/40 pt-4">
              <Button slot="close" variant="secondary" className="border-[#2E4868] text-white">
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-lawyer-form"
                slot={!isBusy ? "close" : undefined}
                isDisabled={isBusy}
                className="rounded-xl bg-[#814f30] font-semibold text-white transition-all hover:bg-orange-400 disabled:opacity-50"
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