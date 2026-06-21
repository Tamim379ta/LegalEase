'use server'

import { serverMutation } from "../core/server"
import { getUserSession } from "../core/session"

export const selectRole = async (userRole) => {
  const session = await getUserSession()
  const userId = session?.id
  return await serverMutation(`/users/${userId}`, { role: userRole }, "PATCH")
}