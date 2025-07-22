"use client";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createNewEmployee, createNewRole, createNewTeam } from "./actions";

export default function NewRecord() {
  const [entityValue, setEntityValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const entity = searchParams.get("entity");

  const handleNewEntry = async () => {
    switch (entity) {
      case "teams":
        await createNewTeam(entityValue);
        return router.back();
      case "roles":
        await createNewRole(entityValue);
        return router.back();
      case "employees":
        return await createNewEmployee();
      default:
        return;
    }
  };

  const inputLabel = entity === "roles" ? "Naziv uloge" : "Naziv tima";
  const buttonLabel = entity === "roles" ? "Dodaj novu ulogu" : "Dodaj novi tim";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-end">
        <Input label={inputLabel} value={entityValue} onChangeValue={(e) => setEntityValue(e.target.value)} />
        <Button label={buttonLabel} className="ml-2" onClick={() => handleNewEntry()} />
      </div>
    </div>
  );
}
