// components/SignInButtons.tsx
"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

interface ProviderI {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignInButton({ provider }: { provider: ProviderI }) {
  const handleSignIn = async () => {
    const res = await signIn(provider.id);
    if (res?.error) {
      console.error("Error signing in:", res.error);
    } else {
      console.log("Sign in successful:", res);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div key={provider.name}>
        <button
          onClick={() => handleSignIn()}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {provider.id === "google" && <FcGoogle className="h-5 w-5 mr-2" />}
          {provider.id === "azure-ad" && <FaMicrosoft className="h-5 w-5 mr-2 text-blue-600" />}
          Continue with {provider.name}
        </button>
      </div>
    </div>
  );
}
