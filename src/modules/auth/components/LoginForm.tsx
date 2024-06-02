'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { Input } from 'src/components/ui/Input';
import { Label } from 'src/components/ui/Label';
import { loginAction } from 'src/modules/auth/actions';
import { LoginSchema, loginSchema } from 'src/modules/auth/schema';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  if (searchParams.get('message')) {
    toast.success(searchParams.get('message'));
  }

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
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="example@example.com"
          {...register('email', inputProps)}
        />
        <span className="flex items-center gap-2 text-xs">
          {errors.email && (
            <>
              <Info className="size-3 text-destructive" />
              <span className="text-destructive">{errors.email.message}</span>
            </>
          )}
        </span>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="•••••••••"
          {...register('password', inputProps)}
        />
      </div>

      <EnhancedButton
        className="mt-2 w-full"
        variant="gooeyRight"
        loading={loading}
      >
        Sign in
      </EnhancedButton>
    </form>
  );
};

export default LoginForm;
