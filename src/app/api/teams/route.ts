import { NextResponse } from "next/server";
import { prisma } from "prisma-client";

export async function GET() {
  try {
    const teams = await prisma.team.findMany();

    return NextResponse.json(teams);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch teams" }, { status: 500 });
  }
}
