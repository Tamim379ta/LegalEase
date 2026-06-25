'use server'

import { serverFetch } from "../core/server"

export const getAllComments = async () => {
 return await serverFetch('/comments')
}