import z from "zod";

export const CommonPaginationQuerySchema = z.object({
  page: z.string().transform((value) => parseInt(value)),
  limit: z.string().transform((value) => parseInt(value)),
  search: z.string().optional(),
});

export type CommonPaginationQuerySchemaType = z.infer<
  typeof CommonPaginationQuerySchema
>;
