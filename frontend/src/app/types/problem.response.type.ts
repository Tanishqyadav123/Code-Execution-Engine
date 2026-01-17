import { TestCaseType } from "../interface/problem.interface";
import { SingleProblemInterface } from "../interface/ProblemTable.interface";

export interface addNewProblemResponseType {
  problem: number;
}

export interface GetAllProblemsResponseType {
  data: SingleProblemInterface[];
  meta: MetaOffSetType;
}

export interface MetaOffSetType {
  mode: string;
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetSingleProblemWithTestCases extends SingleProblemInterface {
  testCases: TestCaseType[];
}
