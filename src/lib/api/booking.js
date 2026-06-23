"use server"
import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session"

export const bookingListById = async () => {
  const user = await getUserSession()
  const userId = user?.id
  return await serverFetch(`/bookings/${userId}`)
}

export  const  getAllBookings = async() => {
  return await serverFetch('/bookings')
}