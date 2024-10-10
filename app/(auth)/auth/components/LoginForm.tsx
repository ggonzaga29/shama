'use client';
import { Login } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from 'app/auth/actions';
import { type LoginSchema, loginSchema } from 'app/auth/schema';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { TextField } from 'src/components/Fields';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { Form } from 'src/components/ui/Form';

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = form;
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    startTransition(async () => {
      try {
        await loginAction(data);
      } catch (error: any) {
        if ('message' in error) {
          toast.error(error.message);
        } else {
          toast.error('Error: the server responded with an unknown error');
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          placeholder="me@shamacebu.com"
          control={control}
          name="email"
          autoFocus
        />

        <TextField
          label="Password"
          type="password"
          placeholder="•••••••••"
          control={control}
          name="password"
        />

        <EnhancedButton
          className="mt-2 w-full"
          variant="expandIcon"
          loading={isPending}
          disabled={isPending || !isDirty}
          Icon={Login}
        >
          Sign in
        </EnhancedButton>
      </form>
    </Form>
  );
};

export default LoginForm;
