import z from "zod";

import { InputTestCasesSchema } from "./testCases.schema";
import { CommonPaginationQuerySchema } from "./pagination.schema";
import { LevelEnum } from "../src/generated/prisma/enums";

const getAllProblemList = z.object({
  level: z.enum(LevelEnum).optional(),
});

// Extending the Common Pagination Schema with get All Problem list schema
export const GetAllProblemListSchema = CommonPaginationQuerySchema.extend(
  getAllProblemList.shape
);

export const addNewProblemSchema = z.object({
  name: z.string().min(3, { error: "Problem Name atleast of 3 characters" }),
  statement: z
    .string()
    .min(10, { error: "Problem statement atleast of 10 characters" })
    .max(500, { error: "Problem statement atmost of 500 characters" }),
  level: z.enum(LevelEnum),
  testCases: z.array(
    z.object({
      inputCase: InputTestCasesSchema,
      outputCase: z.string(),
    })
  ),
});

export type GetAllProblemListSchemaType = z.infer<
  typeof GetAllProblemListSchema
>;
export type AddNewProblemSchemaType = z.infer<typeof addNewProblemSchema>;
