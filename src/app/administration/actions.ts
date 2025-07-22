"use server";

import { NextResponse } from "next/server";
import { prisma } from "../prisma-client";

export async function deleteTeam(teamId: string) {
  try {
    if (!teamId) {
      return NextResponse.json({ message: "Team ID is required" }, { status: 400 });
    }
    const deletedTeam = await prisma.team.delete({
      where: {
        id: teamId,
      },
    });
    console.log("Deleted team:", deletedTeam);
    NextResponse.json({ message: `Team ${deletedTeam.name} deleted successfully` });
    return deletedTeam.id;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete team" }, { status: 500 });
  }
}

export async function deleteRole(roleId: string) {
  try {
    if (!roleId) {
      return NextResponse.json({ message: "Role ID is required" }, { status: 400 });
    }
    const deletedRole = await prisma.role.delete({
      where: {
        id: roleId,
      },
    });
    console.log("Deleted role:", deletedRole);
    return NextResponse.json({ message: `Role ${deletedRole.name} deleted successfully` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete role" }, { status: 500 });
  }
}

export async function deleteUser(userId: string) {
  try {
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    console.log("Deleted user:", deletedUser);
    return NextResponse.json({ message: `User ${deletedUser.firstName} ${deletedUser.lastName} deleted successfully` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
