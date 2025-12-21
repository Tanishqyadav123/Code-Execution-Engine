import prisma from "../lib/db/client";

export const getAllRolesDropDown = async () => {
  return await prisma.role.findMany({
    select: {
      id: true,
      roleName: true,
    },
  });
};
