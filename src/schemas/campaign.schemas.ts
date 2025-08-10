import z from 'zod';

export const campaignCreateSchema = z
  .object({
    // 기본 정보
    campaignType: z.enum(['인스타그램', '블로그', '유튜브', '틱톡'], {
      errorMap: () => ({ message: '캠페인 타입을 선택해 주세요.' }),
    }),
    title: z
      .string()
      .min(1, { message: '제목을 입력해 주세요.' })
      .max(200, { message: '제목은 200자 이하로 입력해 주세요.' }),
    maxApplicants: z
      .number({
        required_error: '최대 지원 인원을 입력해 주세요.',
        invalid_type_error: '최대 지원 인원은 숫자여야 합니다.',
      })
      .min(1, { message: '최대 지원 인원은 1명 이상이어야 합니다.' }),

    // 카테고리 정보
    categoryType: z.enum(['방문', '배송'], {
      errorMap: () => ({ message: '카테고리 타입을 선택해 주세요.' }),
    }),
    categoryName: z.enum(
      ['맛집', '카페', '뷰티', '숙박', '식품', '화장품', '생활용품', '패션', '잡화'],
      {
        errorMap: () => ({ message: '카테고리를 선택해 주세요.' }),
      },
    ),

    // 날짜 정보
    recruitmentStartDate: z.string().min(1, { message: '모집 시작일을 선택해 주세요.' }),
    recruitmentEndDate: z.string().min(1, { message: '모집 종료일을 선택해 주세요.' }),
    applicationDeadlineDate: z.string().min(1, { message: '지원 마감일을 선택해 주세요.' }),
    selectionDate: z.string().min(1, { message: '참가자 선정일을 선택해 주세요.' }),
    reviewDeadlineDate: z.string().min(1, { message: '리뷰 제출 마감일을 선택해 주세요.' }),

    // 상세 정보
    productShortInfo: z
      .string()
      .min(1, { message: '제품/서비스 간략 정보를 입력해 주세요.' })
      .max(20, { message: '간략 정보는 20자 이하로 입력해 주세요.' }),
    productDetails: z.string().min(1, { message: '제공 제품/서비스 상세 정보를 입력해 주세요.' }),
    selectionCriteria: z.string().min(1, { message: '선정 기준을 입력해 주세요.' }),
    missionGuide: z.string().min(1, { message: '미션 가이드를 입력해 주세요.' }),
    missionKeywords: z.string().min(1, { message: '미션 키워드를 입력해 주세요.' }),

    // 방문 정보
    homepage: z.string().optional(),
    contactPhone: z
      .string()
      .min(1, { message: '연락처를 입력해 주세요.' })
      .max(20, { message: '연락처는 20자 이하로 입력해 주세요.' })
      .regex(/^\d{3}-\d{4}-\d{4}$/, {
        message: '올바른 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)',
      }),
    visitAndReservationInfo: z.string().min(1, { message: '방문 및 예약 안내를 입력해주세요.' }),
    businessAddress: z.string({ message: '위치 정보를 입력해주세요.' }), // 업체 주소
    businessDetailAddress: z.string(), // 업체 상세 주소
    lat: z.number(),
    lng: z.number(),

    // 업체 정보
    contactPerson: z
      .string()
      .min(1, { message: '담당자명을 입력해 주세요.' })
      .max(50, { message: '담당자명은 50자 이하로 입력해 주세요.' }),
    phoneNumber: z
      .string()
      .min(1, { message: '연락처를 입력해 주세요.' })
      .max(20, { message: '연락처는 20자 이하로 입력해 주세요.' })
      .regex(/^\d{3}-\d{4}-\d{4}$/, {
        message: '올바른 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)',
      }),

    // 썸네일 (옵셔널)
    thumbnailUrl: z.string().optional(),
  })
  .refine(
    data => {
      // 모집 종료일이 시작일보다 늦은지 확인
      const startDate = new Date(data.recruitmentStartDate);
      const endDate = new Date(data.recruitmentEndDate);
      return endDate > startDate;
    },
    {
      message: '모집 종료일은 시작일보다 늦어야 합니다.',
      path: ['recruitmentEndDate'],
    },
  )
  .refine(
    data => {
      // 지원 마감일이 모집 시작일 이후이고 종료일 이전인지 확인
      const startDate = new Date(data.recruitmentStartDate);
      const endDate = new Date(data.recruitmentEndDate);
      const applicationDeadline = new Date(data.applicationDeadlineDate);
      return applicationDeadline >= startDate && applicationDeadline <= endDate;
    },
    {
      message: '지원 마감일은 모집 시작일 이후이고 종료일 이전이어야 합니다.',
      path: ['applicationDeadlineDate'],
    },
  )
  .refine(
    data => {
      // 참가자 선정일이 모집 종료일보다 늦은지 확인
      const endDate = new Date(data.recruitmentEndDate);
      const selectionDate = new Date(data.selectionDate);
      return selectionDate >= endDate;
    },
    {
      message: '참가자 선정일은 모집 종료일과 같거나 늦어야 합니다.',
      path: ['selectionDate'],
    },
  )
  .refine(
    data => {
      // 리뷰 제출 마감일이 참가자 선정일보다 늦은지 확인
      const selectionDate = new Date(data.selectionDate);
      const reviewDeadline = new Date(data.reviewDeadlineDate);
      return reviewDeadline >= selectionDate;
    },
    {
      message: '리뷰 제출 마감일은 참가자 선정일과 같거나 늦어야 합니다.',
      path: ['reviewDeadlineDate'],
    },
  );

export type CampaignCreateForm = z.infer<typeof campaignCreateSchema>;
