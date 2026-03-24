'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import registerUser from "@/libs/registerUser"

export default function RegisterPage() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [telephone,setTelephone] = useState("")

  const router = useRouter()

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password, telephone)

      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/"
      })

      if(result?.error) {
        alert("Auto login failed")
        return
      }

      router.push("/")

    } catch (err:any) {
      alert(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-xl font-semibold">Register</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
      />

      <input
        placeholder="Telephone"
        value={telephone}
        onChange={(e)=>setTelephone(e.target.value)}
        className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
      />

      <button
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  )
}