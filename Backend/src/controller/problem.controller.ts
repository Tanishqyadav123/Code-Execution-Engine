import { asyncHandler } from "../handler/async.handler";
import { errorHandler } from "../handler/error.handler";
import { responseHandler } from "../handler/response.handler";
import prisma from "../lib/db/client";
import {
  addProblemToDb,
  getAllProblemList,
  IsProblemNameAlreadyExist,
} from "../repository/problem.repo";
import {
  addNewProblemSchema,
  GetAllProblemListSchema,
} from "../validation/problem.schema";

export const addNewProblem = asyncHandler(async (req, res) => {
  const { success, data } = addNewProblemSchema.safeParse(req.body);

  if (!success) {
    errorHandler(res, "Validation Failed", 400);
    return;
  }

  // Check if the problem with same name already exist :-
  const isExist = await IsProblemNameAlreadyExist(data.name);

  if (isExist) {
    return errorHandler(res, "Problem with same name already exist", 409);
  }

  if (!data.testCases || (data.testCases && !data.testCases.length)) {
    return errorHandler(res, "Please Provide atleast 1 test case", 400);
  }

  // Create a function for creating the problem within a txn :-
  const problemId = await addProblemToDb(data, req.user?.id!);

  return responseHandler(res, "Problem added successfully", 201, {
    problem: problemId,
  });
});

// Controller for get All Problem Listing API :-
export const getAllProblems = asyncHandler(async (req, res) => {
  const { success, data, error } = GetAllProblemListSchema.safeParse(req.query);

  console.log(req.query);
  if (!success) {
    console.log(error, data);
    errorHandler(res, "Invalid Query Schema", 400);
    return;
  }

  const allProblems = await getAllProblemList(data);

  return responseHandler(res, "All Problem listing", 200, allProblems);
});
