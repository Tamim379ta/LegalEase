'use server'

import { serverMutation } from "../core/server"
import { getUserSession } from "../core/session";

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

export const updateUserProfileWithImage = async (data) => {
  const session = await getUserSession()
  const userId = session?.id;

  return await serverMutation(`/users/${userId}`, { name: data.name, image: data.image }, "PATCH");
};