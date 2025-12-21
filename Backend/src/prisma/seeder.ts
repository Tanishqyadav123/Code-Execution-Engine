import { SeedRoleType } from "../interfaces/seeder.interface";
import { DefaultArgs } from "@prisma/client/runtime/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { RoleDataToSeed } from "./seederValues";
import "dotenv/config";
const connectionString = `${process.env.DATABASE_URL}`;

console.log("connectionString ", connectionString);
const adapter = new PrismaPg({
  connectionString,
});

const prismaClient = new PrismaClient({ adapter });

// Function for seeding the roles :-
async function seedRole(
  data: SeedRoleType,
  tx: Omit<
    PrismaClient<never, undefined, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
  >
) {
  await tx.role.createMany({
    data,
  });
}

async function main() {
  console.log("Seeder Started");

  await prismaClient.$transaction(async (tx) => {
    return await seedRole(RoleDataToSeed, tx);
  });
}
main();
