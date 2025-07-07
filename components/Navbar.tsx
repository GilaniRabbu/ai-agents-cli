"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-wrap gap-5 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
          ArkLab
        </Link>

        {/* Navigation Links + Auth Button */}
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="font-medium transition text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/ai-agents"
            className="font-medium transition text-gray-700 hover:text-blue-600"
          >
            AI Agents
          </Link>

          {session ? (
            <Button className="cursor-pointer" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Button className="cursor-pointer" onClick={() => signIn("google")}>
              Sign in
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
