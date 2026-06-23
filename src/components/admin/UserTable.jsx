"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import { updateUserProfile, deleteUser } from "@/lib/action/userRole"; 

const roleStyles = {
  lawyer: {
    badge: "text-amber-700 border-amber-500/40 bg-amber-500/5",
    dot: "bg-amber-600",
  },
  client: {
    badge: "text-blue-700 border-blue-500/40 bg-blue-500/5",
    dot: "bg-blue-600",
  },
  admin: {
    badge: "text-purple-700 border-purple-500/40 bg-purple-500/5",
    dot: "bg-purple-600",
  },
};

const UserTable = ({ users: initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);

  const handleToggleRole = async (user) => {
    if (user.role?.toLowerCase() === "admin") {
      alert("System protection: Admin roles cannot be modified directly from this table.");
      return;
    }

    const currentId = user._id?.$oid || user._id;
    const newRole = user.role === "lawyer" ? "client" : "lawyer";

    try {
      await updateUserProfile({ userId: currentId, role: newRole });
      
      setUsers((prevUsers) =>
        prevUsers.map((u) => {
          const uId = u._id?.$oid || u._id;
          return uId === currentId ? { ...u, role: newRole } : u;
        })
      );
    } catch (error) {
      console.error("Failed to update role in DB:", error);
      alert("Could not update role on the server. Please check your connection.");
    }
  };

  const handleDelete = async (user) => {
    if (user.role?.toLowerCase() === "admin") {
      alert("System protection: Admin accounts cannot be deleted.");
      return;
    }

    const currentId = user._id?.$oid || user._id;
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;

    try {
      await deleteUser({ userId: currentId });
      
      setUsers((prevUsers) => prevUsers.filter((u) => (u._id?.$oid || u._id) !== currentId));
    } catch (error) {
      console.error("Failed to delete user from DB:", error);
      alert("Could not delete user from the server.");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1A2E44] mt-6 bg-white">
      <Table className="w-full text-left text-sm text-black" aria-label="User Management Table">
        <Table.ScrollContainer>
          <Table.Content aria-label="User List">
            {/* Header section matches your specific schema styling */}
            <Table.Header className="border-b border-[#1A2E44] text-xs font-bold uppercase tracking-wider text-black">
              <Table.Column className="p-4" isRowHeader>Name</Table.Column>
              <Table.Column className="p-4">Email Address</Table.Column>
              <Table.Column className="p-4">System Role</Table.Column>
              <Table.Column className="p-4 text-right">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {users.map((user) => {
                const userId = user._id?.$oid || user._id;
                const role = user.role?.toLowerCase() || "client";
                const styles = roleStyles[role] || roleStyles.client;
                const isAdmin = role === "admin";

                return (
                  <Table.Row key={userId} className="border-b border-[#1A2E44]/40 hover:bg-gray-50/50 transition-colors">
                    {/* User Name */}
                    <Table.Cell isRowHeader className="p-4 font-semibold text-black">
                      {user.name}
                    </Table.Cell>

                    {/* Email */}
                    <Table.Cell className="p-4 text-black/70">
                      {user.email}
                    </Table.Cell>

                    {/* Role Badge with matching Dot element */}
                    <Table.Cell className="p-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        {role}
                      </span>
                    </Table.Cell>

                    {/* Functional Action Buttons */}
                    <Table.Cell className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          isDisabled={isAdmin}
                          onClick={() => handleToggleRole(user)}
                          className={`h-8 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                            isAdmin 
                              ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed" 
                              : "border-[#1A2E44] text-black hover:bg-gray-100"
                          }`}
                        >
                          Change Role
                        </Button>
                        <Button
                          isDisabled={isAdmin}
                          onClick={() => handleDelete(user)}
                          className={`h-8 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                            isAdmin 
                              ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed" 
                              : "border-red-500/40 bg-red-500/5 text-red-700 hover:bg-red-500/10"
                          }`}
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>

      {/* Empty state component fallback */}
      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-black/60 bg-white">
          <p className="text-sm font-medium">No system users registered.</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;