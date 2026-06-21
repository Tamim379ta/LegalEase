import { serverFetch } from "../core/server"

export const getAllLawyers = async () => {
  return serverFetch('/lawyers')
}