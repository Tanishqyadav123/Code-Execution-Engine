import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnNameInterface,
  SingleProblemInterface,
} from "../interface/ProblemTable.interface";
import { useRouter } from "next/navigation";

export function TableCommon({
  columnName,
  problems,
  tableCaption,
}: {
  columnName: ColumnNameInterface[];
  problems: SingleProblemInterface[];
  tableCaption?: string;
}) {
  console.log("Problems are  ", problems);
  const router = useRouter();

  return (
    <Table className="h-full m-auto w-full overflow-y-scroll ">
      {TableCaption && <TableCaption>{tableCaption}</TableCaption>}
      <TableHeader className="sticky">
        <TableRow>
          {columnName.map(({ name, className }) => {
            return (
              <TableHead key={name} className={`${className} `}>
                {name}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow
            onClick={() => router.push(`/problems/${problem.id}`)}
            className="h-[10vh] cursor-pointer"
            key={problem.id}
          >
            <TableCell className="font-medium">{problem.name}</TableCell>
            <TableCell>
              {problem.statement
                ? problem.statement.slice(0, 50) + "..."
                : problem.statement}
            </TableCell>
            <TableCell>{problem.level}</TableCell>
            <TableCell className="text-right">
              {problem.createdAt.split("T")[0]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
