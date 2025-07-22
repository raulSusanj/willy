"use client";
import Link from "next/link";
import Button from "./components/ui/Button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>This is the Willy vaccation app</h1>
      <p>{JSON.stringify(session, null, 2)}</p>
      <Link href="/signin">
        <Button label="Sign in" themeType="secondary" />
      </Link>
    </div>
  );
}
