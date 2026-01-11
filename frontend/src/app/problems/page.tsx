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
import {
  getProblemPaginationType,
  SingleProblemInterface,
} from "../interface/ProblemTable.interface";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth.context";
import { RoleType } from "../entity/role.enum";
import { getProblemListService } from "../services/problem.service";
import { DifficultyLevelEnum } from "../entity/difficultyLevel.enum";
import { DynamicPagination } from "../appComponents/DynamicPagination";
function page() {
  const [difficulties, setDifficulties] = useState(
    Object.values(DifficultyLevelEnum).map((value) => ({
      value: value,
      label: value,
    }))
  );
  const [search, setSearch] = useState("");
  const [difficultyLevel, setDifficultLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(true);

  const [problems, setProblems] = useState<SingleProblemInterface[]>([]);
  const { userDetails } = useAuth();
  const router = useRouter();

  const debouncedValue = useDebounce(search, 500);

  const getProblemData = async ({
    limit,
    page,
    difficultyLevel,
    search,
  }: getProblemPaginationType) => {
    try {
      const responseData = await getProblemListService({
        limit,
        page,
        difficultyLevel,
        search,
      });

      if (responseData.data && responseData.data && responseData.success) {
        setProblems(responseData.data.data);

        if (responseData.data.meta) {
          console.log("meta ", { meta: responseData.data.meta });
          setHasNextPage(responseData.data.meta.hasNextPage);
          setHasPrevPage(responseData.data.meta.hasPrevPage);
          setTotalPage(responseData.data.meta.totalPages);
          setCurrentPage(responseData.data.meta.page);
          setLimit(responseData.data.meta.perPage);
        }
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getProblemData({
      page: currentPage,
      limit,
      difficultyLevel,
      search: debouncedValue,
    });
  }, [debouncedValue, difficultyLevel, currentPage]);
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
          {userDetails?.RoleDetails.roleName === RoleType.PROBLEM_SETTER && (
            <Button onClick={() => router.push("add-problem")}>
              <span className="text-xl">+</span> New Problem
            </Button>
          )}
        </div>

        <div className="problem-table mt-5 w-full h-full">
          <TableCommon
            columnName={[
              {
                name: "Name",
                className: "w-[300px]",
              },
              {
                name: "Statement",
                className: "w-[300px]",
              },
              {
                name: "Level",
                className: "w-[300px]",
              },
              {
                name: "AddDate",
                className: "text-right",
              },
            ]}
            problems={problems}
            tableCaption="List of Problems"
          />
          <div className=" mt-12 ">
            <DynamicPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
