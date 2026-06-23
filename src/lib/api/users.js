import { serverFetch } from './../core/server';


export const getAllUsers = async () => {
  return await serverFetch('/users')
}