"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ArkLab
          </Link>
          {session?.user?.name && (
            <p className="text-gray-600 font-medium">
              Welcome, {session.user.name}
            </p>
          )}
        </div>

        {/* Right: Navigation Links + Auth Button */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            href="/ai-agents"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            AI Agents
          </Link>

          {session ? (
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => signOut()}
            >
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
