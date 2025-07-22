"use server";
import { NextResponse } from "next/server";
import { prisma } from "../../prisma-client";

export async function createNewTeam(teamName: string) {
  try {
    console.log({ teamName });
    const newTeam = await prisma.team.create({
      data: {
        name: teamName,
      },
    });
    NextResponse.json({ message: `Team ${newTeam.name} created successfully` });
    return newTeam;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create team" }, { status: 500 });
  }
}
export async function createNewRole(roleName: string) {
  try {
    const newRole = await prisma.role.create({
      data: {
        name: roleName,
      },
    });
    NextResponse.json({ message: `Role ${newRole.name} created successfully` });
    return newRole;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create role" }, { status: 500 });
  }
}
export async function createNewEmployee() {
  console.log("Creating new employee...");
}
