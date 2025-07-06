"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white px-6 py-3 shadow-sm">
        <p className="text-sm font-medium text-gray-700">
          Welcome,{" "}
          <span className="font-semibold text-primary">
            {session.user?.name}
          </span>
        </p>
        <Button
          onClick={() => signOut()}
          className="rounded-md cursor-pointer bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6">
      <div className="text-center text-white max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          Unlock the Power of <span className="text-blue-400">AI Agents</span>
        </h1>
        <p className="text-lg mb-8 text-gray-300">
          Sign in with Google to access all our intelligent agent tools,
          designed to boost your productivity and innovation.
        </p>
        <Button className="cursor-pointer" onClick={() => signIn("google")}>
          🔐 Sign in with Google
        </Button>
      </div>
    </section>
  );
}
