'use server'
import { protectedFetch} from "../core/server"

export const services = async() => {
  return await protectedFetch('/services/lawyers')
}