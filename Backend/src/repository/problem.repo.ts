import prisma, { PrismaTransactionalClient } from "../lib/db/client";
import { AddNewProblemSchemaType } from "../validation/problem.schema";

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
