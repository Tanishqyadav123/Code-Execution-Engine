import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
// Create a singleton :-

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({
  connectionString,
});
export const prismaSingleton = () => {
  return new PrismaClient({ adapter });
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
