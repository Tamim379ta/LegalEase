import { protectedFetch } from './../core/server';


export const getAllUsers = async () => {
  return await protectedFetch('/users')
}