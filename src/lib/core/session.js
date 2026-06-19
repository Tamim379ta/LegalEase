import { authClient } from "../auth-client";

export const getUserSession = async () => {
  const session = await authClient.getSession();
  return session;
};