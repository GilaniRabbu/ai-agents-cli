"use client";

// import { signIn } from "next-auth/react";

export default function HeroSection() {
  //   const handleGoogleLogin = () => {
  //     signIn("google");
  //   };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6">
      <div className="text-center text-white max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          Unlock the Power of <span className="text-blue-400">AI Agents</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-300">
          Sign in with Google to access all our intelligent agent tools,
          designed to boost your productivity and innovation.
        </p>
        <button
          //   onClick={handleGoogleLogin}
          className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300 shadow-lg"
        >
          🔐 Sign in with Google
        </button>
      </div>
    </section>
  );
}
