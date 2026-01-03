import { createNewUserType } from "../interfaces/auth.interface";
import prisma from "../lib/db/client";

export const isEmailExist = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      RoleDetails: true,
    },
  });
};

export const createNewUser = async (data: createNewUserType) => {
  await prisma.user.create({
    data,
  });
};

export const getUserDetails = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      RoleDetails: {
        select: {
          id: true,
          roleName: true,
        },
      },
    },
  });
};
