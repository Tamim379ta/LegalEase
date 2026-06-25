'use server'

import { serverMutation } from "../core/server"

export const postComment = async (data) => {
  return await serverMutation('/comments', data)
}