import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (prisma) => {
    await prisma.status.createMany({
      data: [
        {
          name: "Request pending",
          description: "Tek je poslao.",
        },
        {
          name: "Approved",
          description: "Posrecilo mu se.",
        },
        {
          name: "Rejected",
          description: "Ici ce svejedno.",
        },
      ],
    });

    await prisma.requestType.createMany({
      data: [
        {
          name: "Vacation",
        },
        {
          name: "Sick Leave",
        },
        {
          name: "Other",
        },
      ],
    });

    await prisma.role.createMany({
      data: [
        {
          name: "Admin",
        },
        {
          name: "Manager",
        },
        {
          name: "Employee",
        },
      ],
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
