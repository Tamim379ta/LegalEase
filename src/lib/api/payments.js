'use server'

import { serverFetch } from "../core/server"

export const getAllPayments = async () => {
  return await serverFetch('/payments')
}