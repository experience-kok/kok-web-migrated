import { z } from 'zod';

// 1. 업체 정보
export const companySchema = z.object({
  contactPerson: z
    .string()
    .min(1, { message: '담당자명을 입력해 주세요.' })
    .max(50, { message: '담당자명은 50자 이하로 입력해 주세요.' }),
  phoneNumber: z
    .string()
    .min(1, { message: '담당자 연락처를 입력해 주세요.' })
    .max(20, { message: '담당자 연락처는 20자 이하로 입력해 주세요.' })
    .regex(/^\d{3}-\d{4}-\d{4}$/, {
      message: '올바른 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)',
    }),
});
export type CompanyData = z.infer<typeof companySchema>;

// 2. 캠페인 종류
export const categorySchema = z.object({
  categoryType: z.enum(['방문', '배송'], {
    errorMap: () => ({ message: '카테고리 타입을 선택해 주세요.' }),
  }),
  categoryName: z.enum(
    ['맛집', '카페', '뷰티', '숙박', '식품', '화장품', '생활용품', '패션', '잡화'],
    {
      errorMap: () => ({ message: '카테고리를 선택해 주세요.' }),
    },
  ),
  campaignType: z.enum(['인스타그램', '블로그', '유튜브'], {
    errorMap: () => ({ message: '캠페인 타입을 선택해 주세요.' }),
  }),
});
export type CategoryData = z.infer<typeof categorySchema>;
