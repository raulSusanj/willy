import { prisma } from "@components/app/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roles = await prisma.role.findMany();

    return NextResponse.json(roles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch roles" }, { status: 500 });
  }
}
