import { PaginationInterfaceType } from "./common.interface";

export type ColumnNameInterface = { name: string; className?: string };

export interface ProblemCreatorType {
  id: string;
  firstName: string;
  lastName: string;
}
export interface SingleProblemInterface {
  id: number;
  name: string;
  statement: string;
  level: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creatorDetails: ProblemCreatorType;
}

export interface getProblemPaginationType extends PaginationInterfaceType {
  difficultyLevel?: string;
}
