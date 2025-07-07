"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome, {session.user?.name}
          </h1>
          <Button onClick={() => signOut()} className="cursor-pointer">
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          Unlock the Power of <span className="text-blue-600">AI Agents</span>
        </h1>
        <p className="text-lg mb-8 text-balance text-gray-700">
          Sign in with Google to access all our intelligent agent tools,
          designed to boost your productivity and innovation.
        </p>
        <Button className="cursor-pointer" onClick={() => signIn("google")}>
          Sign in with Google
        </Button>
      </div>
    </section>
  );
}
