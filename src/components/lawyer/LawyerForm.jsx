"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dropdown, Button, Label, Input, TextArea } from "@heroui/react";
import { createLawyerProfile } from "@/lib/action/createLawyerProfile";

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
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!data.success) {
      throw new Error("Image upload failed");
    }
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!photoFile) {
      setError("Please upload a professional photo.");
      return;
    }
    if (!form.name || !form.specialization || !form.bio || !form.fee) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setUploadingPhoto(true);
      const photoUrl = await uploadToImgBB(photoFile);
      setUploadingPhoto(false);

      setSubmitting(true);
      const result = await createLawyerProfile({
        photoUrl,
        name: form.name,
        specialization: form.specialization,
        bio: form.bio,
        fee: Number(form.fee),
        status: form.status,
      });

      if (result?.success) {
        onSuccess?.();
      } else {
        setError(result?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setUploadingPhoto(false);
      setSubmitting(false);
    }
  };

  const isBusy = uploadingPhoto || submitting;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Photo upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border border-[#27405d] bg-[#102235]/60">
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
      <Input
        label="Full Name"
        placeholder="e.g. Ayesha Rahman"
        value={form.name}
        onChange={handleChange("name")}
        isRequired
        classNames={{ inputWrapper: "bg-[#102235]/60 border-[#27405d]" }}
      />

      {/* Specialization (HeroUI Dropdown implementation) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white">Specialization *</label>
        <Dropdown>
          <Dropdown.Trigger>
            <Button 
              className="h-12 w-full justify-between rounded-xl border border-[#27405d] bg-[#102235]/60 px-3 text-left text-sm text-white hover:border-[#814f30]/50"
            >
              {form.specialization || "Select a specialization"}
              <span className="text-xs text-gray-400">▼</span>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover className="border border-[#27405d] bg-[#102235]">
            <Dropdown.Menu>
              {SPECIALIZATIONS.map((spec) => (
                <Dropdown.Item 
                  key={spec} 
                  onClick={() => handleSpecializationChange(spec)}
                  className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-[#814f30]/20"
                >
                  <Label className="cursor-pointer text-white">{spec}</Label>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {/* Bio */}
      <TextArea
        label="Bio / Professional Summary"
        placeholder="Briefly describe your experience and expertise..."
        value={form.bio}
        onChange={handleChange("bio")}
        minRows={4}
        isRequired
        classNames={{ inputWrapper: "bg-[#102235]/60 border-[#27405d]" }}
      />

      {/* Fee */}
      <Input
        type="number"
        label="Consultation Fee"
        placeholder="e.g. 2000"
        value={form.fee}
        onChange={handleChange("fee")}
        isRequired
        min={0}
        startContent={<span className="text-gray-400">৳</span>}
        classNames={{ inputWrapper: "bg-[#102235]/60 border-[#27405d]" }}
      />

      {/* Status */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white">Status</label>
        <div className="flex gap-3">
          {["available", "busy"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, status: value }))}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${form.status === value
                  ? "border-[#814f30] bg-[#814f30]/20 text-white"
                  : "border-[#27405d] bg-[#102235]/60 text-gray-400 hover:border-[#814f30]/50"
                }`}
            >
              {value === "available" ? "Available" : "Busy"}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button
        type="submit"
        isDisabled={isBusy}
        className="mt-2 h-12 w-full rounded-xl bg-[#814f30] font-semibold text-white disabled:opacity-50"
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