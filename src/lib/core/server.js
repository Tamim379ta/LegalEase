const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const serverMutation = async (path, data, method = 'POST') => {

  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}