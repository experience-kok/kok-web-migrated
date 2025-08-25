export type CampaignType = '인스타그램' | '블로그' | '유튜브';
export const CAMPAIGN_TYPES = ['인스타그램', '블로그', '유튜브'] as const;

export type CampaignCategoryType = '방문' | '배송';
export const CAMPAIGN_CATEGORY_TYPES = ['방문', '배송'] as const;

export type 방문카테고리 = '맛집' | '카페' | '뷰티' | '숙박';
export type 배송카테고리 = '식품' | '화장품' | '생활용품' | '패션' | '잡화';
export const VISIT_CATEGORIES = ['맛집', '카페', '뷰티', '숙박'] as const;
export const DELIVERY_CATEGORIES = ['식품', '화장품', '생활용품', '패션', '잡화'] as const;

export type CampaignCategoryName = 방문카테고리 | 배송카테고리;

export type Sort = 'latest' | 'popular' | 'deadline';
export const SORT_MAP = {
  latest: '최신순',
  popular: '인기순',
  deadline: '마감임박순',
} as const;

// 캠페인 등록/지원 상태
export type UserApplicationCampaignStatus =
  | 'APPLIED'
  | 'PENDING'
  | 'SELECTED'
  | 'COMPLETED'
  | 'REJECTED';
export type ClientApplicationCampaignStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type CampaignApplicationStatus =
  | UserApplicationCampaignStatus
  | ClientApplicationCampaignStatus;

// 캠페인 상태별 라벨 매핑
export const USER_CAMPAIGN_STATUS_LABELS: Record<UserApplicationCampaignStatus, string> = {
  APPLIED: '지원 완료',
  PENDING: '대기중',
  SELECTED: '선정된',
  COMPLETED: '완료됨',
  REJECTED: '반려됨',
};
export const CLIENT_CAMPAIGN_STATUS_LABELS: Record<ClientApplicationCampaignStatus, string> = {
  PENDING: '대기중',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
  EXPIRED: '만료됨',
};

// 캠페인 진행 상태
export type CampaignProgressStatus =
  | 'RECRUITING'
  | 'RECRUITMENT_COMPLETED'
  | 'SELECTION_COMPLETED'
  | 'MISSION_IN_PROGRESS'
  | 'CONTENT_REVIEW_PENDING';
export const CAMPAIGN_PROGRESS_STATUS_LABELS: Record<CampaignProgressStatus, string> = {
  RECRUITING: '지원자를 모집하고 있어요.',
  RECRUITMENT_COMPLETED: '지원자 모집이 완료되었어요.',
  SELECTION_COMPLETED: '지원자 선정이 완료되었어요. 현재는 미션 시작일까지 기다리는 중이에요.',
  MISSION_IN_PROGRESS: '선정된 지원자들이 미션을 수행 중이에요.',
  CONTENT_REVIEW_PENDING: '미션 제출이 완료되었어요. 업체의 검토가 필요해요.',
};

// 캠페인
export interface Campaign {
  id: number;
  campaignType: CampaignType;
  title: string;
  productShortInfo: string; // 제공 제품 한 줄
  currentApplicants: number; // 현재 지원 인원
  maxApplicants: number; // 최대 지원 인원
  recruitmentEndDate: string; // 지원 마감일
  thumbnailUrl: string;
  category: {
    type: CampaignCategoryType;
    name: CampaignCategoryName;
  };
}
