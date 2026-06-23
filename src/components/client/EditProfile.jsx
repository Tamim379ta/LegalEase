"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserEdit } from "react-icons/fa";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { updateUserProfile } from "@/lib/action/userRole";

export function EditProfileModal({ initialUser }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(initialUser?.name || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(initialUser?.image || "");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // ✅ live preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedImageUrl = initialUser?.image || "";

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          uploadedImageUrl = data.data.url;
        } else {
          throw new Error(data.error?.message || "ImgBB upload failed");
        }
      }

      await updateUserProfile({ name, image: uploadedImageUrl });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        onPress={() => setIsOpen(true)}
        className="w-full h-10 rounded-xl bg-[#1A2E44] text-white font-semibold text-sm shadow-sm hover:bg-[#1A2E44]/90 transition-all"
      >
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-[#1A2E44]/10 text-[#1A2E44]">
                <FaUserEdit className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Profile</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update your name or avatar asset down below.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id="modal-profile-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Full Name — HeroUI is fine here */}
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </TextField>

                  {/* Profile Picture — native input, HeroUI breaks file display */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Profile Picture</label>

                    {/* Avatar preview */}
                    {preview && (
                      <img
                        src={preview}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#1A2E44]/20"
                      />
                    )}

                    <label className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-xl border border-dashed border-[#1A2E44]/30 bg-[#1A2E44]/5 hover:bg-[#1A2E44]/10 transition-all">
                      <span className="text-xs font-semibold text-[#1A2E44] bg-[#1A2E44]/10 px-3 py-1.5 rounded-lg">
                        Choose File
                      </span>
                      <span className="text-sm text-gray-500 truncate">
                        {selectedFile ? selectedFile.name : "No file chosen"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onPress={() => setIsOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="modal-profile-form"
                className="bg-[#1A2E44] text-white font-semibold hover:bg-[#1A2E44]/90"
                isLoading={loading}
                disabled={loading}
              >
                Save Changes
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}