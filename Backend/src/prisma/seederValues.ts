import { SeedRoleType } from "../interfaces/seeder.interface";
import { UserRoleType } from "../entity/userRole.enum";

export const RoleDataToSeed: SeedRoleType = [
  {
    roleName: UserRoleType.Solver,
  },
  {
    roleName: UserRoleType.ProblemSetter,
  },
];
