import { OffsetMetaType } from "../interfaces/pagination.interface";
import prisma from "../lib/db/client";
import { Prisma } from "../src/generated/prisma/client";

// Function for building the OffsetMetaData :-
export const buildMetaOffset = (args: {
  page: number;
  limit: number;
  total: number;
  sort?: "asc" | "desc";
  orderBy?: "createdAt" | "id";
}): OffsetMetaType => {
  const { limit, page, total, orderBy, sort } = args;
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;
  const hasNextPage = totalPages > 0 && page < totalPages;
  const hasPrevPage = page > 1;
  return {
    mode: "offset",
    page,
    perPage: limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    orderBy,
    sort,
  };
};

export type Paginated<T, M extends OffsetMetaType> = {
  data: T[];
  meta: M;
};

export function withPagination<T, M extends OffsetMetaType>(
  data: T[],
  meta: M
): Paginated<T, M> {
  return { data, meta };
}

// Get Total Problems :-
export const getTotalProblems = async (
  conditions: Prisma.ProblemWhereInput[] = []
) => {
  const total = await prisma.problem.count({
    where: {
      AND: conditions,
    },
  });

  return total;
};
