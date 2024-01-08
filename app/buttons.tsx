"use client";

import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="border rounded-md px-3 py-1 text-sm"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <button
      className="border rounded-md px-3 py-1 text-sm"
      onClick={() => signIn("github")}
    >
      sign in with github
    </button>
  );
}
