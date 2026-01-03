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
  problems: any[];
  tableCaption?: string;
}) {
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
            <TableCell className="font-medium">{problem.difficulty}</TableCell>
            <TableCell>{problem.addDate}</TableCell>
            <TableCell>
              {problem.problem.length > 50
                ? problem.problem.slice(0, 50) + "..."
                : problem.problem}
            </TableCell>
            <TableCell className="text-right">
              {problem.inContest ? "Yes" : "No"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
