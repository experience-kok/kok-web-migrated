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
    recruitmentStartDate: z.coerce.date({
      required_error: '모집 시작일을 선택해 주세요.',
      invalid_type_error: '유효한 날짜를 선택해 주세요.',
    }),
    recruitmentEndDate: z.coerce.date().optional(),
  })
  // 상시 모집 캠페인이 아닌 경우 필수 필드 검증
  .refine(
    data => {
      // 상시 모집이 아닌 경우, maxApplicants가 필수
      if (!data.isAlwaysOpen) {
        return data.maxApplicants !== undefined && data.maxApplicants !== null;
      }
      return true;
    },
    {
      message: '일반 캠페인은 선정 인원을 입력해야 해요.',
      path: ['maxApplicants'],
    },
  )
  .refine(
    data => {
      // 상시 모집이 아닌 경우, recruitmentEndDate가 필수
      if (!data.isAlwaysOpen) {
        return data.recruitmentEndDate !== undefined && data.recruitmentEndDate !== null;
      }
      return true;
    },
    {
      message: '일반 캠페인은 모집 종료일을 선택해야 해요.',
      path: ['recruitmentEndDate'],
    },
  )
  // 상시 모집 캠페인인 경우 불필요한 필드 검증
  .refine(
    data => {
      // 상시 모집인 경우, maxApplicants가 없어야 함
      if (data.isAlwaysOpen) {
        return data.maxApplicants === undefined || data.maxApplicants === null;
      }
      return true;
    },
    {
      message: '상시 모집 캠페인은 선정 인원을 설정할 수 없어요.',
      path: ['maxApplicants'],
    },
  )
  .refine(
    data => {
      // 상시 모집인 경우, recruitmentEndDate가 없어야 함
      if (data.isAlwaysOpen) {
        return data.recruitmentEndDate === undefined || data.recruitmentEndDate === null;
      }
      return true;
    },
    {
      message: '상시 모집 캠페인은 모집 종료일을 설정할 수 없어요.',
      path: ['recruitmentEndDate'],
    },
  )
  // 모집 시작일이 오늘 이후인지 검증
  .refine(
    data => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(data.recruitmentStartDate);
      startDate.setHours(0, 0, 0, 0);
      return startDate >= today;
    },
    {
      message: '모집 시작일은 오늘 이후로 선택해 주세요.',
      path: ['recruitmentStartDate'],
    },
  )
  // 모집 종료일이 시작일보다 늦은지 검증 (일반 캠페인만)
  .refine(
    data => {
      if (!data.isAlwaysOpen && data.recruitmentStartDate && data.recruitmentEndDate) {
        const startDate = new Date(data.recruitmentStartDate);
        const endDate = new Date(data.recruitmentEndDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return endDate >= startDate;
      }
      return true;
    },
    {
      message: '모집 종료일은 모집 시작일보다 빠를 수 없어요.',
      path: ['recruitmentEndDate'],
    },
  );

export type CampaignData = z.infer<typeof campaignSchema>;

// 5. 제품/서비스 정보
export const productSchema = z.object({
  productShortInfo: z
    .string()
    .min(1, { message: '제품/서비스 간략 정보를 입력해 주세요.' })
    .max(20, { message: '간략 정보는 20자 이하로 입력해 주세요.' }),
  productDetails: z.string().min(1, { message: '제공 제품/서비스 상세 정보를 입력해 주세요.' }),
});
export type ProductData = z.infer<typeof productSchema>;

// 6. 인플루언서 선정 정보
export const selectionSchema = z.object({
  selectionDate: z.coerce.date({
    required_error: '인플루언서 선정일을 선택해 주세요.',
    invalid_type_error: '유효한 날짜를 선택해 주세요.',
  }),
  selectionCriteria: z.string().min(1, { message: '선정 기준을 입력해 주세요.' }),
});

// 캠페인 정보와 선정 정보를 함께 검증하는 스키마
export const createSelectionSchemaWithCampaignValidation = (campaignInfo: {
  isAlwaysOpen: boolean;
  recruitmentEndDate?: Date;
  recruitmentStartDate: Date;
}) => {
  return selectionSchema.refine(
    data => {
      const selectedDate = new Date(data.selectionDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (!campaignInfo.isAlwaysOpen && campaignInfo.recruitmentEndDate) {
        // 일반 캠페인: 모집 종료일 이후여야 함
        const endDate = new Date(campaignInfo.recruitmentEndDate);
        endDate.setHours(0, 0, 0, 0);
        return selectedDate >= endDate;
      } else {
        // 상시 캠페인: 모집 시작일 이후여야 함
        const startDate = new Date(campaignInfo.recruitmentStartDate);
        startDate.setHours(0, 0, 0, 0);
        return selectedDate >= startDate;
      }
    },
    {
      message: campaignInfo.isAlwaysOpen
        ? '인플루언서 선정일은 모집 시작일 이후여야 해요.'
        : '인플루언서 선정일은 모집 종료일 이후여야 해요.',
      path: ['selectionDate'],
    },
  );
};

export type SelectionData = z.infer<typeof selectionSchema>;
