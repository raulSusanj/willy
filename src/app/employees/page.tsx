"use client";

import useSWR from "swr";
import fetcher from "../fetcher";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Employees() {
  const { data: roles, error: rolesError, isLoading } = useSWR<Role[]>("/api/roles", fetcher);
  const session = useSession();
  console.log("session", session);

  if (rolesError) <p>{rolesError}</p>;
  if (isLoading) <p>Loading...</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>This is the employees page.</h1>
      <button onClick={() => alert("banana")}>Banana</button>
      {roles &&
        roles.map((role) => {
          return <p key={role.id}>{role.name}</p>;
        })}
    </div>
  );
}
