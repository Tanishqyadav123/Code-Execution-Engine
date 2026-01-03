import z from "zod";

export const InputTestCasesSchema = z.object({
     testCase : z.string(),
     hidden : z.boolean().default(true)
})