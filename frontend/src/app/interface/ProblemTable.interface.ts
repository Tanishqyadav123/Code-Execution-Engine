export type ColumnNameInterface = { name: string; className?: string };

export interface SingleProblemInterface {
  id: number;
  difficulty: string;
  addDate: string;
  problem: string;
  inContest: boolean;
}
