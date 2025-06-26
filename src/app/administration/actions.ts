import { NextResponse } from "next/server";
import { prisma } from "../prisma-client";

export async function deleteTeam(teamId: string) {
  try {
    if (!teamId) {
      return NextResponse.json({ message: "Team ID is required" }, { status: 400 });
    }

    const deletedTeam = await prisma.team.delete({
      where: { id: teamId },
    });
    console.log("Deleted team:", deletedTeam);
    return NextResponse.json({ message: `Team ${deletedTeam.name} deleted successfully` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete team" }, { status: 500 });
  }
}
