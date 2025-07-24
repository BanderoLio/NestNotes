import { Button, Field, Fieldset, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '@/components/ui/password-input.tsx';
import { useRegisterMutation } from '@/features/auth/authApiSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  selectAuthentication,
  setAuthentication,
} from '@/features/auth/authSlice.ts';
import { useEffect } from 'react';
import { Redirection } from '@/components/Redirection.tsx';
import type { UserRegister } from '@/features/auth/interfaces/userregister.interface.ts';
import { userRegisterSchema } from '@/features/auth/interfaces/userregister.interface.ts';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
  });
  const dispatch = useAppDispatch();
  const [registerFunction, { error, isError, isLoading, data: tokens }] =
    useRegisterMutation();
  const authentication = useAppSelector(selectAuthentication);

  useEffect(() => {
    if (tokens) {
      dispatch(setAuthentication(tokens));
    }
  }, [tokens, dispatch]);
  if (isError) {
    console.log(error);
  }
  if (tokens || authentication) {
    return <Redirection />;
  }
  return (
    <form noValidate onSubmit={handleSubmit(registerFunction)}>
      <Fieldset.Root disabled={!!isLoading} invalid={!!errors.root}>
        <Fieldset.Content>
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Имя пользователя</Field.Label>
            <Input {...register('username')} />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput {...register('password')} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
        <Button type={'submit'} loading={isLoading}>
          Зарегистрироваться
        </Button>
      </Fieldset.Root>
    </form>
  );
}
