"use client";

import { showToast } from "@/@core/components/ToastComponent";
import {
  API_LOGIN,
  LINK_ADMIN_POST,
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

    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Login failed. Please try again.");
      }

      // Redirect based on role
      if (result?.data?.role === USER_ROLE.REGULAR) {
        router.push(LINK_USER_POST);
      } else if (result?.data?.role === USER_ROLE.ADMIN) {
        router.push(LINK_ADMIN_POST);
      }

      // Show success toast and refresh
      showToast("success", result?.message);
      router.refresh();
    } catch (err: any) {
      // Handle client-side errors or server-side error messages
      console.error("Login Error:", err);
      showToast("error", err?.message || "An unexpected error occurred.");
    }
  }

  return (
    <main>
      <h3 className="text-4xl text-center my-4">Login Page</h3>
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
    </main>
  );
}
