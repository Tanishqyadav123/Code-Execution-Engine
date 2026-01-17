"use client";

import { DifficultyLevelEnum } from "@/app/entity/difficultyLevel.enum";
import { useRenderMarkdown } from "@/app/hooks/useRenderMarkdown";
import { getProblemByIdService } from "@/app/services/problem.service";
import { GetSingleProblemWithTestCases } from "@/app/types/problem.response.type";
import React, { use, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

function page({ params }: { params: Promise<{ id: string }> }) {
  let slugValue = use(params).id;

  const [problemDetails, setProblemDetails] =
    useState<GetSingleProblemWithTestCases | null>(null);
  const [markDownData, setMarkDownData] = useState("");

  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    if (!problemDetails) return;

    const markdown = useRenderMarkdown({
      level: problemDetails.level as DifficultyLevelEnum,
      name: problemDetails.name,
      statement: problemDetails.statement,
      testCases: problemDetails.testCases.map(({ inputCase, outputCase }) => ({
        inputCase: {
          hidden: inputCase.hidden,
          testCase: inputCase.testCase,
        },
        outputCase: outputCase.testCase,
      })),
    });

    console.log("The Markdown is ", markdown);
    setMarkDownData(markdown);
  }, [problemDetails]);

  const fetchProblemByIdService = async (problemId: number) => {
    try {
      const responseData = await getProblemByIdService(problemId);

      if (responseData.success) {
        toast.success(responseData.message);
        setProblemDetails(responseData.data);
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Add New Problem Attempt Fail");
      }
    }
  };
  useEffect(() => {
    console.log({ slugValue });
    fetchProblemByIdService(Number(slugValue));
  }, []);

  const handleCodeSubmit = () => {
    console.log("COde Is ", userCode);
  };
  return (
    <div className="w-screen relative ">
      <div className="flex h-[85vh] w-full gap-6 p-6 text-gray-900">
        {/* Problem Section */}
        <div className="w-1/2 overflow-y-auto rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <Markdown>{markDownData}</Markdown>
        </div>

        {/* Divider */}
        <div className="w-[5px] bg-gray-300 rounded-full" />

        {/* Editor Section */}
        <div className="w-1/2 rounded-xl bg-gray-900 p-4 shadow-sm border border-gray-800">
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            onChange={(code) => setUserCode(code || "")}
            saveViewState
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
        </div>
      </div>

      <div className="absolute right-12 flex gap-2">
        {/* <Button className="" onClick={handleCodeSubmit}>
          {" "}
          Compile{" "}
        </Button> */}
        <Button className="" onClick={handleCodeSubmit}>
          {" "}
          Submit{" "}
        </Button>
      </div>
    </div>
  );
}

export default page;
