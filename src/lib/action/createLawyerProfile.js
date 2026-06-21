'use server'
import { serverMutation } from "../core/server"

export const createLawyerProfile = async (data) => {
  return await serverMutation('/lawyers' , data)
}