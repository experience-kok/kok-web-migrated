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
    errorMap: () => ({ message: '캠페인이 진행될 플랫폼을 선택해 주세요.' }),
  }),
});
export type CategoryData = z.infer<typeof categorySchema>;

// 3. 썸네일 URL
export const thumbnailSchema = z.object({
  thumbnailUrl: z.string(),
});
export type ThumbnailData = z.infer<typeof thumbnailSchema>;

// 4. 캠페인 정보
export const campaignSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: '캠페인 제목을 입력해 주세요.' })
      .max(200, { message: '캠페인 제목은 200자 이하로 입력해 주세요.' }),
    isAlwaysOpen: z.boolean({
      required_error: '상시 캠페인 여부를 선택해 주세요.',
      invalid_type_error: '상시 캠페인 여부는 boolean 타입이어야 해요.',
    }),
    maxApplicants: z
      .number({
        required_error: '선정 인원을 입력해 주세요.',
        invalid_type_error: '선정 인원은 숫자여야 해요.',
      })
      .min(1, { message: '선정 인원은 1명 이상이어야 해요.' })
      .optional(),
    recruitmentStartDate: z.string().min(1, { message: '모집 시작일을 선택해 주세요.' }),
    recruitmentEndDate: z.string(),
  })
  .refine(
    data => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 날짜만 비교
      const startDate = new Date(data.recruitmentStartDate);
      startDate.setHours(0, 0, 0, 0);
      return startDate >= today;
    },
    { message: '모집 시작일은 오늘 이후로 선택해 주세요.', path: ['recruitmentStartDate'] },
  );
export type CampaignData = z.infer<typeof campaignSchema>;
