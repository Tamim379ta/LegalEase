'use server'

import { getUserToken } from "./session"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const authHeader = async () => {
  const token = await getUserToken()
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};

  return header;
}

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json()
}

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader()
  });
  return res.json()

}

export const serverMutation = async (path, data, method = 'POST') => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: method,
      headers: {
        'Content-type': 'application/json',
        ... await authHeader()
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorText = await res.text(); // Read the HTML error page as text
      console.error(`Backend returned status ${res.status}:`, errorText);
      throw new Error(`Server responded with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch implementation failed:", error);
    throw error;
  }
}