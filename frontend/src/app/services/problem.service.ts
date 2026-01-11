import axios from "axios";
import { AddNewProblemSchemaType } from "../validations/problem.validation";
import { getToken } from "./auth.service";
import { ApiResponse } from "../types/api";
import {
  addNewProblemResponseType,
  GetAllProblemsResponseType,
} from "../types/problem.response.type";
import {
  getProblemPaginationType,
  SingleProblemInterface,
} from "../interface/ProblemTable.interface";
import { DifficultyLevelEnum } from "../entity/difficultyLevel.enum";

const token = getToken();
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getProblemListService = async ({
  limit,
  page,
  difficultyLevel,
  search = "",
}: getProblemPaginationType) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (difficultyLevel && difficultyLevel !== DifficultyLevelEnum.All)
    params.append("level", difficultyLevel.toString());
  if (search) params.append("search", search.toString());

  const response = await axios.get(
    `${BACKEND_BASE_URL}/problem?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as ApiResponse<GetAllProblemsResponseType>;
};
export const addNewProblemService = async (
  addNewProblem: AddNewProblemSchemaType
) => {
  const response = await axios.post(
    `${BACKEND_BASE_URL}/problem`,
    addNewProblem,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as ApiResponse<addNewProblemResponseType>;
};
