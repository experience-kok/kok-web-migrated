export type CampaignType = '인스타그램' | '블로그' | '유튜브' | '틱톡';
export const CAMPAIGN_TYPES = ['인스타그램', '블로그', '유튜브', '틱톡'] as const;

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

// 캠페인 상태
export type UserApplicationCampaignStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
export type ClientApplicationCampaignStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type CampaignApplicationStatus =
  | UserApplicationCampaignStatus
  | ClientApplicationCampaignStatus;

// 캠페인 상태별 라벨 매핑
export const USER_CAMPAIGN_STATUS_LABELS: Record<UserApplicationCampaignStatus, string> = {
  PENDING: '지원',
  APPROVED: '대기중',
  REJECTED: '선정',
  COMPLETED: '완료',
};
export const CLIENT_CAMPAIGN_STATUS_LABELS: Record<ClientApplicationCampaignStatus, string> = {
  PENDING: '대기중',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
  EXPIRED: '만료됨',
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
