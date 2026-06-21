'use server'
import { serverMutation } from "../core/server"
import { getUserSession } from "../core/session"

export const sendBooking = async (data) => {
  return await serverMutation(`/bookings`, data)
}

export const handleRequest = async (id, status) => {
  const user = await getUserSession()
  const userId = user?.id
  return await serverMutation(`/bookings/${id}`, status, "PATCH" )
}