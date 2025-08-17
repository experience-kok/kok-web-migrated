import z from 'zod';

export const campaignCreateSchema = z
  .object({
    // 기본 정보
    campaignType: z.enum(['인스타그램', '블로그', '유튜브', '틱톡'], {
      errorMap: () => ({ message: '캠페인 타입을 선택해 주세요.' }),
    }),
    title: z
      .string()
      .min(1, { message: '캠페인 제목을 입력해 주세요.' })
      .max(200, { message: '캠페인 제목은 200자 이하로 입력해 주세요.' }),
    maxApplicants: z
      .number({
        required_error: '선정 인원을 입력해 주세요.',
        invalid_type_error: '선정 인원은 숫자여야 합니다.',
      })
      .min(1, { message: '선정 인원은 1명 이상이어야 합니다.' }),

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
    selectionDate: z.string().min(1, { message: '참가자 발표일을 선택해 주세요.' }),

    // 미션 정보
    missionStartDate: z.string().min(1, { message: '미션 시작일을 선택해 주세요.' }),
    missionDeadlineDate: z.string().min(1, { message: '미션 마감일을 선택해 주세요.' }),
    titleKeywords: z.string().min(1, { message: '제목 키워드를 입력해 주세요.' }),
    bodyKeywords: z.string().min(1, { message: '본문 키워드를 입력해 주세요.' }),
    numberOfVideo: z
      .number({
        required_error: '비디오 개수를 입력해 주세요.',
        invalid_type_error: '비디오 개수는 숫자여야 합니다.',
      })
      .min(0, { message: '비디오 개수는 0개 이상이어야 합니다.' }),
    numberOfImage: z
      .number({
        required_error: '이미지 개수를 입력해 주세요.',
        invalid_type_error: '이미지 개수는 숫자여야 합니다.',
      })
      .min(0, { message: '이미지 개수는 0개 이상이어야 합니다.' }),
    numberOfText: z
      .number({
        required_error: '본문 작성 텍스트 수를 입력해 주세요.',
        invalid_type_error: '본문 작성 텍스트 수는 숫자여야 합니다.',
      })
      .min(0, { message: '본문 작성 텍스트 수는 0자 이상이어야 합니다.' }),
    isMap: z.boolean({
      required_error: '지도 표시 여부를 선택해 주세요.',
      invalid_type_error: '지도 표시 여부는 boolean 타입이어야 합니다.',
    }),

    // 상세 정보
    productShortInfo: z
      .string()
      .min(1, { message: '제품/서비스 간략 정보를 입력해 주세요.' })
      .max(20, { message: '간략 정보는 20자 이하로 입력해 주세요.' }),
    productDetails: z.string().min(1, { message: '제공 제품/서비스 상세 정보를 입력해 주세요.' }),
    selectionCriteria: z.string().min(1, { message: '선정 기준을 입력해 주세요.' }),
    missionGuide: z.string().min(1, { message: '미션 가이드를 입력해 주세요.' }),

    // 방문 정보 (categoryType이 '방문'일 때만 필수)
    homepage: z.string().optional(), // 선택적 필드
    contactPhone: z.string().optional(),
    visitAndReservationInfo: z.string().optional(),
    businessAddress: z.string().optional(),
    businessDetailAddress: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),

    // 업체 정보
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
      // 참가자 발표일이 모집 종료일보다 늦은지 확인
      const endDate = new Date(data.recruitmentEndDate);
      const selectionDate = new Date(data.selectionDate);
      return selectionDate >= endDate;
    },
    {
      message: '참가자 발표일은 모집 종료일과 같거나 늦어야 합니다.',
      path: ['selectionDate'],
    },
  )
  .refine(
    data => {
      // 미션 시작일이 참가자 선정일보다 늦은지 확인
      const selectionDate = new Date(data.selectionDate);
      const missionStartDate = new Date(data.missionStartDate);
      return missionStartDate >= selectionDate;
    },
    {
      message: '미션 시작일은 참가자 발표일과 같거나 늦어야 합니다.',
      path: ['missionStartDate'],
    },
  )
  .refine(
    data => {
      // 미션 마감일이 미션 시작일보다 늦은지 확인
      const missionStartDate = new Date(data.missionStartDate);
      const missionDeadlineDate = new Date(data.missionDeadlineDate);
      return missionDeadlineDate >= missionStartDate;
    },
    {
      message: '미션 마감일은 미션 시작일과 같거나 늦어야 합니다.',
      path: ['missionDeadlineDate'],
    },
  )
  // 카테고리 타입이 '방문'일 때만 방문 정보 필드들을 필수로 검증
  .refine(
    data => {
      if (data.categoryType === '방문') {
        return (
          data.contactPhone &&
          data.contactPhone.length > 0 &&
          /^\d{3}-\d{4}-\d{4}$/.test(data.contactPhone)
        );
      }
      return true;
    },
    {
      message: '올바른 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)',
      path: ['contactPhone'],
    },
  )
  .refine(
    data => {
      if (data.categoryType === '방문') {
        return data.visitAndReservationInfo && data.visitAndReservationInfo.length > 0;
      }
      return true;
    },
    {
      message: '방문 및 예약 안내를 입력해주세요.',
      path: ['visitAndReservationInfo'],
    },
  )
  .refine(
    data => {
      if (data.categoryType === '방문') {
        return data.businessAddress && data.businessAddress.length > 0;
      }
      return true;
    },
    {
      message: '위치 정보를 입력해주세요.',
      path: ['businessAddress'],
    },
  )
  .refine(
    data => {
      if (data.categoryType === '방문') {
        return typeof data.lat === 'number' && typeof data.lng === 'number';
      }
      return true;
    },
    {
      message: '위치 좌표를 설정해주세요.',
      path: ['lat'],
    },
  );

export type CampaignCreateForm = z.infer<typeof campaignCreateSchema>;
