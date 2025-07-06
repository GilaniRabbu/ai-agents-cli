// components/SignInButton.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Welcome, {session.user?.name}</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  return <Button onClick={() => signIn("google")}>Sign in with Google</Button>;
}
