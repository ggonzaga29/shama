"use client";

import Logo from "src/assets/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "src/components/Input";
import { Button } from "src/components/Button";
import { Label } from "src/components/Label";
import { toast } from "sonner";

import { LoginSchema } from "src/modules/auth/schema";
import { FC, useState } from "react";

interface LoginFormProps {
  action: (data: LoginSchema) => Promise<void>; // loginAction
}

const LoginForm: FC<LoginFormProps> = ({ action }) => {
  const { register, handleSubmit } = useForm<LoginSchema>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setLoading(true);
      await action(data);
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
          <CardTitle className="text-2xl">Login to Shama</CardTitle>
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="•••••••••"
                {...register("password", inputProps)}
              />
            </div>

            <Button className="w-full mt-2" loading={loading}>
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
