'use server'
import { serverMutation } from "../core/server"
import { getUserSession } from "../core/session"



export const editLawyerProfile = async (data) => {
  const user = await getUserSession()
  const userId = user?.id
  return await serverMutation(`/lawyers/${userId}`, data, "PATCH")
}

export const editLawyerServices = async (id, data) => {
  return await serverMutation(`/services/lawyers/${id}`, data, "PATCH")
}

export const deleteLawyerServices = async (id) => {
  return await serverMutation(`/services/lawyers/${id}`, {},  "DELETE")
}

export const deleteLawyer = async (id) => {
  return await serverMutation(`/lawyers/${id}` , {} , 'DELETE')
}