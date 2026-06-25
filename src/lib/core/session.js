'use server'
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const requireRole = async (role) => {
  const user = await getUserSession()
  if (!user) {
    redirect('/signIn')
  }
  if (user.role !== role) {
    return redirect('/unauthorized')
  }
}

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session?.session?.token)
  return session?.session?.token;
};