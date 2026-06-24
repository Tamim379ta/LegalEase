'use server'

import { serverMutation } from "../core/server"

export const updateUserProfile = async (data) => {
  const targetUserId = data.userId;
  const payload = {
    role: data.role
  };
  return await serverMutation(`/users/${targetUserId}`, payload, "PATCH");
};
export const deleteUser = async ({ userId }) => {

  return await serverMutation(`/users/${userId}`, {}, "DELETE")
}