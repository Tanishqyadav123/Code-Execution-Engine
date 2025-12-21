"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { signUpValidation } from "../validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { signUpUserService } from "../services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type signUpFormType = z.infer<typeof signUpValidation>;
function SignUpForm() {
  const router = useRouter();

  const form = useForm<signUpFormType>({
    resolver: zodResolver(signUpValidation),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });

  const onSignUpSubmit = async (data: signUpFormType) => {
    try {
      console.log(data);
      const response = await signUpUserService(data);
      if (response.success) {
        toast.success(response.message);
        router.push("/sign-in");
      }
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center ">
      <Card className="w-[30vw]">
        <CardHeader>
          <CardTitle>Create New Account</CardTitle>
          <CardDescription>
            Provide the below details to connect with Us.
          </CardDescription>
          <CardAction>
            <Button variant={"link"}>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSignUpSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" placeholder="John" required /> */}
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          {...field}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          {...field}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          type="text"
                          placeholder="johndoe@example.com"
                          {...field}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          {...field}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="confirmPassword">
                          Confirm password
                        </FieldLabel>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="********"
                          {...field}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" disabled className="w-full">
            Sign Up with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUpForm;
