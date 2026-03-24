"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      className="cursor-pointer text-blue-700"
      onClick={() => signOut({ redirectTo: "/login" })}
    >
      log out
    </button>
  );
}

export default LogoutButton;
