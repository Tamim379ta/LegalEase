'use server'

import { serverMutation } from "../core/server"
import { getUserSession } from "../core/session"

export const selectRole = async (userRole) => {
  const session = await getUserSession()
  console.log(session)
  const userId = session?.id
  console.log(userId)
  return await serverMutation(`/users/${userId}`, { role: userRole }, "PATCH")
}