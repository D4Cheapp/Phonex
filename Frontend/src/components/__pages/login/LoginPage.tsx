'use client';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@heroui/react';
import { login } from '@/modules/user/login';
import EyeIcon from 'icons/eye.svg';
import EyeHidden from 'icons/eye-hidden.svg';
import { Routes } from 'constants/routes';
import { redirect } from 'next/navigation';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit: onSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(async data => {
      const user = await login(data);
      if (user) {
        redirect(Routes.home);
      }
    })();
  };

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <main className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Страница входа</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            classNames={{
              base: 'w-[300px]',
            }}
            label="Электронная почта"
            variant="bordered"
            type="email"
            {...register('email')}
          />
          <Input
            classNames={{
              base: 'w-[300px]',
            }}
            variant="bordered"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            endContent={
              <span className="cursor-pointer w-6 h-6" onClick={handleTogglePasswordVisibility}>
                {showPassword ? <EyeIcon /> : <EyeHidden />}
              </span>
            }
            {...register('password')}
          />
        </div>
        <Button size="md" type="submit" color="primary">
          Войти
        </Button>
      </form>
    </main>
  );
};
