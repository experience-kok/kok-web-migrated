import z from 'zod';

// 사업자번호 포맷 검증 (000-00-00000)
const businessNumberRegex = /^\d{3}-\d{2}-\d{5}$/;

export const clientBusinessInfoSchema = z.object({
  companyName: z
    .string()
    .min(1, '회사명을 입력해주세요.')
    .max(100, '회사명은 100자 이하로 입력해주세요.')
    .trim(),

  businessRegistrationNumber: z
    .string()
    .min(1, '사업자번호를 입력해주세요.')
    .regex(businessNumberRegex, '올바른 사업자번호 형식을 입력해주세요. (000-00-00000)')
    .refine(value => {
      // 하이픈 제거 후 10자리 숫자인지 확인
      const numbersOnly = value.replace(/-/g, '');
      return numbersOnly.length === 10 && /^\d+$/.test(numbersOnly);
    }, '사업자번호는 10자리 숫자여야 합니다.'),
});

export type ClientBusinessInfoRegisterForm = z.infer<typeof clientBusinessInfoSchema>;
