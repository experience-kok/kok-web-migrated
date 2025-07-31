import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 형식이 아니에요.' }),
  password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 해요.' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
