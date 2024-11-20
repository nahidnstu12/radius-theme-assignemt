"use client";
import {
  API_LOGIN,
  LINK_ADMIN_POST,
  LINK_LOGIN,
  LINK_USER_POST,
} from "@/@core/helpers/apiLinks";
import { USER_ROLE } from "@/@core/helpers/enum";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (result?.data?.role === USER_ROLE.REGULAR) {
      router.push(LINK_USER_POST);
    } else if (result?.data?.role === USER_ROLE.ADMIN) {
      router.push(LINK_ADMIN_POST);
    } else {
      router.push(LINK_LOGIN);
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-500 rounded"
      >
        Login
      </button>
    </form>
  );
}
