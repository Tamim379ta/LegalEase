"use server"
import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session"

export const getAllLawyers = async () => {
  return serverFetch('/lawyers')
}

export const featuredlawyers = async () => {
  return await serverFetch('/featuredlawyers');
}

export const getLawyerById = async () => {
  const user = await getUserSession()
  const userId = user?.id
  return await serverFetch(`/lawyers/${userId}`)
}

export const serviceById = async () => {
  const user = await getUserSession()
  const userId = user?.id
  return await serverFetch(`/services/lawyers/${userId}`)
}