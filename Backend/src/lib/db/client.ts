import { PrismaClient } from "../../../prisma/generate";
// Create a singleton :-
export const prismaSingleton = () => {
  return new PrismaClient();
};

type prismaSingletonType = ReturnType<typeof prismaSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: prismaSingletonType | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
