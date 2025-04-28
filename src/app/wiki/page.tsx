import { prisma } from "../prisma-client";

export default async function Wiki() {
  const roles = await prisma.role.findMany();
  if (!roles || roles.length === 0) {
    return <p data-testid="no-roles">No roles found</p>;
  }
  return (
    <div data-testid="roles-list">
      {roles &&
        roles.map((role) => {
          return (
            <p key={role.id} data-testid={`role-${role.id}`}>
              {role.name}
            </p>
          );
        })}
    </div>
  );
}
