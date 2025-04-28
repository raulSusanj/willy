import SignInButton from "@components/SignInButton";
import { getProviders } from "next-auth/react";

export default async function SignIn() {
  const providers = await getProviders();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-8 space-y-6">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <SignInButton provider={provider} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
