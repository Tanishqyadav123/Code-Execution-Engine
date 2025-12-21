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

import Link from "next/link";
import z from "zod";
import { signInValidation } from "../validations/auth.validation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { signInUserService } from "../services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type signInFormType = z.infer<typeof signInValidation>;
export function SignInForm() {
  const router = useRouter();

  const form = useForm<signInFormType>({
    resolver: zodResolver(signInValidation),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: signInFormType) => {
    try {
      const res = await signInUserService(data);

      if (res.success) {
        toast.success(res.message);

        // Store the token in localStorage :-
        localStorage.setItem("accessToken", res.data.token);

        router.push("/");
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login Attempt Fail");
      }
    }
  };
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center ">
      <Card className="w-[30vw]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant={"link"}>
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div> */}

              <FieldGroup>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <Field>
                        {/* It Includes 3 things  */}
                        <FieldLabel>Email</FieldLabel>

                        <Input
                          id="email"
                          type="email"
                          placeholder="johndoe@example.com"
                          {...field}
                        />

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState, formState }) => {
                    return (
                      <Field>
                        {/* It Includes 3 things  */}
                        <FieldLabel>Password</FieldLabel>

                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          {...field}
                        />

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />

                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </FieldGroup>

              {/* <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div> */}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" disabled className="w-full">
            Sign In with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
