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
import { authClient } from "@/lib/auth-client";
import { updateUserProfile } from "@/lib/action/userRole";

const SPECIALIZATIONS = [
  "Family Law", "Corporate Law", "Criminal Law", "Civil Litigation",
  "Real Estate Law", "Immigration Law", "Tax Law",
  "Intellectual Property Law", "Labor & Employment Law", "Personal Injury Law",
];

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const LawyerForm = ({ onSuccess }) => {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST", body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (sessionPending) { setError("Still checking your session, please try again."); return; }
    const userId = session?.user?.id;
    if (!userId) { setError("You must be logged in to create a lawyer profile."); return; }
    if (!photoFile) { setError("Please upload a professional photo."); return; }
    if (!form.specialization) { setError("Please select a specialization."); return; }

    try {
      setUploadingPhoto(true);
      const photoUrl = await uploadToImgBB(photoFile);
      setUploadingPhoto(false);

      setSubmitting(true);
      await updateUserProfile({ role: "lawyer", userId });
      await createLawyerProfile({
        lawyerId: userId,
        photoUrl,
        name: form.name,
        specialization: form.specialization,
        bio: form.bio,
        fee: Number(form.fee),
        status: form.status,
      });

      onSuccess?.();
      router.push("/");
    } catch (err) {
      setError("Something went wrong while saving your profile. Please try again.");
    } finally {
      setUploadingPhoto(false);
      setSubmitting(false);
    }
  };

  const isBusy = uploadingPhoto || submitting;

  const inputClass = "h-12 w-full rounded-xl border border-[#1a4060] bg-[#0a121c]/80 px-3 text-sm text-white placeholder:text-gray-500 focus:border-[#814f30]/70 focus:outline-none transition-colors hover:border-[#814f30]/40";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#814f30]/40 bg-[#0a121c]">
          {photoPreview ? (
            <Image src={photoPreview} alt="Preview" width={96} height={96} className="size-full object-cover" />
          ) : (
            <span className="text-xs text-gray-500">No photo</span>
          )}
        </div>
        <label className="cursor-pointer text-sm font-medium text-[#c8956e] hover:text-[#814f30] transition-colors hover:underline">
          {photoFile ? "Change photo" : "Upload professional photo"}
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
          className={inputClass}
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
                  onClick={() => setForm((prev) => ({ ...prev, specialization: spec }))}
                  className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-[#814f30]/20 transition-colors"
                >
                  {spec}
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
          placeholder="Briefly describe your experience and expertise..."
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
          className={inputClass}
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

      {/* Error */}
      {error && (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        isDisabled={isBusy || sessionPending}
        className="mt-2 h-12 w-full rounded-xl bg-[#814f30] font-semibold text-white transition-all hover:bg-[#814f30]/80 active:scale-[0.98] disabled:opacity-50"
      >
        {uploadingPhoto ? "Uploading photo..." : submitting ? "Saving profile..." : "Submit"}
      </Button>
    </form>
  );
};

export default LawyerForm;