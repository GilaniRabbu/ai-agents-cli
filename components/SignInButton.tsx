"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome,{" "}
            <span className="font-semibold text-primary">
              {session.user?.name}
            </span>
          </h1>
          <Button
            onClick={() => signOut()}
            className="cursor-pointer bg-white text-stone-950"
          >
            Sign out
          </Button>
        </div>
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
        <Button
          className="cursor-pointer bg-white text-stone-950"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </Button>
      </div>
    </section>
  );
}
