import prisma, { PrismaTransactionalClient } from "../lib/db/client";
import { Prisma } from "../src/generated/prisma/client";
import { QueryMode } from "../src/generated/prisma/internal/prismaNamespace";
import {
  buildMetaOffset,
  getTotalProblems,
  withPagination,
} from "../utils/pagination.utils";
import { CommonPaginationQuerySchemaType } from "../validation/pagination.schema";
import {
  AddNewProblemSchemaType,
  GetAllProblemListSchemaType,
} from "../validation/problem.schema";

export const IsProblemNameAlreadyExist = async (name: string) => {
  return (await prisma.problem.findFirst({
    where: {
      name,
    },
  }))
    ? true
    : false;
};

export const addProblemToDb = async (
  data: AddNewProblemSchemaType,
  userId: string
) => {
  const { level, name, statement, testCases } = data;
  return await prisma.$transaction(async (tx) => {
    const problemDetails = await tx.problem.create({
      data: {
        level,
        name,
        statement,
        createdBy: userId,
      },
    });

    const problemId = problemDetails.id;

    // Creating an entry for input test cases and corresponding output test cases :-

    const bulkInputTestCaseCreate = testCases.map(({ inputCase }) => ({
      ...inputCase,
      testCase: inputCase.testCase.trim(),
      problemId: problemId,
    }));

    const createdInputCases = await tx.inputTestCases.createManyAndReturn({
      data: bulkInputTestCaseCreate,
    });

    // Create the bulk insert data for output test cases :-
    const bulkOutputTestCases = testCases
      .map(({ inputCase, outputCase }) => ({
        inputTestId:
          createdInputCases.find(
            (x) =>
              x.hidden === inputCase.hidden &&
              x.testCase.trim() === inputCase.testCase.trim()
          )?.id || 0,
        testCase: outputCase,
      }))
      .filter((x) => x.inputTestId !== 0);

    // Finally Create the output test Cases :-
    await tx.outputTestCases.createMany({
      data: bulkOutputTestCases,
    });

    return problemId;
  });
};

export const getAllProblemList = async ({
  limit,
  page,
  search,
  level,
}: GetAllProblemListSchemaType) => {
  const offset = (page - 1) * limit;

  let conditions: Prisma.ProblemWhereInput[] = [];
  if (search) {
    let ORConditions = [];

    let searchConditionForProblemName = {
      name: {
        contains: search,
        mode: QueryMode.insensitive,
      },
    };

    let searchConditionForCreatorName = {
      creatorDetails: {
        OR: [
          {
            firstName: {
              contains: search,
              mode: QueryMode.insensitive,
            },
          },
          {
            lastName: {
              contains: search,
              mode: QueryMode.insensitive,
            },
          },
        ],
      },
    };

    ORConditions.push(searchConditionForProblemName);
    ORConditions.push(searchConditionForCreatorName);
    conditions.push({ OR: ORConditions });
  }

  if (level) {
    const levelConditions = {
      level: level,
    };
    conditions.push(levelConditions);
  }
  const allProblems = await prisma.problem.findMany({
    include: {
      creatorDetails: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    where: conditions.length ? { AND: conditions } : undefined,
    orderBy: {
      id: "desc",
    },
    skip: offset,
    take: limit,
  });

  const total = await getTotalProblems(conditions);

  const meta = buildMetaOffset({
    page,
    limit,
    total,
  });

  return withPagination(allProblems, meta);
};
