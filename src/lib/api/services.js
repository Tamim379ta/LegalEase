'use server'
import { serverFetch } from "../core/server"

export const services = async() => {
  return await serverFetch('/services/lawyers')
}