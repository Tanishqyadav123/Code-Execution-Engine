import z from "zod";
import { DifficultyLevelEnum } from "../entity/difficultyLevel.enum";
import { InputTestCasesSchema } from "./testCases.schema";

export const addNewProblemSchema = z.object({
  name: z.string().min(10),
  statement: z.string().min(10).max(500),
  level: z.enum(DifficultyLevelEnum),
  testCases: z.array(
    z.object({
      inputCase: InputTestCasesSchema,
      outputCase: z.string(),
    })
  ),
});

export type AddNewProblemSchemaType = z.infer<typeof addNewProblemSchema>;
