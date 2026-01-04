"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Navbar } from "../appComponents/Navbar";
import { TableCommon } from "../appComponents/Table.Common";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { difficultyOptions } from "../constants/difficultyLevel";
import { CommonSelect } from "../appComponents/Select.Common";
import { Button } from "@/components/ui/button";
import { useDebounce } from "../hooks/useDebounce";
import { SingleProblemInterface } from "../interface/ProblemTable.interface";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth.context";
import { RoleType } from "../entity/role.enum";
function page() {
  const [difficulties, setDifficulties] = useState(difficultyOptions);
  const [search, setSearch] = useState("");
  const [difficultyLevel, setDifficultLevel] = useState("");
  const {userDetails} = useAuth()
  const router = useRouter();

  let problems: SingleProblemInterface[] = [
    {
      id: 1,
      difficulty: "Easy",
      addDate: "2025-01-01",
      problem: "Two Sum Variants",
      inContest: true,
    },
    {
      id: 2,
      difficulty: "Medium",
      addDate: "2025-01-03",
      problem: "Maximum Subarray Sum",
      inContest: false,
    },
    {
      id: 3,
      difficulty: "Hard",
      addDate: "2025-01-05",
      problem: "Graph Shortest Path",
      inContest: true,
    },
    {
      id: 4,
      difficulty: "Easy",
      addDate: "2025-01-07",
      problem: "Array Rotation",
      inContest: false,
    },
    {
      id: 5,
      difficulty: "Medium",
      addDate: "2025-01-10",
      problem: "Binary Search on Answer",
      inContest: true,
    },
    {
      id: 6,
      difficulty: "Hard",
      addDate: "2025-01-12",
      problem: "Dynamic Programming on Trees",
      inContest: false,
    },
    {
      id: 7,
      difficulty: "Medium",
      addDate: "2025-01-15",
      problem: "Greedy Interval Scheduling",
      inContest: true,
    },
  ];
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    console.log({ debouncedValue, difficultyLevel }, "Print");
  }, [debouncedValue, difficultyLevel]);
  return (
    <div className=" flex justify-between gap-5 h-screen w-[90vw] ">
      <Navbar />

      <div className="w-full mt-12">
        <h1 className="text-2xl font-light my-2">Problems</h1>
        <hr />

        <div className="filters m-5 flex items-center justify-between ">
          <div className="grid gap-2 w-[30vw]">
            <Input
              id="search-problem"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              required
              value={search}
            />
          </div>

          <div className="grid gap-2 w-[20vw]">
            <CommonSelect
              options={difficulties.map((difficulty) => difficulty)}
              onChange={setDifficultLevel}
              value={difficultyLevel}
              placeholder="Select the Difficulty Level"
            />
          </div>
          { userDetails?.RoleDetails.roleName === RoleType.PROBLEM_SETTER && <Button onClick={() => router.push("add-problem")}>
            <span className="text-xl">+</span> New Problem
          </Button>}
        </div>

        <div className="problem-table mt-5 w-full h-full">
          <TableCommon
            columnName={[
              {
                name: "Difficulty",
                className: "w-[300px]",
              },
              {
                name: "Add Date",
                className: "w-[300px]",
              },
              {
                name: "Problem",
                className: "w-[300px]",
              },
              {
                name: "In Contest",
                className: "text-right",
              },
            ]}
            problems={problems}
            tableCaption="List of Problems"
          />
        </div>
      </div>
    </div>
  );
}

export default page;
