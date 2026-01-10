import z from "zod";
import { DifficultyLevelEnum } from "../entity/difficultyLevel.enum";
import { InputTestCasesSchema } from "./testCase.validation";

export const addNewProblemSchema = z.object({
  name: z.string().min(3, { error: "Problem Name atleast of 3 characters" }),
  statement: z
    .string()
    .min(10, { error: "Problem statement atleast of 10 characters" })
    .max(500, { error: "Problem statement atmost of 500 characters" }),
  level: z.enum(DifficultyLevelEnum),
  testCases: z
    .array(
      z.object({
        inputCase: InputTestCasesSchema,
        outputCase: z.string().nonempty({error : "Output test case can not be empty"}),
      })
    )
    .min(1, { error: "Add atleast 1 test case for problem" }),
});

export type AddNewProblemSchemaType = z.infer<typeof addNewProblemSchema>;
