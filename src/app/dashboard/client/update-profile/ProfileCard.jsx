import React from "react";
import Image from "next/image";
import { FaUserCircle, FaCalendarAlt, FaShieldAlt, FaBriefcase } from "react-icons/fa";
import { getUserSession } from "@/lib/core/session";
import { EditProfileModal } from "@/components/client/EditProfile";

const ProfilePage = async () => {
  const user = await getUserSession();
  const profileImage = user?.image || null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    // ✅ Removed min-h-screen, flex centering, max-w-md
    <div className="w-full bg-white rounded-2xl border border-[#1A2E44]/10 shadow-sm overflow-hidden">

      {/* Top banner */}
      <div className="h-24 bg-[#1A2E44] w-full" />

      {/* Profile header */}
      <div className="px-6 pb-6 relative flex flex-col items-center text-center">
        <div className="w-24 h-24 relative -mt-12 mb-3 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden flex items-center justify-center">
          {profileImage ? (
            <Image src={profileImage} alt="Profile Image" fill className="object-cover" />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-300" />
          )}
        </div>
        <h2 className="text-xl font-bold text-black tracking-tight">
          {user?.name || "No Name"}
        </h2>
        <p className="text-black/60 text-sm mt-0.5 font-medium">
          {user?.email || "No email available"}
        </p>
        <span className="mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border border-[#1A2E44]/30 text-[#1A2E44] bg-[#1A2E44]/5">
          {user?.role || "User"}
        </span>
      </div>

      {/* Info grid */}
      <div className="px-6 py-4 border-t border-b border-gray-100 bg-gray-50/50 space-y-3.5">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2.5 text-black/60">
            <FaBriefcase className="text-[#1A2E44]/70 text-base" />
            <span>Account Type</span>
          </div>
          <span className="font-semibold text-black capitalize">{user?.role || "Standard"}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2.5 text-black/60">
            <FaShieldAlt className="text-[#1A2E44]/70 text-base" />
            <span>Email Status</span>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
            user?.emailVerified
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-yellow-50 text-yellow-700 border border-yellow-200"
          }`}>
            {user?.emailVerified ? "Verified" : "Pending"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2.5 text-black/60">
            <FaCalendarAlt className="text-[#1A2E44]/70 text-base" />
            <span>Joined</span>
          </div>
          <span className="font-medium text-black">{formatDate(user?.createdAt)}</span>
        </div>
      </div>

      <div className="p-6 bg-white">
        <EditProfileModal initialUser={user} />
      </div>
    </div>
  );
};

export default ProfilePage;