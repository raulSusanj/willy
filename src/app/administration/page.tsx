"use client";

import useSWR from "swr";
import fetcher from "../fetcher";
import { Role, Team, User } from "@prisma/client";
import { useState } from "react";
import Button from "@components/ui/Button";
import { deleteRole, deleteTeam, deleteUser } from "./actions";
import { TabContentListItem } from "./components/TabContentListItem";
import { useRouter } from "next/navigation";

export default function Employees() {
  const [activeTab, setActiveTab] = useState("employees");
  const router = useRouter();
  const { data: roles, error: rolesError, isLoading: rolesLoading } = useSWR<Role[]>("/api/roles", fetcher);
  const { data: teams, error: teamsError, isLoading: teamsLoading } = useSWR<Team[]>("/api/teams", fetcher);
  const { data: employees, error: employeesError, isLoading: employeesLoading } = useSWR<User[]>("/api/users", fetcher);

  if (rolesError || teamsError || employeesError) <p>{rolesError || teamsError || employeesError}</p>;
  if (rolesLoading || teamsLoading || employeesLoading) <p>Loading...</p>;

  const tabs = [
    { name: "employees", label: "Zaposlenici" },
    { name: "roles", label: "Uloge" },
    { name: "teams", label: "Timovi" },
  ];

  const creationButtonLabel =
    activeTab === "employees" ? "Dodaj zaposlenika" : activeTab === "roles" ? "Dodaj ulogu" : "Dodaj tim";

  function determineTabContent() {
    switch (activeTab) {
      case "employees":
        return (
          <div>
            {employees?.map((user) => (
              <TabContentListItem
                key={user.id}
                id={user.id}
                name={`${user.firstName} ${user.lastName}`}
                onDelete={(id) => {
                  deleteUser(String(id));
                }}
                modalTitle="Potvrda brisanja zaposlenika"
                modalText="Jeste li sigurni da želite obrisati ovog zaposlenika?"
              />
            ))}
          </div>
        );

      case "roles":
        return roles?.map((role) => (
          <TabContentListItem
            key={role.id}
            id={role.id}
            name={role.name}
            onDelete={(id) => {
              deleteRole(String(id));
            }}
            modalTitle="Potvrda brisanja uloge"
            modalText="Jeste li sigurni da želite obrisati ovu ulogu?"
          />
        ));
      case "teams":
        return teams?.map((team) => (
          <TabContentListItem
            key={team.id}
            id={team.id}
            name={team.name}
            onDelete={(id) => {
              deleteTeam(String(id));
            }}
            modalTitle="Potvrda brisanja tima"
            modalText="Jeste li sigurni da želite obrisati ovaj tim?"
          />
        ));
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Administracija</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            return (
              <button
                key={tab.name}
                className={`py-2 px-4 font-medium text-sm md:text-base ${
                  activeTab === tab.name
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className=" rounded-lg shadow-sm overflow-hidden">
          <div className="text-end">
            <Button
              onClick={() => router.push(`/administration/new-record?entity=${activeTab}`)}
              label={creationButtonLabel}
              themeType="secondary"
              className="m-3 "
            />
          </div>

          {tabs.map((tab) => {
            if (activeTab !== tab.name) return null;
            return (
              <div key={tab.name} className="p-4 md:p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{tab.label}</h2>
                <ul className="divide-y divide-gray-100">{determineTabContent()}</ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
