"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  Button,
  Label,
  TextField,
  Input,
  TextArea,
} from "@heroui/react";
import { createLawyerProfile } from "@/lib/action/createLawyerProfile";
import { selectRole } from "@/lib/action/userRole";

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

const LawyerForm = ({ onSuccess }) => {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    bio: "",
    fee: "",
    status: "available",
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

    setUploadingPhoto(true);
    const photoUrl = await uploadToImgBB(photoFile);
    setUploadingPhoto(false);

    setSubmitting(true);

    // Set the role first, then create the lawyer profile
    await selectRole("lawyer");
    await createLawyerProfile({
      photoUrl,
      name: form.name,
      specialization: form.specialization,
      bio: form.bio,
      fee: Number(form.fee),
      status: form.status,
    });

    setSubmitting(false);

    onSuccess?.();
    router.push("/");
  };

  const isBusy = uploadingPhoto || submitting;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Photo upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border border-[#27405d] bg-[#1A2E44]">
          {photoPreview ? (
            <Image
              src={photoPreview}
              alt="Profile preview"
              width={96}
              height={96}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-400">No photo</span>
          )}
        </div>
        <label className="cursor-pointer text-sm font-medium text-[#d09a75] hover:underline">
          {photoFile ? "Change photo" : "Upload professional photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
          />
        </label>
      </div>

      {/* Name */}
      <TextField name="name" isRequired className="flex flex-col gap-1.5">
        <Label className="text-sm font-medium text-white">Full Name</Label>
        <Input
          placeholder="e.g. Ayesha Rahman"
          value={form.name}
          onChange={handleChange("name")}
          className="h-12 w-full rounded-xl border border-[#27405d] bg-[#1A2E44] px-3 text-sm text-white placeholder:text-gray-500 focus:border-[#814F30] focus:outline-none"
        />
      </TextField>

      {/* Specialization */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white">Specialization *</label>
        <Dropdown>
          <Dropdown.Trigger className="h-12 w-full justify-between rounded-xl border border-[#27405d] bg-[#1A2E44] px-3 text-left text-sm text-white hover:border-[#814F30]/50">
            {form.specialization || "Select a specialization"}
            <span className="text-xs text-gray-400">▼</span>
          </Dropdown.Trigger>
          <Dropdown.Popover className="border border-[#27405d] bg-[#1A2E44]">
            <Dropdown.Menu>
              {SPECIALIZATIONS.map((spec) => (
                <Dropdown.Item
                  key={spec}
                  onClick={() => handleSpecializationChange(spec)}
                  className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-[#814F30]/20"
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
        <Label className="text-sm font-medium text-white">
          Bio / Professional Summary
        </Label>
        <TextArea
          placeholder="Briefly describe your experience and expertise..."
          value={form.bio}
          onChange={handleChange("bio")}
          rows={4}
          className="w-full rounded-xl border border-[#27405d] bg-[#1A2E44] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-[#814F30] focus:outline-none"
        />
      </TextField>

      {/* Fee */}
      <TextField name="fee" type="number" isRequired className="flex flex-col gap-1.5">
        <Label className="text-sm font-medium text-white">Consultation Fee</Label>
        <Input
          placeholder="e.g. 2000"
          value={form.fee}
          onChange={handleChange("fee")}
          min={0}
          className="h-12 w-full rounded-xl border border-[#27405d] bg-[#1A2E44] px-3 text-sm text-white placeholder:text-gray-500 focus:border-[#814F30] focus:outline-none"
        />
      </TextField>

      {/* Status */}
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
                  ? "border-[#814F30] bg-[#814F30]/20 text-white"
                  : "border-[#27405d] bg-[#1A2E44] text-gray-400 hover:border-[#814F30]/50"
              }`}
            >
              {value === "available" ? "Available" : "Busy"}
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        isDisabled={isBusy}
        className="mt-2 h-12 w-full rounded-xl bg-[#814F30] font-semibold text-white disabled:opacity-50"
      >
        {uploadingPhoto
          ? "Uploading photo..."
          : submitting
          ? "Saving profile..."
          : "Submit"}
      </Button>
    </form>
  );
};

export default LawyerForm;