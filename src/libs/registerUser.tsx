import { getApiUrl } from "./api"

export default async function registerUser(
  name: string,
  email: string,
  password: string,
  telephone: string
) {
  const res = await fetch(`${getApiUrl()}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, telephone })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Register failed")
  }

  return data
}