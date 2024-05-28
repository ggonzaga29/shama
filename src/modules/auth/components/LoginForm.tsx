"use client";

import Logo from "src/assets/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "src/components/ui/Input";
import { Label } from "src/components/ui/Label";
import { toast } from "sonner";

import { loginSchema, LoginSchema } from "src/modules/auth/schema";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnhancedButton } from "src/components/ui/EnhancedButton";
import { loginAction } from "src/modules/auth/actions";
import { Info } from "lucide-react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setLoading(true);
      await loginAction(data);
    } catch (error: any) {
      toast.error(error);
    }

    setLoading(false);
  };

  const inputProps = { register, disabled: loading };

  return (
    <div className="w-full max-w-sm mt-10">
      <div className="w-full flex items-center justify-center">
        <Logo />
      </div>
      <Card className="w-full mt-10">
        <CardHeader>
          <CardTitle className="text-2xl text-heading-foreground">
            Login to Shama
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="example@example.com"
                {...register("email", inputProps)}
              />
              <span className="flex gap-2 text-xs items-center ">
                {errors.email && (
                  <>
                    <Info className="w-3 h-3 text-red-500" />
                    <span className="text-red-500">{errors.email.message}</span>
                  </>
                )}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="•••••••••"
                {...register("password", inputProps)}
              />
            </div>

            <EnhancedButton
              className="w-full mt-2"
              variant="gooeyRight"
              loading={loading}
            >
              Sign in
            </EnhancedButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
