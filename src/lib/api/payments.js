'use server'

import { protectedFetch } from "../core/server"

export const getAllPayments = async () => {
  return await protectedFetch('/payments')
}