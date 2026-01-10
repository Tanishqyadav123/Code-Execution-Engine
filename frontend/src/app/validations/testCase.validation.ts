import z from "zod";

export const InputTestCasesSchema = z.object({
  testCase: z.string().nonempty({ error: "Input test case can not be empty" }),
  hidden: z.boolean(),
});
