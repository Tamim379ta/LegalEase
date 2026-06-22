"use server"

import { serverMutation } from "../core/server"

export const addServices = async (data) => {
  return await serverMutation(`/services`, data)
}