"use client";

import React from "react";
import { Navbar } from "../appComponents/Navbar";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewProblemSchema,
  AddNewProblemSchemaType,
} from "../validations/problem.validation";
import { DifficultyLevelEnum } from "../entity/difficultyLevel.enum";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommonSelect } from "../appComponents/Select.Common";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { addNewProblemService } from "../services/problem.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function page() {
  const form = useForm<AddNewProblemSchemaType>({
    resolver: zodResolver(addNewProblemSchema),
    mode: "onSubmit",
    defaultValues: {
      level: DifficultyLevelEnum.All,
      name: "",
      statement: "",
      testCases: [
        {
          inputCase: {
            hidden: false,
            testCase: "",
          },
          outputCase: "",
        },
      ],
    },
  });

  const router = useRouter();

  const { append, fields, remove } = useFieldArray({
    name: "testCases",
    control: form.control,
  });

  const onSubmit = async (data: AddNewProblemSchemaType) => {
    try {
      const responseData = await addNewProblemService(data);

      if (responseData.success) {
        toast.success(responseData.message);
        router.push("/problems");
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Add New Problem Attempt Fail");
      }
    }
  };
  return (
    <div className=" flex  gap-5 h-screen w-[90vw] ">
      <Navbar />

      <div className="w-full mt-12">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState, formState }) => {
                  return (
                    <Field className="w-60">
                      <FieldLabel>Name of the problem</FieldLabel>

                      <Input
                        id="name"
                        type="text"
                        placeholder="2 Sum..."
                        {...field}
                        maxLength={20}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
              <Controller
                name="statement"
                control={form.control}
                render={({ field, fieldState, formState }) => {
                  return (
                    <Field>
                      {/* It Includes 3 things  */}
                      <FieldLabel>Statement</FieldLabel>

                      <Input
                        id="statement"
                        type="text"
                        placeholder="This is the problem statement..."
                        {...field}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              <div className="grid gap-2">
                <Controller
                  name="level"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="difficultyLevel">Level</FieldLabel>
                        <CommonSelect
                          options={Object.values(DifficultyLevelEnum).map(
                            (val) => ({ label: val, value: val })
                          )}
                          value={
                            field.value
                              ? field.value.toString()
                              : DifficultyLevelEnum.All
                          }
                          onChange={(value) => {
                            console.log(value);
                            return field.onChange(value);
                          }}
                          placeholder="Select a difficulty level"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              {/* Fields for test cases */}

              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Test Cases</h3>

                {fields.map(({ id, inputCase, outputCase }, index) => {
                  return (
                    <div key={id}>
                      {/* Input Test Cases */}
                      <Controller
                        name={`testCases.${index}.inputCase.testCase`}
                        control={form.control}
                        render={({ field, fieldState }) => {
                          return (
                            <Field>
                              <FieldLabel>Input</FieldLabel>
                              <Textarea
                                placeholder="Input test case"
                                {...field}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          );
                        }}
                      />

                      {/* OutPut Test Cases */}
                      <Controller
                        name={`testCases.${index}.outputCase`}
                        control={form.control}
                        render={({ field, fieldState }) => {
                          return (
                            <Field className="mt-5">
                              <FieldLabel>Output</FieldLabel>
                              <Textarea
                                placeholder="Output test case"
                                {...field}
                              />

                              {fieldState.invalid && (
                                <FieldError
                                  errors={[fieldState.error]}
                                ></FieldError>
                              )}
                            </Field>
                          );
                        }}
                      />

                      {/* Hidden Test Cases */}
                      <Controller
                        name={`testCases.${index}.inputCase.hidden`}
                        control={form.control}
                        render={({ field }) => (
                          <Field className="mt-5">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                              {/* Checkbox */}
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                className={cn(
                                  "h-4 w-4 rounded border border-input",
                                  "text-primary focus-visible:ring-2 focus-visible:ring-ring",
                                  "accent-primary"
                                )}
                              />

                              {/* Text */}
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  Hidden test case
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  This test case won’t be visible to users
                                </span>
                              </div>
                            </label>
                          </Field>
                        )}
                      />

                      {/* Remove button */}
                      {fields.length > 1 && (
                        <Button
                          variant={"destructive"}
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}

                      {/* Add New Button */}
                      <Button
                        variant={"secondary"}
                        className="mt-5"
                        onClick={() =>
                          append({
                            inputCase: { testCase: "", hidden: false },
                            outputCase: "",
                          })
                        }
                      >
                        Add More
                      </Button>
                    </div>
                  );
                })}
              </div>
            </FieldGroup>

            {/* <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div> */}
            <div className="mx-auto my-5">
              <Button type="submit" className="w-[20vw]">
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
