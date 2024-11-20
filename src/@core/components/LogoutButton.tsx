"use client";

import { API_LOGOUT, LINK_LOGIN } from "@/@core/helpers/apiLinks";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(API_LOGOUT, { method: "POST" });
    router.push(LINK_LOGIN);
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-block  lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
    >
      Logout
    </button>
  );
}
