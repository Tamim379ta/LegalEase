"use server"
import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session"

export const getAllLawyers = async ({ search = '', category = '', page = 1 } = {}) => {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (category) params.set('category', category)
  params.set('page', page)
  params.set('limit', 8)

  const query = params.toString()
  return serverFetch(`/lawyers${query ? `?${query}` : ''}`)
}

export const manageLawyers = async () => {
  return await serverFetch('/manage-lawyers')
}

export const topLawyers = async () => {
  return await serverFetch('/top-lawyers')
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