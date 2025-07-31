'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { type LoginSchema, loginSchema } from '@/schemas/login.schemas';
import { useLoginMutation } from '@/service/auth/auth-mutation';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: handlePostLogin } = useLoginMutation();

  // 이메일과 비밀번호 입력값 감시
  const email = watch('email');
  const password = watch('password');

  // 둘 중 하나라도 비어있으면 버튼 비활성화
  const isButtonDisabled = !email || !password;

  const onSubmit = (data: LoginSchema) => {
    handlePostLogin({ email: data.email, password: data.password });
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email', { required: true })}
        placeholder="체험콕 회원 아이디"
        className="h-12"
      />
      {errors.email && (
        <Text color="red" size={'sm'}>
          {errors.email.message}
        </Text>
      )}
      <Input
        {...register('password', { required: true })}
        placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
        className="h-12"
        type="password"
      />
      {errors.password && (
        <Text color="red" size={'sm'}>
          {errors.password.message}
        </Text>
      )}

      <Button
        className="h-12 w-full rounded-lg bg-gray-900 text-base font-semibold text-white hover:bg-gray-900/90 disabled:cursor-not-allowed disabled:bg-gray-400"
        type="submit"
        disabled={isButtonDisabled}
      >
        로그인
      </Button>
    </form>
  );
}
